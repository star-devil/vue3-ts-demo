/*
 * @Author: wangqiaoling
 * @Date: 2023-11-10 15:37:32
 * @LastEditTime: 2023-11-10 16:44:44
 * @LastEditors: wangqiaoling
 * @Description: 返回的文章列表数据
 */
export interface ListItem {
  content: ContentItem[];
  show_type: string;
}

interface ContentItem {
  uuid: string;
  name: string;
}
