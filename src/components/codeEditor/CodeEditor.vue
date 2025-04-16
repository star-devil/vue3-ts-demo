<!--
 * @Description: 代码编辑器
-->
<script setup lang="ts">
import { useThemeStore } from "@store/modules/setting";
import type { SelectProps } from "ant-design-vue";
import { find } from "lodash";
// 代码编辑器
import { Editor, EditorConfiguration } from "codemirror";
import VueCodemirror, { CmComponentRef } from "codemirror-editor-vue3";
// 支持的语言类型：javascript、html、xml、css、json、vue、markdown、php、python、sql、go、yaml、c、c++、java
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/go/go.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/markdown/markdown.js";
import "codemirror/mode/php/php.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/vue/vue.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/yaml/yaml.js";

// 折叠功能
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/foldgutter.js";
// 自动提示
import "codemirror/addon/hint/javascript-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint.js";
// 代码检验: 目前只只支持js和JSON
import "codemirror/addon/lint/javascript-lint";
import "codemirror/addon/lint/json-lint";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/lint.js";
import { JSHINT } from "jshint";
import jsonlint from "jsonlint-mod";
// 主题
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/duotone-dark.css";
import "codemirror/theme/duotone-light.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/juejin.css";

(window as any).jsonlint = jsonlint;
(window as any).JSHINT = JSHINT;

const themeData = useThemeStore();

const emit = defineEmits<{
  getNewCode: [type: string];
}>();

const props = defineProps({
  code: {
    type: String,
    default: `{
    "compilerOptions": {
        "baseUrl": ".",
        "outDir": "temp",
        "sourceMap": false,
        "target": "es2016",
        "newLine": "LF",
        "useDefineForClassFields": false,
        "module": "esnext",
        "moduleResolution": "bundler",
        "allowJs": true,
        "strict": true,
        "noUnusedLocals": true,
        "experimentalDecorators": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "removeComments": false,
        "jsx": "preserve",
        "lib": ["es2016", "dom"],
        "types": ["vitest/globals", "puppeteer", "node"],
        "rootDir": ".",
        "paths": {
          "@vue/compat": ["packages/vue-compat/src"],
          "@vue/*": ["packages/*/src"],
          "vue": ["packages/vue/src"]
        }
      }
    }`,
  },
  language: {
    type: String,
    default: "javascript",
  },
  height: {
    type: Object,
    default: () => ({
      number: 100,
      unix: "%",
    }),
  },
  width: {
    type: Object,
    default: () => ({
      number: 100,
      unix: "%",
    }),
  },
  placeholder: {
    type: String,
    default: "请在此处输入代码",
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  needCopy: {
    type: Boolean,
    default: true,
  },
});

// 语言选择
const languageList = ref<SelectProps["options"]>([
  {
    value: "javascript",
    label: "js/ts/json",
  },
  {
    value: "text/html",
    label: "html",
  },
  {
    value: "css",
    label: "css",
  },
  {
    value: "text/x-sql",
    label: "sql",
  },
  {
    value: "text/x-yaml",
    label: "yaml",
  },
  {
    value: "text/x-java",
    label: "java",
  },
  {
    value: "text/x-csrc",
    label: "c",
  },
  {
    value: "text/x-c++src",
    label: "c++",
  },
  {
    value: "text/x-python",
    label: "python",
  },
  {
    value: "text/x-go",
    label: "go",
  },
  {
    value: "text/x-php",
    label: "php",
  },
  {
    value: "text/x-markdown",
    label: "markdown",
  },
  {
    value: "text/x-vue",
    label: "vue",
  },
]);
// 主题选择
const themeList = ref<SelectProps["options"]>([
  {
    value: "default",
    label: "default",
  },
  {
    value: "base16-dark",
    label: "base16-dark",
  },
  {
    value: "base16-light",
    label: "base16-light",
  },
  {
    value: "blackboard",
    label: "blackboard",
  },
  {
    value: "darcula",
    label: "darcula",
  },
  {
    value: "duotone-dark",
    label: "duotone-dark",
  },
  {
    value: "duotone-light",
    label: "duotone-light",
  },
  {
    value: "elegant",
    label: "elegant",
  },
  {
    value: "juejin",
    label: "juejin",
  },
]);

// 交互配置
// 转换语言
const defalutLanguage = ref("");
function converLanguage() {
  const jsLanguages = ["javascript", "typescript", "json"];

  if (jsLanguages.includes(props.language)) {
    return "javascript";
  } else {
    const language = find(languageList.value, function (language) {
      return language.label === props.language;
    }).value;
    return language as string;
  }
}

onMounted(() => {
  defalutLanguage.value = converLanguage();
});

// 转换代码
const defaultCode = ref(props.code);

// 转换宽高
const defaultWidth = reactive({
  number: props.width.number,
  unix: props.width.unix,
});
const defaultHeight = reactive({
  number: props.height.number,
  unix: props.height.unix,
});
const theme = ref("default");
const defaultFontSize = ref(14);
const defaultLineHeight = ref(20);
const hasBorder = ref(true);
const readOnly = ref(props.readOnly);

const cmOptions: EditorConfiguration = reactive({
  mode: defalutLanguage.value, // 语言
  theme: theme.value, // 主题
  readOnly: readOnly.value, // 只读
  matchBrackets: true, //括号匹配
  autoCloseBrackets: true, // 自动补齐
  styleActiveLine: true, //line选择是是否高亮
  lineNumbers: true, //是否显示行数
  lineWrapping: true, //是否自动换行
  matchTags: { bothTags: true }, // 将突出显示光标周围的标签
  lint: true,
  foldGutter: true, // 可将对象折叠，与下面的gutters一起使用
  gutters: ["CodeMirror-foldgutter"],
  hintOptions: {
    completeSingle: false,
  }, // 提示配置
});

const codemirrorRef = ref<CmComponentRef | null>(null);
const cminstance = ref<Editor>();
onMounted(() => {
  cminstance.value = codemirrorRef.value?.cminstance;
  cminstance.value?.focus();
});

watch(
  themeData,
  (newVal) => {
    newVal.type === "light"
      ? (theme.value = "default")
      : (theme.value = "darcula");
  },
  {
    immediate: true,
  }
);
watchEffect(() => {
  cmOptions.mode = defalutLanguage.value;
  cmOptions.theme = theme.value;
  cmOptions.readOnly = readOnly.value;
  cmOptions.lint = defalutLanguage.value === "javascript";
});

function saveCode() {
  if (cminstance.value) {
    const newCode = cminstance.value.getValue();
    emit("getNewCode", newCode);
  }
}
</script>

<template>
  <div class="editor-tools-box">
    <a-space size="large">
      <a-space>
        <span>选择语言</span>
        <a-select
          v-model:value="defalutLanguage"
          class="small-width"
          :options="languageList"
          size="small"
        ></a-select>
      </a-space>

      <a-space>
        <span>字体大小</span>
        <a-input-number
          v-model:value="defaultFontSize"
          class="small-width"
          addon-after="px"
          size="small"
        >
        </a-input-number>
      </a-space>

      <a-space>
        <span>行高</span>
        <a-input-number
          v-model:value="defaultLineHeight"
          class="small-width"
          addon-after="px"
          size="small"
        >
        </a-input-number>
      </a-space>

      <a-space>
        <span>宽度</span>
        <a-input-number
          v-model:value="defaultWidth.number"
          class="large-width"
          size="small"
        >
          <template #addonAfter>
            <a-select v-model:value="defaultWidth.unix" style="width: 70px">
              <a-select-option value="%">%</a-select-option>
              <a-select-option value="px">px</a-select-option>
              <a-select-option value="rem">rem</a-select-option>
              <a-select-option value="em">em</a-select-option>
              <a-select-option value="vw">vw</a-select-option>
              <a-select-option value="vh">vh</a-select-option>
            </a-select>
          </template>
        </a-input-number>
      </a-space>

      <a-space>
        <span>高度</span>
        <a-input-number
          v-model:value="defaultHeight.number"
          class="large-width"
          size="small"
        >
          <template #addonAfter>
            <a-select v-model:value="defaultHeight.unix" style="width: 70px">
              <a-select-option value="%">%</a-select-option>
              <a-select-option value="px">px</a-select-option>
              <a-select-option value="rem">rem</a-select-option>
              <a-select-option value="em">em</a-select-option>
              <a-select-option value="vw">vw</a-select-option>
              <a-select-option value="vh">vh</a-select-option>
            </a-select>
          </template>
        </a-input-number>
      </a-space>

      <a-space>
        <span>主题</span>
        <a-select
          ref="select"
          v-model:value="theme"
          class="small-width"
          :options="themeList"
          size="small"
        ></a-select>
      </a-space>

      <a-space>
        <span> 边框 </span>
        <a-switch
          v-model:checked="hasBorder"
          checked-children="显示"
          un-checked-children="隐藏"
          size="small"
        />
      </a-space>
      <a-space>
        <span> 只读 </span>
        <a-switch
          v-model:checked="readOnly"
          checked-children="是"
          un-checked-children="否"
          size="small"
        />
      </a-space>

      <CopyButton size="small" v-if="needCopy" :code="props.code" />

      <a-button @click="saveCode" type="primary" size="small"> 保存 </a-button>
    </a-space>
  </div>

  <VueCodemirror
    v-model:value="defaultCode"
    ref="codemirrorRef"
    :options="cmOptions"
    :placeholder="props.placeholder"
    :height="defaultHeight.number + defaultHeight.unix"
    :width="defaultWidth.number + defaultWidth.unix"
    :border="hasBorder"
    :style="{
      fontSize: defaultFontSize + 'px',
      lineHeight: defaultLineHeight + 'px',
    }"
  />
</template>

<style lang="scss" scoped>
.editor-tools-box {
  margin-bottom: 8px;

  .small-width {
    width: 100px;
  }

  .large-width {
    width: 140px;
  }
}
</style>
