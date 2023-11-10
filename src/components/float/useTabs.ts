/*
 * @Author: wangqiaoling
 * @Date: 2023-11-10 09:55:44
 * @LastEditTime: 2023-11-10 13:28:10
 * @LastEditors: wangqiaoling
 * @Description: 菜单tab
 */
import { MenuProps } from "ant-design-vue";
export function useTabs() {
  const current = ref<string[]>(["treatment"]);
  const items = ref<MenuProps["items"]>([
    {
      key: "treatment",
      label: "诊疗助手",
      title: "诊疗助手",
    },
    {
      key: "medicine",
      label: "用药助手",
      title: "用药助手",
    },
  ]);
  const changeMenu = (key: string) => {
    current.value = [key];
  };
  return {
    changeMenu,
    current,
    items,
  };
}
