<!--
 * @Description: 登录注册页
-->
<script setup lang="ts">
import LogoName from "@/layout/components/logoName/Index.vue";
import { useThemeType } from "@/layout/hooks/useThemeType";
import ForGotPassword from "./components/ForGotPassword.vue";
import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";

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
            v-if="currentForm !== 'reset'"
            size="small"
            :type="currentForm === 'login' ? 'text' : 'primary'"
            @click="changeForm('register')"
            >注册</a-button
          >
          <a-button
            v-if="currentForm !== 'reset'"
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
      <transition name="fade-slide" mode="out-in">
        <div
          class="forgot-password-form-box form-box"
          v-if="currentForm === 'reset'"
        >
          <div class="forgot-form form-item">
            <div class="forgot-title item-title">
              <span class="forgot-title title-item">
                <span class="black-letter">请</span>
                <span>设</span>
                <span class="black-letter">置</span>
                <span>新</span>
                <span>密</span>
                <span class="black-letter">码</span>
              </span>
            </div>
            <ForGotPassword @changeForm="changeForm" />
          </div>
        </div>
        <div class="login-form-box form-box" v-else>
          <div class="login-form form-item">
            <div class="form-title item-title">
              <span class="login-title title-item">
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
                @changeForm="changeForm"
              />
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  background-color: var(--colorBgLayout);

  .login-wrap {
    width: 100%;
    height: 100%;
    background-color: var(--colorPrimaryLight);

    .login-header {
      box-sizing: border-box;
      width: 100%;
      padding: 16px 28px;

      .logo-box {
        display: inline-flex;
      }
    }

    .form-box {
      width: 680px;
      height: 600px;
      margin: 0 auto;
      margin-top: calc((100vh / 2) - (600px / 2) - 72px);
      background-color: var(--colorBgLayout);
      border-radius: 24px;

      .form-item {
        width: 384px;
        padding-top: 15%;
        margin: 0 auto;

        .item-title {
          width: 100%;
          margin-bottom: 10%;
          text-align: center;

          .title-item {
            font-family: Arial, Tahoma, Geneva, Verdana, sans-serif;
            font-size: 36px;
            line-height: 36px;
            color: var(--colorLink);
            letter-spacing: 3px;

            .black-letter {
              color: rgb(64 62 86);
            }
          }
        }
      }
    }
  }
}
</style>
