/*
 * @Author: wangqiaoling
 * @Date: 2023-12-19 15:05:34
 * @LastEditTime: 2023-12-19 15:46:30
 * @LastEditors: wangqiaoling
 * @Description: iconfont图标文件，更新图标后务必使用最新js内容再次全部覆盖
 */
/* eslint-disable */
window._iconfont_svg_string_4379833 = '<svg><symbol id="light" viewBox="0 0 1024 1024"><path d="M512 224c-159.06 0-288 128.94-288 288s128.94 288 288 288 288-128.94 288-288-128.94-288-288-288z m0 512c-123.71 0-224-100.29-224-224s100.29-224 224-224 224 100.29 224 224-100.29 224-224 224zM512 64a32 32 0 0 0-32 32v64a32 32 0 0 0 64 0V96a32 32 0 0 0-32-32zM512 832a32 32 0 0 0-32 32v64a32 32 0 0 0 64 0v-64a32 32 0 0 0-32-32zM195.22 195.22a32 32 0 0 0 0 45.25l45.25 45.25a32 32 0 0 0 45.25-45.25l-45.25-45.25a32 32 0 0 0-45.25 0zM738.27 738.27a32 32 0 0 0 0 45.25l45.25 45.25a32 32 0 0 0 45.25-45.25l-45.25-45.25a32 32 0 0 0-45.25 0zM64 512a32 32 0 0 0 32 32h64a32 32 0 0 0 0-64H96a32 32 0 0 0-32 32zM832 512a32 32 0 0 0 32 32h64a32 32 0 0 0 0-64h-64a32 32 0 0 0-32 32zM195.22 828.78a32 32 0 0 0 45.25 0l45.25-45.25a32 32 0 0 0-45.25-45.25l-45.25 45.25a32 32 0 0 0 0 45.25zM738.27 285.73a32 32 0 0 0 45.25 0l45.25-45.25a32 32 0 0 0-45.25-45.25l-45.25 45.25a32 32 0 0 0 0 45.25z"  ></path></symbol></svg>',
    function (n) {
        var t = (t = document.getElementsByTagName("script"))[t.length - 1],
            e = t.getAttribute("data-injectcss"),
            t = t.getAttribute("data-disable-injectsvg");
        if (!t) {
            var a, o, i, c, d, s = function (t, e) {
                e.parentNode.insertBefore(t, e)
            };
            if (e && !n.__iconfont__svg__cssinject__) {
                n.__iconfont__svg__cssinject__ = !0;
                try {
                    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
                } catch (t) {
                    console && console.log(t)
                }
            }
            a = function () {
                var t, e = document.createElement("div");
                e.innerHTML = n._iconfont_svg_string_4379833, (e = e.getElementsByTagName("svg")[0]) && (e.setAttribute("aria-hidden", "true"), e.style.position = "absolute", e.style.width = 0, e.style.height = 0, e.style.overflow = "hidden", e = e, (t = document.body).firstChild ? s(e, t.firstChild) : t.appendChild(e))
            }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(a, 0) : (o = function () {
                document.removeEventListener("DOMContentLoaded", o, !1), a()
            }, document.addEventListener("DOMContentLoaded", o, !1)) : document.attachEvent && (i = a, c = n.document, d = !1, r(), c.onreadystatechange = function () {
                "complete" == c.readyState && (c.onreadystatechange = null, l())
            })
        }

        function l() {
            d || (d = !0, i())
        }

        function r() {
            try {
                c.documentElement.doScroll("left")
            } catch (t) {
                return void setTimeout(r, 50)
            }
            l()
        }
    }(window);