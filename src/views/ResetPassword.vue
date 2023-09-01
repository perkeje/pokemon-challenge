<template>
  <div class="reset-password-wrapper">
    <el-card class="reset-password-content">
      <h4 class="reset-password-title">Reset Your Password</h4>
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
        <el-form-item label="New Password" prop="newPassword">
          <el-input
            class="reset-password-input"
            v-model="ruleForm.newPassword"
            type="password"
            @input="checkPasswordStrength"
            @keyup.enter="submitForm(ruleFormRef)"
          />
          <div
            v-if="passwordStrengthFeedback !== ''"
            :class="{
              'weak-password': isWeakPassword,
              'password-strength': true,
            }"
          >
            {{ passwordStrengthFeedback }}
          </div>
        </el-form-item>

        <el-form-item label="Confirm New Password" prop="confirmPassword">
          <el-input
            class="reset-password-input"
            v-model="ruleForm.confirmPassword"
            type="password"
            @keyup.enter="submitForm(ruleFormRef)"
          />
        </el-form-item>

        <el-button
          class="reset-password-btn"
          size="large"
          type="primary"
          :loading="userStore.isLoading"
          :disabled="isWeakPassword || passwordMismatch"
          @click="submitForm(ruleFormRef)"
        >
          Reset Password
        </el-button>
      </el-form>
      <Router-link to="/login" class="back-to-login">
        Remember your password? Log in here!
      </Router-link>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import zxcvbn from "zxcvbn";
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { useUserStore } from "@/stores/userStore";
const route = useRoute();

const token = route.params.token as string;
const userStore = useUserStore();

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  newPassword: "",
  confirmPassword: "",
});

const rules = ref<FormRules>({
  newPassword: [
    { required: true, message: "New Password is required", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (zxcvbn(value).score < 3) {
          callback(new Error("New Password is too weak"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: "Confirm New Password is required",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        if (value !== ruleForm.newPassword) {
          callback(new Error("Passwords do not match"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

const passwordStrengthFeedback = ref("");

const checkPasswordStrength = () => {
  const result = zxcvbn(ruleForm.newPassword);
  const strength = result.score;

  const strengthFeedback = [
    "Very Weak",
    "Weak",
    "Moderate",
    "Strong",
    "Very Strong",
  ][strength];

  passwordStrengthFeedback.value = strengthFeedback;
};

const isWeakPassword = computed(() => {
  return zxcvbn(ruleForm.newPassword).score < 3;
});

const passwordMismatch = computed(() => {
  return ruleForm.newPassword !== ruleForm.confirmPassword;
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      userStore.resetPassword(token, ruleForm.newPassword);
    }
  });
};
</script>

<style scoped>
.reset-password-wrapper {
  position: absolute;
  padding: 10% 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reset-password-content {
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

.reset-password-content form {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.reset-password-content form div {
  width: 100%;
}

.reset-password-title {
  font-size: 2em;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.reset-password-input {
  height: 50px;
  width: 100%;
  border: 1px hidden;
  border-radius: 10px;
  font-size: 1em;
  transition: border-color 0.3s;
}

.reset-password-input:focus {
  border: 2px solid;
  border-color: #007acc;
}

.password-strength {
  font-size: 0.9em;
  color: #007acc;
  margin-top: 5px;
}

.reset-password-btn {
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

.reset-password-btn:hover {
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

.password-strength {
  font-size: 0.9em;
  margin-top: 5px;
  color: var(--primary-color);
}

.weak-password {
  color: red;
  font-weight: bold;
}
</style>
