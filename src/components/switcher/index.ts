/*
 * @Author: wangqiaoling
 * @Date: 2023-11-10 13:20:02
 * @LastEditTime: 2023-11-10 18:04:32
 * @LastEditors: wangqiaoling
 * @Description: 切换按钮选择功能
 */
import knowledgeIcon from "@assets/data/knowledge.json";
import { find } from "lodash";
export function useSwitch() {
  // 取图标
  const getIcon = (name: string) => {
    const obj = find(knowledgeIcon, function (o: any) {
      return o.label === name;
    });
    console.log("data---", name, obj);
    return obj?.iconName;
  };

  // 选择项目
  const currentAppKey = ref<string>();
  const chooseApp = (i: string) => {
    currentAppKey.value = i;
  };
  return {
    getIcon,
    currentAppKey,
    chooseApp,
  };
}
