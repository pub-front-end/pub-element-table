module.exports = (options, ctx) => {
  console.log('这里执行管理');
  return {
    name: 'vuepress-plugin-import-code',
    extendMarkdown: md => {
      md.use(require('markdown-it-container'), 'code', {
        render(tokens, idx) {
          console.log(tokens, idx);
          if (tokens[idx] === 1) {
            return `<span>`;
          } else {
            return `</span>`;
          }
        }
      });
    }
  };
};
