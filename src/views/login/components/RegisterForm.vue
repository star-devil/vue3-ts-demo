<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-19 14:14:17
 * @LastEditTime: 2024-01-22 17:50:53
 * @LastEditors: wangqiaoling
 * @Description: 注册表单
-->
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
  <div class="user-form">
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
@mixin password-meter-text-style {
  position: absolute;
  top: -7px;
  left: 100%;
  font-size: 12px;
  word-break: keep-all;
  transform: translateX(5px);
}

.user-form {
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

  /** 密码强度组件 */
  .po-password-strength-bar {
    background-color: rgb(151 151 151 / 10%);
  }

  .po-password-strength-bar.risky {
    position: relative;
    width: 10%;
    background-color: #f95e68 !important;

    &::after {
      color: #f95e68;
      content: "弱";
      @include password-meter-text-style;
    }
  }

  .po-password-strength-bar.guessable {
    position: relative;
    width: 32.5%;
    background-color: #fb964d !important;

    &::after {
      color: #fb964d;
      content: "较弱";
      @include password-meter-text-style;
    }
  }

  .po-password-strength-bar.weak {
    position: relative;
    width: 55%;
    background-color: #fdd244 !important;

    &::after {
      color: #fdd244;
      content: "中等";
      @include password-meter-text-style;
    }
  }

  .po-password-strength-bar.safe {
    position: relative;
    width: 77.5%;
    background-color: #b0dc53 !important;

    &::after {
      color: #b0dc53;
      content: "较强";
      @include password-meter-text-style;
    }
  }

  .po-password-strength-bar.secure {
    position: relative;
    width: calc(100% - 17px);
    background-color: #35cc62 !important;

    &::after {
      color: #35cc62;
      content: "强";
      @include password-meter-text-style;
    }
  }
}
</style>
