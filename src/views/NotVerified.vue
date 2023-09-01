<template>
  <div class="not-verified-page">
    <div class="not-verified-content">
      <h1 class="not-verified-title">Your Account is Not Verified</h1>
      <p class="not-verified-message">
        Please check your email for a verification link. If you didn't receive
        the email or need to resend it, click
        <span @click="resendVerification">here</span>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const router = useRouter();

const resendVerification = async () => {
  await userStore.resendVerificationEmail();
};
</script>

<style scoped>
.not-verified-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color ease-out 0.3s;
}

.not-verified-content {
  text-align: center;
  max-width: 600px;
  padding: 20px;
  border-radius: 15px;
  background-color: var(--secondary-color);
  transition: background-color ease-out 0.3s;
}

.not-verified-title {
  font-size: 2.5em;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.not-verified-message {
  font-size: 1.2em;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.not-verified-message span {
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s;
}
.not-verified-message span:hover {
  color: #007acc;
}
</style>
