<script setup lang="ts">
</script>
<template>
    <div class="success-page">
      <div class="success-content">
        <h1 class="success-title">Congratulations, Trainer!</h1>
        <p class="success-message">
          You've successfully registered as a Pokémon Trainer. An email verification
          has been sent to your inbox. Please check your email and follow the instructions
          to complete your registration and start your journey as a Pokémon Trainer!
        </p>
        <RouterLink to="/login" class="back-to-login">Back to Login</RouterLink>
        <img src="src/assets/images/logo.png" alt="Pokémon Image" class="pokemon-image" />
      </div>
    </div>
  </template>
  
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
    height: 1em;
  }
  
  .back-to-login {
    color: var(--primary-color);
    text-decoration: none;
    font-size: 1.2em;
    transition: color 0.3s;
  }
  
  .back-to-login:hover {
    color: #007acc;
  }
  </style>
  