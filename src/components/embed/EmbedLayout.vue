<!--
 * @Author: wangqiaoling
 * @Date: 2023-11-06 14:55:03
 * @LastEditTime: 2023-11-09 16:15:05
 * @LastEditors: wangqiaoling
 * @Description: 全局悬浮嵌入式应用
-->
<template>
  <div
    placement="right"
    class="embed-app-comp"
    :style="{ width: visible ? '450px' : '0px' }"
  >
    <div
      class="setting-box"
      :style="{ border: visible ? '1px solid #e5e8eb' : 'unset' }"
    >
      <div class="setting-drawer-index-content" v-show="visible">
        <iframe
          class="insert-web-app"
          v-if="visible"
          src="http://10.1.200.131:32505/#/chat"
          scrolling="no"
        ></iframe>
      </div>
      <!-- 一直悬浮在页面右侧的设置按钮 -->
      <div
        :class="[
          'setting-drawer-index-handle',
          isHoverMenu ? 'hover-handle' : '',
        ]"
        :style="{ right: visible ? '449px' : '0px' }"
        @click="toggleVisiable"
      >
        <el-icon v-if="visible" class="btn-icon"><Close /></el-icon>
        <el-icon v-else class="btn-icon"><ChatDotRound /></el-icon>
        <span class="handle-text">AI助手</span>
      </div>
      <div
        class="other-handle-box"
        :style="{ right: visible ? '454px' : '5px' }"
        @mouseover="mouseover"
        @mouseleave="mouseleave"
      >
        <div class="tools-btn-box">
          <div class="tools-box">
            <el-icon class="btn-icon"
              ><Close />
              <span class="icon-tip">这是应用说明1</span>
            </el-icon>
            <el-icon class="btn-icon"
              ><ChatDotRound />
              <span class="icon-tip">这是说明2</span>
            </el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChatDotRound, Close } from "@element-plus/icons-vue";
import { ref } from "vue";

export default {
  name: "EmbedLayoutComp",
  components: {
    ChatDotRound,
    Close,
  },
  setup() {
    // 鼠标移入副菜单增加样式，因为文档流不允许选择前一个节点，无法使用hover效果
    const isHoverMenu = ref(false);
    const mouseover = () => {
      isHoverMenu.value = true;
    };
    const mouseleave = () => {
      isHoverMenu.value = false;
    };
    // 打开关闭
    const visible = ref(false);
    const onClose = () => {
      visible.value = false;
    };
    const toggleVisiable = () => {
      visible.value = !visible.value;
      updatePageSpace();
    };
    const updatePageSpace = () => {
      let resize = () => {
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));
        }, 10);
      };
      const pendStyle = () => {
        let dom = document.getElementById("h5-app-right-space");
        let style = `
                  html {
                    width: calc(100% - 450px) !important;
                    position: relative !important;
                    min-height: 100vh !important;
                  }
                `;
        if (dom) dom.innerHTML = style;
        else {
          let styleDom = document.createElement("style");
          styleDom.id = "h5-app-right-space";
          styleDom.innerHTML = style;
          document.head.appendChild(styleDom);
        }
      };
      const removeDom = () => {
        let dom = document.getElementById("h5-app-right-space");
        dom && dom.remove();
      };
      const close = () => {
        removeDom();
        resize();
      };
      const open = () => {
        close();
        pendStyle();
        resize();
      };
      visible.value ? open() : close();
    };
    return {
      // 鼠标悬浮
      isHoverMenu,
      mouseover,
      mouseleave,
      // 打开关闭
      visible,
      onClose,
      toggleVisiable,
    };
  },
};
</script>

<style lang="scss" scoped>
.embed-app-comp {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 5000;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  color: #333;
  text-align: left;
  white-space: normal;
  border-top: none;
  border-bottom: none;
  border-radius: 0;

  .setting-box {
    background: #fff;
    box-shadow: 0 8px 16px #919eab29;
  }

  .setting-drawer-index-content {
    height: 100vh;
  }

  .main-handle-box {
    height: 80px;
  }

  .setting-drawer-index-handle {
    position: absolute;
    top: 240px;
    z-index: 5001;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 40px;
    padding: 0 8px 0 14px;
    font-size: 16px;
    color: #3872e0;
    text-align: center;
    pointer-events: auto;
    cursor: pointer;
    user-select: none;
    background: #fff;
    border: 1px solid #e5e8eb;
    border-top-left-radius: 32px;
    border-bottom-left-radius: 32px;
    box-shadow:
      0 3.2px 12px #00000014,
      0 5px 25px #0000000a;
    transition: all 0.2s ease-in-out;

    &:hover {
      gap: 6px;
      width: 100px;
      color: #fff;
      background-color: #3872e0;
      border-color: #ffffff40;
      transition: all 0.2s ease-in-out;

      .handle-text {
        width: unset;
        opacity: 1;
        transition: all 0.1s linear;
        transition-delay: 0.1s;
      }

      + .other-handle-box {
        display: flex;
        animation: show 0.2s ease-in-out;
      }
    }

    .handle-text {
      width: 0;
      font-size: 16px;
      font-weight: 500;
      color: #fff;
      opacity: 0;
    }

    .btn-icon {
      font-size: 24px;
    }
  }

  .hover-handle {
    gap: 6px;
    width: 100px;
    color: #fff;
    background-color: #3872e0;
    border-color: #ffffff40;
    transition: all 0.2s ease-in-out;

    .handle-text {
      width: unset;
      opacity: 1;
      transition: all 0.1s linear;
      transition-delay: 0.1s;
    }
  }

  .other-handle-box {
    position: absolute;
    top: 145px;
    z-index: 5001;
    display: none;
    padding-bottom: 30px;

    &:hover {
      display: flex;
      animation: show 0.2s ease-in-out;
    }

    .tools-btn-box {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 40px;
      justify-content: center;
      width: 40px;
      padding: 8px 4px;
      font-size: 22px;
      font-weight: 500;
      color: #3872e0;
      background: #fff;
      border: 1px solid #e4e9ed;
      border-radius: 32px;
      box-shadow:
        0 4px 24px #919eab24,
        0 0 2px #919eab33;

      .tools-box {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: center;
        width: 100%;
      }

      .btn-icon {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        text-align: center;
        cursor: pointer;
        border-radius: 50%;

        &:hover {
          background: #e8ebf3;
          transition: background 0.2s ease-in-out;

          .icon-tip {
            position: absolute;
            top: 0;
            right: 40px;
            display: inline-flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: flex-end;
            width: max-content;
            padding: 3px 5px;
            font-size: 14px;
            font-weight: 300;
            color: #fff;
            text-align: right;
            background-color: #333333bf;
            border-radius: 5px;
          }
        }

        .icon-tip {
          display: none;
        }
      }
    }
  }
  @keyframes show {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  .insert-web-app {
    width: 100%;
    height: 100%;
    border: unset;
  }
}
</style>
