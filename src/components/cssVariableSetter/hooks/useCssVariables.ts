/*
 * @Author: wangqiaoling
 * @Date: 2024-03-21 10:00:04
 * @LastEditTime: 2024-03-21 15:54:46
 * @LastEditors: wangqiaoling
 * @Description: 将当前所处的<ConfigProvider>下的ant design token映射为CSS变量字符串，写入一个对应的style标签。
 */
import { theme } from "ant-design-vue";
import { forIn } from "lodash";

// 生成随机字符串
function generateRandomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function useCssVariables(isGlobal = false) {
  const state = reactive({
    cssVarContainerID: `css-var-container-${generateRandomString(6)}`,
    styleEleId: "",
    token: theme.useToken(),
  });

  const setCssVariables = (styleEleId: string) => {
    state.styleEleId = styleEleId;
    let styleEle = document.getElementById(
      state.styleEleId
    ) as HTMLStyleElement;
    const isAlreadyHaveStyleEle = Boolean(styleEle);
    if (!isAlreadyHaveStyleEle) {
      styleEle = document.createElement("style");
      styleEle.id = state.styleEleId;
      styleEle.setAttribute("type", "text/css");
      document.head.append(styleEle);
    }

    let cssVariablesString = "";
    const colorTokenArr = [];
    forIn(state.token.token, function (value, key) {
      colorTokenArr.push({
        tokenName: key,
        tokenValue: value,
      });
    });

    console.log("%ccolorTokenArr=", "color:red;font-size:20px", colorTokenArr);
    colorTokenArr.forEach(({ tokenName, tokenValue }) => {
      cssVariablesString = cssVariablesString.concat(
        `--${tokenName}: ${tokenValue};`
      );
      // 如果是全局的configProvider，则还需要添加对应的--global-xxxx
      // 使整个项目的任何位置都能引用到此css变量
      if (isGlobal) {
        cssVariablesString = cssVariablesString.concat(
          `--global-${tokenName}: ${tokenValue};`
        );
      }
    });

    // 定义这些css变量生效的作用域（css选择器）
    const styleRootSelector = isGlobal
      ? ":root"
      : `#${state.cssVarContainerID}`;

    // 将选择器与css变量字符串拼接
    cssVariablesString = `${styleRootSelector} { ${cssVariablesString} }`;

    styleEle.innerHTML = cssVariablesString;
  };

  const clearCssVariables = () => {
    const styleEle = document.getElementById(
      state.styleEleId
    ) as HTMLStyleElement;
    styleEle.remove?.();
  };

  return {
    state,
    setCssVariables,
    clearCssVariables,
  };
}
