import { defineStore } from "pinia";
import router from "../router/index";
import { $toast } from "@/logic/notification";
import Cookies from "universal-cookie";
import { ref } from "vue";
import { setInterval } from "worker-timers";
import { $axios } from "../modules/axios";
import { usePokemonStore2 } from "@/stores";

const cookies = new Cookies();

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  pokeMasterTimestamp: string | null;
  description: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface UserSession {
  id: string;
  userId: string;
  csrf: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

interface UserData {
  user: User;
  userSession: UserSession;
}

export const useUserStore = defineStore("user", () => {
  const pokemonStore = usePokemonStore2();
  const user = ref<UserData | undefined>(undefined);
  const isLoading = ref<boolean>(false);
  const confirmationEmail = ref<string | undefined>(undefined);

  function getCSRFHeader() {
    return cookies.get("X-CSRF-TOKEN");
  }

  async function login(email: string, password: string) {
    isLoading.value = true;
    await $axios
      .post("/auth/login", {
        email: email,
        password: password,
      })
      .then(async (response) => {
        cookies.set("X-CSRF-TOKEN", response?.data.userSession.csrf, {
          path: "/",
          sameSite: "strict",
        });
        user.value = response.data;
        $toast({
          message: "Authentication successful",
          type: "success",
        });
        await pokemonStore.getLastGuessed();
        await pokemonStore.getPercentage();
        router.push({ path: "/" });
      })

      .catch((error) => {
        if (error?.response?.data?.cause === "Account not verified") {
          confirmationEmail.value = email;
          router.push({ path: "/not-verified" });
          return;
        }
        $toast({
          title: error?.response?.statusText,
          message: error?.response?.data?.cause || "Login error",
          type: "error",
          duration: "long",
        });
        throw error;
      })
      .finally(async () => {
        isLoading.value = false;
      });
  }

  async function register(
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
  ) {
    isLoading.value = true;
    await $axios
      .post("/auth/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
      })
      .then(async (response) => {
        confirmationEmail.value = email;
        $toast({
          message: "Registration successful",
          type: "success",
        });
        router.push({ path: "/registration-submitted" });
      })
      .catch((error) => {
        $toast({
          title: error?.response?.statusText,
          message: error?.response?.data?.cause || "Registration error",
          type: "error",
          duration: "long",
        });
        throw error;
      })
      .finally(async () => {
        isLoading.value = false;
      });
  }

  async function refreshSession() {
    try {
      const response = await $axios.post("/auth/refresh");

      cookies.set("X-CSRF-TOKEN", response?.data.userSession.csrf, {
        path: "/",
        sameSite: "strict",
      });
      user.value = response.data;
      await pokemonStore.getLastGuessed();
      await pokemonStore.getPercentage();
      return user.value;
    } catch (error: any) {
      $toast({
        message: "Session expired",
        type: "error",
        duration: "short",
      });
      await logout();
    }
  }

  async function veirifyAccount(token: string) {
    try {
      const response = await $axios.get("/auth/verify/" + token);

      cookies.set("X-CSRF-TOKEN", response?.data.userSession.csrf, {
        path: "/",
        sameSite: "strict",
      });
      user.value = response.data;
      return {
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error?.response?.data?.cause || "Unknown error",
      };
    }
  }

  async function resendVerificationEmail() {
    try {
      await $axios.post("/auth/resend-verification-email", {
        email: confirmationEmail?.value,
      });
      $toast({
        message: "Resend email successful",
        type: "success",
      });
      router.push({ path: "/registration-submitted" });
    } catch (error: any) {
      if (error?.response?.statusText === "Unprocessable Entity") {
        $toast({
          message: "Something went wrong, try to log in again.",
          type: "error",
          duration: "long",
        });
        router.push({ path: "/login" });
        return;
      }
      $toast({
        title: error?.response?.statusText,
        message:
          error?.response?.data?.cause || "Resend verification email error",
        type: "error",
        duration: "long",
      });
    }
  }

  async function sendPasswordReset(email: string) {
    isLoading.value = true;
    try {
      await $axios.post("/auth/reset", {
        email: email,
      });
      isLoading.value = false;
      $toast({
        message:
          "Request for password reset has been sent to your email! Check your inbox",
        type: "success",
        duration: "long",
      });
      router.push({ path: "/login" });
    } catch (error: any) {
      $toast({
        title: error?.response?.statusText,
        message: error?.response?.data?.cause || "Password reset error",
        type: "error",
        duration: "long",
      });
      isLoading.value = false;
    }
  }

  async function resetPassword(token: string, password: string) {
    isLoading.value = true;
    try {
      await $axios.post("/auth/reset/" + token, {
        password: password,
      });
      isLoading.value = false;
      $toast({
        message: "Password reseted successfuly! Try to log in!",
        type: "success",
        duration: "long",
      });
      router.push({ path: "/login" });
    } catch (error: any) {
      $toast({
        title: error?.response?.statusText,
        message: error?.response?.data?.cause || "Password reset error",
        type: "error",
        duration: "long",
      });
      isLoading.value = false;
    }
  }

  function setRefreshSession() {
    setInterval(async () => {
      if (!user.value) {
        return;
      }
      let expireTime = new Date(user.value?.userSession.expiresAt).getTime();
      let currentTime = new Date().getTime();
      let timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
      let remainingTime = expireTime - currentTime - timezoneOffset;

      if (remainingTime < 10000) {
        await refreshSession();
      }
    }, 5000);
  }

  async function logout() {
    try {
      await $axios.post("/auth/logout");
    } catch (error: any) {
      $toast({
        message: error,
        type: "error",
        duration: "long",
      });
    }
    cookies.remove("X-CSRF-TOKEN", { path: "/" });
    // cookies.remove(import.meta.env.VITE_COOKIE_NAME as string);
    user.value = undefined;
    await router.push({ path: "/" });
  }

  return {
    getCSRFHeader,
    user,
    isLoading,
    login,
    register,
    veirifyAccount,
    refreshSession,
    logout,
    setRefreshSession,
    resendVerificationEmail,
    sendPasswordReset,
    resetPassword,
  };
});
