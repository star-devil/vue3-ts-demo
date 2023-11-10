/*
 * @Author: wangqiaoling
 * @Date: 2023-11-10 15:51:22
 * @LastEditTime: 2023-11-10 17:55:03
 * @LastEditors: wangqiaoling
 * @Description: 诊疗助手api
 */
import { ListItem } from "@/components/switcher/data";
import instance from "@api/axios";

/**
 * @param type 文件类型：0-患者数据，1-医学知识，2-诊疗助手，3-用药助手，4-虚拟患者
 * @param name 文件名称
 * @param is_user_flag 是否用户私有，0-否 1-是
 * @param group 是否根据类型分组，0-否 1-是
 */
export const getknowledgeList = (
  type: number,
  name: string,
  is_user_flag: number,
  group: number
) => {
  let url = `/local_doc_qa/knowledge_search?type=${type}&is_user_flag=${is_user_flag}&name=${name}`;
  if (group !== undefined) url += `&group_by=${group}`;
  return instance.get<ListItem[]>(url);
};
