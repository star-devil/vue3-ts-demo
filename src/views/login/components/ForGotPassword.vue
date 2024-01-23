<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-19 14:14:17
 * @LastEditTime: 2024-01-23 11:05:41
 * @LastEditors: wangqiaoling
 * @Description: 注册表单
-->
<script setup lang="ts">
import { useUserInfo } from "@store/modules/userInfo";
import message from "ant-design-vue/es/message";
import PasswordMeter from "vue-simple-password-meter";
import { formState, registerRules } from "../utils/resetPassword";

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

// 如果在登录页输入了账号，就作为需要重置密码的账号
const userCount = ref<string>(useUserInfo().userCount);
watch(
  userCount,
  (newVal) => {
    formState.username = newVal;
  },
  { immediate: true }
);

const onReset = (values: any) => {
  console.log("重置信息已接收--", values);
  message.success("重置成功，请登录");
  goLogin();
};
</script>

<template>
  <div class="reset-password-form">
    <a-form
      :model="formState"
      name="basic"
      :wrapper-col="{ span: 24 }"
      autocomplete="off"
      :rules="registerRules"
      @finish="onReset"
    >
      <a-form-item name="username">
        <a-input
          placeholder="请输入需要重置的账号"
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
          placeholder="请设置新密码"
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
        <a-button block type="primary" html-type="submit">提交</a-button>
      </a-form-item>
    </a-form>
    <div class="reset-guide-box">
      <span class="guide-text">您已经重置过密码？</span>
      <a-typography-link class="guide-register" target="" @click="goLogin">
        去登录
      </a-typography-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../utils/poPaswordStyle";

.reset-password-form {
  .reset-guide-box {
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
