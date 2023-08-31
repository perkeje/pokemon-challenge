<template>
  <div class="success-page">
    <div class="success-content">
      <h1 class="success-title">{{ title }}</h1>
      <p class="success-message">{{ message }}</p>
      <button class="back-to-home-btn" @click="goToHome">Back to Home</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { onMounted, ref } from "vue";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const token = route.params.token as string;

const title = ref("");
const message = ref("");

onMounted(async () => {
  const verification = await userStore.veirifyAccount(token);
  title.value = verification.success
    ? "Email Verification Successful!"
    : "Email Verification Failed";
  message.value = verification.success
    ? "Congratulations! Your email has been successfully verified. You are now ready to start your journey as a Pokémon Trainer!"
    : `Sorry, your email verification was unsuccessful due to ${verification.error}. Please try again or contact support.`;
});

const goToHome = () => {
  router.push("/");
};
</script>

<style scoped>
.success-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.success-content {
  text-align: center;
  max-width: 600px;
  padding: 20px;
  border-radius: 15px;
  background-color: var(--secondary-color);
}

.success-title {
  font-size: 2.5em;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.success-message {
  font-size: 1.2em;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.pokemon-image {
  height: 100px;
  /* Adjust the height as needed */
  margin: 20px auto;
  display: block;
}

.back-to-home-btn {
  height: 40px;
  width: 150px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  font-size: 1em;
  font-weight: bold;
  transition: background-color 0.3s;
}

.back-to-home-btn:hover {
  background-color: #888888;
}
</style>
