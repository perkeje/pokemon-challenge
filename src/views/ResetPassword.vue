<template>
  <div class="change-password-page">
    <div class="change-password-content">
      <h1 class="change-password-title">Change Your Password</h1>
      <input
        class="change-password-input"
        type="password"
        v-model="oldPassword"
        placeholder="Current Password"
      />
      <input
        class="change-password-input"
        type="password"
        v-model="newPassword"
        placeholder="New Password"
        @input="checkPasswordStrength"
      />
      <input
        class="change-password-input"
        type="password"
        v-model="confirmPassword"
        placeholder="Confirm New Password"
      />
      <p class="password-strength">{{ passwordStrengthFeedback }}</p>
      <button class="change-password-btn" @click="changePassword">Change Password</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import zxcvbn from 'zxcvbn'; // Make sure to install this library

const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const passwordStrengthFeedback = ref('');

const checkPasswordStrength = () => {
  const result = zxcvbn(newPassword.value);
  const strength = result.score; // Score ranges from 0 to 4

  // Map the zxcvbn score to a custom feedback message
  const strengthFeedback = [
    'Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'
  ][strength];

  passwordStrengthFeedback.value = strengthFeedback;
};

const changePassword = () => {
  // Implement change password logic here
};
</script>

<style scoped>
.change-password-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
}

.change-password-content {
  text-align: center;
  max-width: 600px;
  padding: 20px;
  border-radius: 15px;
  background-color: var(--secondary-color);
}

.change-password-title {
  font-size: 2em;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.change-password-input {
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

.change-password-input:focus {
  border-color: var(--primary-color);
}

.password-strength {
  font-size: 0.9em;
  color: #007acc;
  margin-top: 5px;
}

.change-password-btn {
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

.change-password-btn:hover {
  background-color: #007acc;
}
</style>
