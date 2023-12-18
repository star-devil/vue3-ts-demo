/*
 * @Author: wangqiaoling
 * @Date: 2023-12-07 09:53:38
 * @LastEditTime: 2023-12-18 10:28:03
 * @LastEditors: wangqiaoling
 * @Description: eslint检查规则配置
 */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential",
        "prettier",
        "plugin:prettier/recommended",
        './.eslintrc-auto-import.json'
    ],
    "overrides": [{
        "env": {
            "node": true
        },
        "files": [
            ".eslintrc.{js,cjs}"
        ],
        "parserOptions": {
            "sourceType": "script"
        }
    }],
    "parserOptions": {
        "ecmaVersion": "latest",
        "parser": "@typescript-eslint/parser",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    "rules": {
        "indent": ["error", 2, {
            SwitchCase: 1
        }],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        // eslint（https://eslint.bootcss.com/docs/rules/）
        'no-var': 'error', // 要求使用 let 或 const 而不是 var
        'no-multiple-empty-lines': ['warn', {
            max: 1
        }], // 不允许多个空行
        // vite打包时自动去除console和debugger,所以这里直接关掉检查
        "no-console": "off",
        "no-debugger": "off",
        // 允许catch空着
        "no-empty": ["error", {
            allowEmptyCatch: true
        }],
        'no-unexpected-multiline': 'error', // 禁止空余的多行
        'no-useless-escape': 'off', // 禁止不必要的转义字符

        // typeScript (https://typescript-eslint.io/rules)
        '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
        '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
        '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
        '@typescript-eslint/semi': 'off',
        "@typescript-eslint/ban-types": [
            "error",
            {
                "types": {
                    "Function": false // 专门取消禁止此类型
                },
                "extendDefaults": true
            }
        ],

        // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
        'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
        'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
        'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
        'vue/attribute-hyphenation': 'off' // 对模板中的自定义组件强制执行属性命名样式
    }
};