module.exports = {
    extends: [
        'stylelint-config-standard', // 配置stylelint拓展插件
        'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
        'stylelint-config-standard-scss', // 配置stylelint scss插件
        'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
        'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
        'stylelint-config-prettier', // 配置stylelint和prettier兼容
    ],
    overrides: [{
            files: ['**/*.(scss|css|vue|html)'],
            customSyntax: 'postcss-scss',
        },
        {
            files: ['**/*.(html|vue)'],
            customSyntax: 'postcss-html',
        },
    ],
    ignoreFiles: [
        '**/*.js',
        '**/*.jsx',
        '**/*.tsx',
        '**/*.ts',
        '**/*.json',
        '**/*.md',
        '**/*.yaml',
    ],
    /**
     * null  => 关闭该规则
     * always => 必须
     */
    rules: {
        'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
        'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
        'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
        'no-empty-source': null, // 关闭禁止空源码
        'selector-class-pattern': null, // 关闭强制选择器类名的格式
        'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
        'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
        'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
        'block-no-empty': true, // 禁止空块
        "at-rule-no-unknown": null, // 不验证@未知的名字,为了兼容scss的函数
        "comment-no-empty": true, // 禁止空注释
        "shorthand-property-no-redundant-values": true, // 禁止简写属性的冗余值
        "color-no-invalid-hex": true, // 禁止无效的hex值
        "declaration-block-no-duplicate-custom-properties": true, // 不允许在声明块中重复自定义属性
        "declaration-block-no-duplicate-properties": true, // 禁止声明块中的重复属性
        "length-zero-no-unit": true, // 不允许使用零长度的单位（可自动修复）
        'selector-pseudo-class-no-unknown': [
            // 不允许未知的选择器
            true, {
                ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
            }
        ],
        "selector-type-no-unknown": [
            //兼容自定义标签名
            true, {
                "ignoreTypes": []
            }
        ],
        "selector-pseudo-element-no-unknown": [
            // 忽略伪类选择器::v-deep
            true, {
                "ignorePseudoElements": ["v-deep"]
            }
        ],
        'scss/at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind']
            }
        ],
    },
    'order/properties-order': [
        'position',
        'top',
        'right',
        'bottom',
        'left',
        'z-index',
        'display',
        'justify-content',
        'align-items',
        'float',
        'clear',
        'overflow',
        'overflow-x',
        'overflow-y',
        'margin',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'padding',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left',
        'width',
        'min-width',
        'max-width',
        'height',
        'min-height',
        'max-height',
        'font-size',
        'font-family',
        'font-weight',
        'border',
        'border-style',
        'border-width',
        'border-color',
        'border-top',
        'border-top-style',
        'border-top-width',
        'border-top-color',
        'border-right',
        'border-right-style',
        'border-right-width',
        'border-right-color',
        'border-bottom',
        'border-bottom-style',
        'border-bottom-width',
        'border-bottom-color',
        'border-left',
        'border-left-style',
        'border-left-width',
        'border-left-color',
        'border-radius',
        'text-align',
        'text-justify',
        'text-indent',
        'text-overflow',
        'text-decoration',
        'white-space',
        'color',
        'background',
        'background-position',
        'background-repeat',
        'background-size',
        'background-color',
        'background-clip',
        'opacity',
        'filter',
        'list-style',
        'outline',
        'visibility',
        'box-shadow',
        'text-shadow',
        'resize',
        'transition'
    ],
}