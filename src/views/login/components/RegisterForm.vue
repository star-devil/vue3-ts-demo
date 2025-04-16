<script setup lang="ts">
import message from "ant-design-vue/es/message";
import PasswordMeter from "vue-simple-password-meter";
import { formState, registerRules } from "../utils/register";
const emit = defineEmits<{
  changeForm: [type: string];
}>();

const goLogin = () => {
  emit("changeForm", "login");
};

const props = defineProps({
  textColor: {
    type: String,
    default: "",
  },
});

const onRegister = (values: any) => {
  console.log("注册信息已接收--", values);
  message.success("注册成功，请登录");
  goLogin();
};
</script>

<template>
  <div class="register-form">
    <a-form
      :model="formState"
      name="basic"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      :rules="registerRules"
      @finish="onRegister"
    >
      <a-form-item name="username">
        <a-input
          placeholder="请创建您的账号"
          v-model:value="formState.username"
          allow-clear
        >
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="password">
        <a-input-password
          placeholder="请设置您的密码"
          v-model:value="formState.password"
          allow-clear
        >
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
        <password-meter :password="formState.password" />
        <span class="block w-full text-center">
          <a-typography-text type="secondary"
            >密码格式应为8-18位数字、字母、符号中的任意两种组合</a-typography-text
          >
        </span>
      </a-form-item>

      <a-form-item name="repeatPassword" :wrapper-col="{ span: 24 }">
        <a-input-password
          placeholder="确认密码"
          v-model:value="formState.repeatPassword"
          allow-clear
        >
          <template #prefix>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 24 }">
        <a-button block type="primary" html-type="submit">注册</a-button>
      </a-form-item>
    </a-form>
    <div class="register-guide-box">
      <span class="guide-text">已有账号？</span>
      <a-typography-link class="guide-register" target="" @click="goLogin">
        去登录
      </a-typography-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../utils/poPaswordStyle";

.register-form {
  .register-guide-box {
    width: 100%;
    font-size: 12px;
    text-align: center;

    .guide-text {
      color: v-bind("props.textColor");
    }

    .guide-register {
      font-size: 12px;
    }
  }
}
</style>
