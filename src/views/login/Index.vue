<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-03 14:33:18
 * @LastEditTime: 2024-01-19 15:10:11
 * @LastEditors: wangqiaoling
 * @Description: 登录注册页
-->
<script setup lang="ts">
import LogoName from "@/layout/components/logoName/Index.vue";
import { useThemeType } from "@/layout/hooks/useThemeType";
import { theme } from "ant-design-vue";
import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";

// 主题相关
const { useToken } = theme;
const { token } = useToken();
console.log(token.value);
const boxBgColor = ref<string>(token.value.colorBgLayout);
const textColor = ref<string>(token.value.colorLink);
const descriptionTextColor = ref<string>(token.value.colorTextDescription);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const wrapBgColor = ref<string>(token.value.colorPrimaryLight);
watchEffect(() => {
  boxBgColor.value = token.value.colorBgLayout;
  textColor.value = token.value.colorLink;
  descriptionTextColor.value = token.value.colorTextDescription;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  wrapBgColor.value = token.value.colorPrimaryLight;
});
// 主题模式切换
const { dataThemeChange, isLight } = useThemeType();

// 登录注册切换
const currentForm = ref<string>("login");
const changeForm = (type: string) => {
  currentForm.value = type;
};
</script>

<template>
  <div class="login-page">
    <div class="login-wrap">
      <div class="login-header ilflex-bc">
        <div class="logo-box">
          <LogoName />
        </div>
        <a-typography-text type="secondary"
          >一个集成了各种实用工具的 Vue
          项目，使用前请认真阅读README.md文件</a-typography-text
        >
        <a-space class="login-btn-box">
          <a-button
            size="small"
            :type="currentForm === 'login' ? 'text' : 'primary'"
            @click="changeForm('register')"
            >注册</a-button
          >
          <a-button
            size="small"
            :type="currentForm === 'login' ? 'primary' : 'text'"
            @click="changeForm('login')"
            >登录</a-button
          >
          <a-switch :checked="!isLight" @change="dataThemeChange">
            <template #checkedChildren><IconFont type="dark" /></template>
            <template #unCheckedChildren><IconFont type="light" /></template>
          </a-switch>
        </a-space>
      </div>
      <div class="login-form-box">
        <div class="login-form">
          <div class="form-title">
            <span class="login-title">
              <span class="black-letter">W</span>
              <span class="black-letter">E</span>
              <span>L</span>
              <span class="black-letter">C</span>
              <span>O</span>
              <span class="black-letter">M</span>
              <span>E</span>
            </span>
          </div>
          <transition name="fade-slide" mode="out-in">
            <component
              :is="currentForm === 'login' ? LoginForm : RegisterForm"
              :textColor="descriptionTextColor"
              @changeForm="changeForm"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  background-color: v-bind(boxBgColor);

  .login-wrap {
    width: 100%;
    height: 100%;
    background-color: v-bind(wrapBgColor);

    .login-header {
      box-sizing: border-box;
      width: 100%;
      padding: 16px 28px;

      .logo-box {
        display: inline-flex;
      }
    }

    .login-form-box {
      width: 680px;
      height: 600px;
      margin: 0 auto;
      margin-top: calc((100vh / 2) - (600px / 2) - 72px);
      background-color: v-bind(boxBgColor);
      border-radius: 24px;

      .login-form {
        width: 384px;
        padding-top: 15%;
        margin: 0 auto;

        .form-title {
          width: 100%;
          margin-bottom: 10%;
          text-align: center;

          .login-title {
            font-family: Arial, Tahoma, Geneva, Verdana, sans-serif;
            font-size: 36px;
            line-height: 36px;
            color: v-bind(textColor);
            letter-spacing: 3px;

            .black-letter {
              color: rgb(64 62 86);
            }
          }

          .login-title-img {
            width: 200px;
          }
        }
      }
    }
  }
}
</style>
