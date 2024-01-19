<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-19 14:14:17
 * @LastEditTime: 2024-01-19 17:55:35
 * @LastEditors: wangqiaoling
 * @Description: 注册表单
-->
<script setup lang="ts">
import { formState, onLogin } from "../utils/register";
import { loginRules } from "../utils/rule";

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
</script>

<template>
  <div class="user-form">
    <a-form
      :model="formState"
      name="basic"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      :rules="loginRules"
      @finish="onLogin"
    >
      <a-form-item name="username">
        <a-input
          placeholder="请创建您的账号"
          v-model:value="formState.username"
        >
          <template #prefix>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="password">
        <a-form-item name="password" no-style>
          <a-input-password
            placeholder="请设置您的密码"
            v-model:value="formState.password"
          >
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <span class="block w-full text-center">
          <a-typography-text type="secondary"
            >密码格式应为8-18位数字、字母、符号中的任意两种组合</a-typography-text
          >
        </span>
      </a-form-item>

      <a-form-item name="vertifyCode" :wrapper-col="{ span: 24 }">
        <a-input-group compact>
          <a-input
            v-model:value="formState.vertifyCode"
            placeholder="验证码"
            style="width: calc(100% - 150px)"
          >
            <template #prefix>
              <VerifiedOutlined />
            </template>
          </a-input>
          <a-image
            :width="150"
            :height="32"
            src="/src/assets/images/testCode.png"
          />
        </a-input-group>
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ span: 24 }">
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="formState.remember"
            >7天内免登录
            <a-tooltip placement="right">
              <template #title
                >勾选并登录后，规定天数内无需输入用户名和密码会自动登入系统</template
              >
              <a-typography-text type="secondary"
                ><QuestionCircleOutlined
              /></a-typography-text>
            </a-tooltip>
          </a-checkbox>
        </a-form-item>
        <a class="login-form-forgot" href="">忘记密码？</a>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 24 }">
        <a-button block type="primary" html-type="submit">登录</a-button>
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
.user-form {
  .login-form-forgot {
    float: right;
  }

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
