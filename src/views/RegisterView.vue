<template>
  <div class="registration-wrapper">
    <el-card class="registration-content">
      <h4 class="registration-title">Join the Adventure!</h4>
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
        <el-form-item label="First Name" prop="firstName">
          <el-input
            class="registration-input"
            v-model="ruleForm.firstName"
            autofocus
            type="text"
            @keyup.enter="submitForm(ruleFormRef)"
          />
        </el-form-item>

        <el-form-item label="Last Name" prop="lastName">
          <el-input
            class="registration-input"
            v-model="ruleForm.lastName"
            type="text"
            @keyup.enter="submitForm(ruleFormRef)"
          />
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input
            class="registration-input"
            v-model="ruleForm.email"
            type="text"
            @keyup.enter="submitForm(ruleFormRef)"
          />
        </el-form-item>

        <el-form-item label="Username" prop="username">
          <el-input
            class="registration-input"
            v-model="ruleForm.username"
            type="text"
            @keyup.enter="submitForm(ruleFormRef)"
          />
        </el-form-item>

        <el-form-item label="Password" prop="password">
          <el-input
            class="registration-input"
            v-model="ruleForm.password"
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

        <el-form-item label="Confirm Password" prop="confirmPassword">
          <el-input
            class="registration-input"
            v-model="ruleForm.confirmPassword"
            type="password"
            @keyup.enter="submitForm(ruleFormRef)"
          />
        </el-form-item>

        <el-button
          class="registration-btn"
          size="large"
          type="primary"
          :loading="userStore.isLoading"
          :disabled="isWeakPassword || passwordMismatch"
          @click="submitForm(ruleFormRef)"
        >
          Register
        </el-button>
      </el-form>
      <Router-link to="/login" class="back-to-login">
        Already have an account? Log in here!
      </Router-link>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import zxcvbn from "zxcvbn";
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
});

const rules = ref<FormRules>({
  firstName: [
    { required: true, message: "First Name is required", trigger: "blur" },
  ],
  lastName: [
    { required: true, message: "Last Name is required", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Email is required", trigger: "blur" },
    {
      type: "email",
      message: "Please enter a valid email address",
      trigger: "blur",
    },
  ],
  username: [
    { required: true, message: "Username is required", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Password is required", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (zxcvbn(value).score < 3) {
          callback(new Error("Password is too weak"));
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
      message: "Confirm Password is required",
      trigger: "blur",
    },
    {
      validator: (rule, value, callback) => {
        if (value !== ruleForm.password) {
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
  const result = zxcvbn(ruleForm.password);
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
  return zxcvbn(ruleForm.password).score < 3;
});

const passwordMismatch = computed(() => {
  return ruleForm.password !== ruleForm.confirmPassword;
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      userStore.register(
        ruleForm.firstName,
        ruleForm.lastName,
        ruleForm.email,
        ruleForm.username,
        ruleForm.password,
      );
    }
  });
};
</script>

<style scoped>
.registration-wrapper {
  position: absolute;
  padding: 10% 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.registration-content {
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

.registration-content form {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.registration-content form div {
  width: 100%;
}

.registration-title {
  font-size: 2em;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.registration-input {
  height: 50px;
  width: 100%;
  border: 1px hidden;
  border-radius: 10px;
  font-size: 1em;
  transition: border-color 0.3s;
}

.registration-input:focus {
  border: 2px solid;
  border-color: #007acc;
}

.password-strength {
  font-size: 0.9em;
  color: #007acc;
  margin-top: 5px;
}

.registration-btn {
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

.registration-btn:hover {
  background-color: #888888;
}

.back-to-login {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 0.9em;
  margin-top: 20px;
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
