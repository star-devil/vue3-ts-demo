/*
 * @Author: wangqiaoling
 * @Date: 2023-11-10 09:55:44
 * @LastEditTime: 2023-11-10 14:51:35
 * @LastEditors: wangqiaoling
 * @Description: 菜单tab
 */
import { MenuProps } from "ant-design-vue";
import { Key } from "ant-design-vue/es/_util/type";
export function useTabs() {
  const current = ref<Key[] | undefined>(["treatment"]);
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
  const router = useRouter();

  const changeMenu: MenuProps["onClick"] = (menuInfo) => {
    current.value = menuInfo.keyPath;
    router.replace(`/${menuInfo.key}`);
  };
  return {
    changeMenu,
    current,
    items,
  };
}
