/*
 * @Author: wangqiaoling
 * @Date: 2023-12-18 10:17:06
 * @LastEditTime: 2023-12-18 10:29:26
 * @LastEditors: wangqiaoling
 * @Description: Iconify Icon在Vue里在线使用（用于外网环境）
 */
import { Icon as IconifyIcon } from "@iconify/vue";
import { defineComponent, h } from "vue";

export default defineComponent({
  name: "IconifyIconOnline",
  components: { IconifyIcon },
  props: {
    icon: {
      type: String,
      default: "",
    },
  },
  render() {
    const attrs = this.$attrs;
    return h(
      IconifyIcon,
      {
        icon: `${this.icon}`,
        style: attrs?.style
          ? Object.assign(attrs.style, { outline: "none" })
          : { outline: "none" },
        ...attrs,
      },
      {
        default: () => [],
      }
    );
  },
});
