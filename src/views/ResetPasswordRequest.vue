<template>
  <div class="reset-password-page">
    <div class="reset-password-content">
      <h1 class="reset-password-title">Reset Your Password</h1>
      <p class="reset-password-message">
        Enter your email address below, and we'll send you instructions to reset
        your password.
      </p>
      <input
        class="reset-password-input"
        type="email"
        v-model="email"
        placeholder="Enter your email"
      />
      <button class="reset-password-btn" @click="sendResetEmail">
        Send Reset Email
      </button>
      <p v-if="emailSent" class="success-message">
        An email has been sent to your inbox with instructions to reset your
        password. Please check your email.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const emailSent = ref(false);

const sendResetEmail = () => {
  // Simulate sending reset email
  // In a real implementation, you would send an email using a service
  // and set emailSent to true upon successful email sending
  emailSent.value = true;
};
</script>

<style scoped>
.reset-password-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
}

.reset-password-content {
  text-align: center;
  max-width: 600px;
  padding: 20px;
  border-radius: 15px;
  background-color: var(--secondary-color);
}

.reset-password-title {
  font-size: 2em;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.reset-password-message {
  font-size: 1.2em;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.reset-password-input {
  height: 40px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px 0;
  padding: 10px;
  font-size: 1em;
  outline: none;
  transition: border-color 0.3s;
}

.reset-password-input:focus {
  border-color: var(--primary-color);
}

.reset-password-btn {
  height: 50px;
  width: 50%;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background-color: var(--primary-color);
  color: var(--secondary-color);
  font-size: 1.2em;
  font-weight: bold;
  transition: background-color 0.3s;
}

.reset-password-btn:hover {
  background-color: #007acc;
}

.success-message {
  color: #13d813;
  font-size: 1.1em;
  margin-top: 15px;
}
</style>
