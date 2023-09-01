<template>
  <div class="reset-request-wrapper">
    <el-card class="reset-request-content">
      <h4 class="reset-request-title">Forgot Your Password?</h4>
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
            class="reset-request-input"
            v-model="ruleForm.email"
            type="text"
            @keyup.enter="submitForm(ruleFormRef)"
          />
        </el-form-item>

        <el-button
          class="reset-request-btn"
          size="large"
          type="primary"
          :loading="userStore.isLoading"
          @click="submitForm(ruleFormRef)"
        >
          Send Reset Email
        </el-button>
      </el-form>
      <Router-link to="/login" class="back-to-login">
        Remember your password? Log in here!
      </Router-link>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  email: "",
});

const rules = reactive<FormRules>({
  email: [
    { required: true, message: "Email is required", trigger: "blur" },
    {
      type: "email",
      message: "Please enter a valid email address",
      trigger: "blur",
    },
  ],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      userStore.sendPasswordReset(ruleForm.email);
    }
  });
};
</script>

<style scoped>
.reset-request-wrapper {
  position: absolute;
  padding: 10% 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reset-request-content {
  flex-grow: 1;
  background-color: var(--secondary-color);
  width: 90%;
  max-width: 500px;
  border-radius: 25px;
  border-style: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.reset-request-content form {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.reset-request-content form div {
  width: 100%;
}

.reset-request-title {
  font-size: 2em;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.reset-request-input {
  height: 50px;
  width: 100%;
  border: 1px hidden;
  border-radius: 10px;
  font-size: 1em;
  transition: border-color 0.3s;
}

.reset-request-input:focus {
  border: 2px solid;
  border-color: #007acc;
}

.reset-request-btn {
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

.reset-request-btn:hover {
  background-color: #888888;
}

.back-to-login {
  display: flex;
  justify-content: center;
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9em;
  transition: color 0.3s;
}

.back-to-login:hover {
  color: #007acc;
}
</style>
