/*
 * @Author: wangqiaoling
 * @Date: 2023-11-10 09:13:11
 * @LastEditTime: 2023-11-10 13:13:25
 * @LastEditors: wangqiaoling
 * @Description: 打开、关闭APP基础操作
 */
export function useHandle() {
  // 打开关闭app
  const appVisible = ref<boolean>(false);
  const openApp = () => {
    appVisible.value = true;
  };
  const closeApp = () => {
    appVisible.value = false;
  };
  // 选择应用
  const currentAppKey = ref<number>(1);
  const chooseApp = (i: number) => {
    currentAppKey.value = i;
  };
  return {
    appVisible,
    openApp,
    closeApp,
    currentAppKey,
    chooseApp,
  };
}
