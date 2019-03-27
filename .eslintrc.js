module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  plugins: ['html'],
  settings: {
    'html/html-extensions': ['.html', '.we'] // consider .html and .we files as HTML
  },
  globals: {
    AMap: true,
    initAMapUI:true,
    AMapUI:true
  },
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/no-v-html': false,
    'vue/name-property-casing': [0,'kebab-case'],
    'vue/component-name-in-template-casing': [0,'kebab-case'],
    'vue/no-use-v-if-with-v-for': false,
    // 强制 getter 和 setter 在对象中成对出现
    'accessor-pairs': 2,
    // 强制箭头函数的箭头前后使用一致的空格
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 禁止或强制在代码块中开括号前和闭括号后有空格
    'block-spacing': [2, 'always'],
    // 强制在代码块中使用一致的大括号风格
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    // 强制使用骆驼拼写法命名约定
    camelcase: [
      0,
      {
        properties: 'always'
      }
    ],
    // 要求或禁止末尾逗号
    'comma-dangle': [2, 'never'],
    // 强制在逗号前后使用一致的空格
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    // 强制使用一致的逗号风格
    'comma-style': [2, 'last'],
    // 要求在构造函数中有 super() 的调用
    'constructor-super': 2,
    // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    curly: [2, 'multi-line'],
    // 强制在点号之前和之后一致的换行
    'dot-location': [2, 'property'],
    // 要求或禁止文件末尾存在空行
    'eol-last': 2,
    // 要求使用 === 和 !==
    eqeqeq: [2, 'allow-null'],
    // 强制 generator 函数中 * 号周围使用一致的空格
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 要求回调函数中有容错处理
    'handle-callback-err': [2, '^(err|error)$'],
    // 强制使用一致的缩进
    indent: ['error', 2],
    // 强制在 JSX 属性中一致地使用双引号或单引号
    'jsx-quotes': [2, 'prefer-single'],
    // 强制在对象字面量的属性中键和值之间使用一致的间距
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    // 强制在关键字前后使用一致的空格
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 要求构造函数首字母大写
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ],
    // 要求调用无参构造函数时有圆括号
    'new-parens': 2,
    // 禁用 Array 构造函数
    'no-array-constructor': 2,
    // 禁用 arguments.caller 或 arguments.callee
    'no-caller': 2,
    // 禁用 console
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止修改类声明的变量
    'no-class-assign': 2,
    // 禁止条件表达式中出现赋值操作符
    'no-cond-assign': 2,
    // no-const-assign
    'no-const-assign': 2,
    // 禁止在正则表达式中使用控制字符
    'no-control-regex': 2,
    // 禁止删除变量
    'no-delete-var': 2,
    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 2,
    // 禁止类成员中出现重复的名称
    'no-dupe-class-members': 2,
    // 禁止对象字面量中出现重复的 key
    'no-dupe-keys': 2,
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 2,
    // 禁止在正则表达式中使用空字符集
    'no-empty-character-class': 2,
    // 禁止使用空解构模式
    'no-empty-pattern': 2,
    // 禁止对 catch 子句的参数重新赋值
    'no-ex-assign': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [
      2,
      {
        max: 1
      }
    ],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 2,
    'no-undef-init': 1,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false
      }
    ],
    'no-unreachable': 2,
    'no-unsafe-finally': 1,
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [
      2,
      {
        initialized: 'never'
      }
    ],
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    'padded-blocks': [2, 'never'],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: [2, 'never'],
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'always'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ],
    'spaced-comment': [
      2,
      'always',
      {
        markers: [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ','
        ]
      }
    ],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    yoda: [2, 'never'],
    'prefer-const': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [
      2,
      'always',
      {
        objectsInObjects: false
      }
    ],
    // 强制数组方括号中使用一致的空格
    'array-bracket-spacing': [2, 'never']
  }
}
