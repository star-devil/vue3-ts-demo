/*
 * @Author: wangqiaoling
 * @Date: 2023-11-10 13:20:02
 * @LastEditTime: 2023-11-10 13:20:32
 * @LastEditors: wangqiaoling
 * @Description: 切换按钮选择功能
 */
export function useSwitch() {
  // 选择项目
  const currentAppKey = ref<number>(1);
  const chooseApp = (i: number) => {
    currentAppKey.value = i;
  };
  return {
    currentAppKey,
    chooseApp,
  };
}
