<!--
 * @Author: wangqiaoling
 * @Date: 2024-01-03 14:33:18
 * @LastEditTime: 2024-01-18 16:23:09
 * @LastEditors: wangqiaoling
 * @Description: 登录页
-->
<script setup lang="ts">
import LogoName from "@/layout/components/logoName/Index.vue";
import { theme } from "ant-design-vue";
import { formState, onLogin } from "./utils/login";
import { loginRules } from "./utils/rule";

const { useToken } = theme;
const { token } = useToken();
console.log(token.value);
const boxBgColor = ref<string>(token.value.colorBgLayout);
const textColor = ref<string>(token.value.colorLink);
const descriptionTextColor = ref<string>(token.value.colorTextDescription);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const wrapBgColor = ref<string>(token.value.colorPrimaryLight);
</script>

<template>
  <div class="login-page">
    <div class="login-wrap">
      <div class="login-header">
        <div class="logo-box">
          <LogoName />
        </div>
        <a-typography-text type="secondary"
          >一个集成了各种实用工具的 Vue
          项目，使用前请认真阅读README.md文件</a-typography-text
        >
        <a-space class="login-btn-box">
          <a-button size="small">注册</a-button>
          <a-button size="small" type="primary">登录</a-button>
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
                <a-input placeholder="账号" v-model:value="formState.username">
                  <template #prefix>
                    <UserOutlined />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item name="password">
                <a-input-password
                  placeholder="密码"
                  v-model:value="formState.password"
                >
                  <template #prefix>
                    <LockOutlined />
                  </template>
                </a-input-password>
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
                <a-button block type="primary" html-type="submit"
                  >登录</a-button
                >
              </a-form-item>
            </a-form>
          </div>
          <div class="register-guide-box">
            <span class="guide-text">还没有账号？</span>
            <a-typography-link target="" class="guide-register">
              去注册
            </a-typography-link>
          </div>
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
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
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

        .user-form {
          .login-form-forgot {
            float: right;
          }
        }

        .register-guide-box {
          width: 100%;
          font-size: 12px;
          text-align: center;

          .guide-text {
            color: v-bind(descriptionTextColor);
          }

          .guide-register {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
