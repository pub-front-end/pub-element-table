const Fs = require('fs');
const escapeHtml = require('./util/util').escapeHtml;

module.exports = {
  title: 'vue-element-table',
  base: '/vue-element-table/',
  description: 'A simple, customizable and pageable table, based on vue2 and element-ui.',
  host: 'localhost',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'vue-element-table',
      description: '基于Element-ui 2.x的一个易用的、可自定义的、带分页功能的Table组件.'
    },
    '/en/': {
      lang: 'en-US'
    }
  },
  themeConfig: {
    repo: 'liaoct/vue-element-table',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    editLinks: true,
    locales: {
      '/': {
        // 多语言下拉菜单的标题
        selectText: '选择语言',
        // 该语言在下拉菜单中的标签
        label: '简体中文',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        // Service Worker 的配置
        serviceWorker: {
          updatePopup: {
            message: '发现新内容可用.',
            buttonText: '刷新'
          }
        },
        // 默认为 "Edit this page"
        editLinkText: '帮助我们改善此页面！',
        // 当前 locale 的 algolia docsearch 选项
        algolia: {},
        sidebar: [
          {
            title: '指南',
            children: [
              ['/zh/introduce', '介绍'],
              ['/zh/quick-start', '快速上手'],
              ['/zh/layout', '组件布局']
            ]
          },
          {
            title: '教程',
            children: [
              ['/zh/tutorial', '基础用法'],
              ['/zh/action-column', '动作列'],
              ['/zh/tool', '工具栏']
            ]
          }
        ]
      },
      '/en/': {
        selectText: 'Languages',
        label: 'English',
        editLinkText: 'Edit this page on GitHub',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh'
          }
        }
      }
    }
  },
  scss: {
    implementation: require('sass')
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@example': 'docs/.vuepress/components',
        '@assets': 'docs/.vuepress/assets'
      }
    }
  },
  extendMarkdown(md) {
    const name = 'code';
    let file = '';
    md.use(require('markdown-it-container'), name, {
      render: function(tokens, idx) {
        const token = tokens[idx];
        if (token.nesting === 1) {
          const info = token.info
            .trim()
            .slice(name.length)
            .trim();
          try {
            file = escapeHtml(Fs.readFileSync(info, 'utf8'));
          } catch (e) {
            console.warn(e);
            file = '';
          }
          return `<div class="markdown-it-container__title">`;
        } else {
          const close = `</div><div class="markdown-it-container__content">${file}</div>`;
          file = '';
          return close;
        }
      }
    });
  }
};
