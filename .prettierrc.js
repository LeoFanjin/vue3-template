module.exports = {
  eslintIntegration: true, // 不让prettier使用eslint的代码格式进行校验
  singleQuote: true, // 使用单引号代替双引号
  semi: true, // 句尾添加分号
  trailingComma: 'none',
  tabWidth: 2, // 缩进字节数
  endOfLine: 'crlf', // 结尾是\n\r
  arrowParens: 'always', // 箭头函数参数只有一个时是否要有小括号。always：总是带括号；avoid：省略括号
  bracketSameLine: false // 在jsx中把'>' 是否单独放一行
  // printWidth: 80
  // singleAttributePerLine: true // Enforce single attribute per line in HTML, Vue and JSX.
};
