module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        // 引入组件
        /* customName: (name) => {
          // name = name.slice(3);
          return `element-plus/lib/${name}`;
        }, */
        // styleLibraryName: 'theme-chalk'
        // 引入样式
        customStyleName: (name) => {
          console.log('name', name);
          // 如果你需要引入 [name].scss 文件，你需要用下面这行
          // return `element-plus/lib/components/${name}/style`
          // 引入 [name].css
          return `element-plus/lib/theme-chalk/${name}.css`;
        }
      }
    ]
  ]
};
