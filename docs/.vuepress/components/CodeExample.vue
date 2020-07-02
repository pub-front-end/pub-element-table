<template>
  <div class="ve-code-example">
    <h3 v-if="title" class="ve-code-example__title">{{ title }}</h3>
    <p v-if="title" class="ve-code-example__description" v-html="code(description)"></p>
    <div class="ve-demo-block">
      <el-container class="ve-demo-block__example">
        <el-main style="min-height: 53px">
          <slot name="example"></slot>
        </el-main>
      </el-container>
      <div v-if="$slots.default" class="ve-demo-block__segment" ref="segment" :style="segmentStyle">
        <slot></slot>
      </div>
      <div class="ve-demo-block__control" @click="showCode=!showCode" v-if="$slots.default">
        <i :class="showCode ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
        {{ this.showCode ? collapseText : expandText }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CodeExample',
  props: {
    title: String,
    description: String,
    expandText: {
      type: String,
      default: '显示源码'
    },
    collapseText: {
      type: String,
      default: '隐藏源码'
    }
  },
  data() {
    return {
      showCode: false,
      element: null,
      segmentHeight: 0
    };
  },
  mounted() {
    this.doHeight();
  },
  updated() {
    this.doHeight();
  },
  methods: {
    doHeight() {
      this.$nextTick(() => {
        const segment = this.$refs.segment;
        if (!segment) return;
        const title = segment.getElementsByClassName('markdown-it-container__title')[0];
        const content = segment.getElementsByClassName('markdown-it-container__content')[0];
        const titleHeight = title && title.getBoundingClientRect().height;
        const contentHeight = content && content.getBoundingClientRect().height;
        this.segmentHeight = titleHeight + contentHeight;
      });
    },
    code(value) {
      if (!value) return '';
      value = value.toString();
      return value.replace(/`(.*?)`/g, (_, b) => {
        return `<code>${b}</code>`;
      });
    }
  },
  computed: {
    segmentStyle() {
      return this.showCode
        ? {
            height: `${this.segmentHeight + 14 * 2}px` // title padding 14*2
          }
        : {
            height: '0px'
          };
    }
  }
};
</script>
<style lang="scss">
@import '../styles/mixins';
@include b(code-example) {
  margin: 20px 0;
  @include e(title) {
    margin-bottom: 0;
  }
  @include e(description) {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
  }
}

@include b(demo-block) {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: 0.2s;
  margin-bottom: 1.4rem;
  @include e(segment) {
    box-sizing: border-box;
    border-top: 1px solid #eaeefb;
    background-color: #fafafa;
    overflow: hidden;
    transition: height 0.2s;
  }
  @include e(control) {
    border-top: 1px solid #eaeefb;
    border-bottom: none;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;
  }
  .markdown-it-container__title {
    margin: 14px;
    box-sizing: border-box;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    overflow: hidden;
    border: 1px solid #ebebeb;
    word-break: break-word;
    background-color: #fff;
    padding: 0 20px;
    min-height: 50px;
  }
  .markdown-it-container__content {
    margin: 0 1rem;
    padding: 0 1rem 14px;
    color: #000;
  }
}
</style>
