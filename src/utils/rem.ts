/*
 * @Author: wangqiaoling
 * @Date: 2024-01-18 14:50:26
 * @LastEditTime: 2024-01-18 16:24:18
 * @LastEditors: wangqiaoling
 * @Description: 页面像素自适应
 */
// 自适应
const baseSize = 14;

function resize() {
  // 当前页面屏幕分辨率相对于1920宽的缩放比例，可根据自己需要修改
  let scale = document.documentElement.clientWidth / 1920;
  // 下面这一行代码可以忽略，这是我另外加的，我加这行代码是为了屏幕宽度小于1280时就不继续等比缩放了
  if (document.documentElement.clientWidth < 1280) scale = 1280 / 1920;
  // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
  document.documentElement.style.fontSize = `${
    baseSize * Math.min(scale, 1)
  }px`;
}
resize();
window.onresize = resize;
