<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  email: '',
  password: '',
});

const rules = reactive<FormRules>({
  email: [
    { required: true, message: 'Email field is required', trigger: 'blur' },
    {
          type: 'email',
          message: 'Please input correct email address',
          trigger: ['blur'],
        },
  ],
  password: [
    { required: true, message: 'Password field is required', trigger: 'blur' },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      userStore.login(ruleForm.email, ruleForm.password);
    }
  });
};
</script>

<template>
  <div class="login-wrapper">
    <el-card class="login-content">
      
        <h4 class="login-title">Welcome back!</h4>

      <el-form
        ref="ruleFormRef"
        label-position="top"
        status-icon
        :label-width="100"
        size="large"
        :rules="rules"
        :model="ruleForm"
        @submit.prevent
      >
        <el-form-item label="Email" prop="email">
          <el-input
          class="login-input"
            v-model="ruleForm.email"
            autofocus
            type="text"
            @keyup.enter="submitForm(ruleFormRef)"
          />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input
          class="login-input"
            v-model="ruleForm.password"
            type="password"
            @keyup.enter="submitForm(ruleFormRef)"
          />
        </el-form-item>

        <el-button
        class="login-btn"
          size="large"
          type="primary"
          :loading="userStore.isLoading"
          @click="submitForm(ruleFormRef)"
          >Login</el-button
        >
      </el-form>
    <Router-link to="/register" class="back-to-register">
        You are still not our user? Register here!
      </Router-link>
  </el-card>
  </div> 
</template>

  <style scoped>

  .login-wrapper {
    position:absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-content form {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .login-content form  div{
    width: 100%;
  }
  
  .login-content {
    background-color: var(--secondary-color);
    width: 90%;
    max-width: 500px;
    border-radius: 25px;
    border-style:hidden;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    
  }
  
  .login-title {
    font-size: 2em;
    font-weight: bold;
    color: var(--primary-color);
    margin-bottom: 20px;
  }
  
  .login-input {
    height: 50px;
    width: 100%;
    border: 1px solid;
    border-style: hidden ;
    border-radius: 10px;
    font-size: 1em;
    transition: border-color 0.3s;
  }

  .back-to-register{
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9em;
  transition: color 0.3s;
}

.back-to-register:hover {
  color: #007acc;
  text-decoration: none;
}
  
  .login-btn {
    height: 50px;
    width: 80%;
    margin-top: 10px;
    border-radius: 15px;
    cursor: pointer;
    border: none;
    background-color: var(--primary-color);
    color: var(--secondary-color);
    font-size: 1.2em;
    font-weight: bold;
    transition: background-color 0.3s;
    margin-bottom: 20px;
  }
  
  .login-btn:hover {
    background-color: #888888;
  }
  </style>

  