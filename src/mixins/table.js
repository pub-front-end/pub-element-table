import { merge } from 'lodash';
import '../style/index.scss';
import { delegate } from '../utils/v-dom';
import Render from '../utils/render';

const DefaultPaginationProps = {
  pageSizes: [10, 20, 50, 100],
  layout: 'total, ->, sizes, prev, pager, next, jumper'
};

export default {
  inheritAttrs: false, // 未被识别为props的属性，将不会出现在根元素上
  components: {
    Render
  },
  props: {
    layout: {
      type: String,
      default: 'tool, table, pagination'
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    actionColumn: {
      type: Object,
      default() {
        return {};
      }
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    paginationProps: {
      type: Object,
      default() {
        return {};
      }
    },
    columns: {
      type: Array,
      default: () => []
    }
  },
  render() {
    const layoutMap = {
      tool: this.renderTool(),
      table: this.renderTable(),
      pagination: this.renderPagination()
    };
    return <div class='ve-table'>{this.layouts.map(layout => layoutMap[layout])}</div>;
  },
  data() {
    return {
      innerCurrentPage: 1,
      innerPageSize: 10,
      actionColumnProp: 'e6e4c9de-7cf5-4f19-bb73-838e5182a372',
      innerPaginationProps: {}
    };
  },
  computed: {
    layouts() {
      return this.layout.split(',').map(item => item.trim());
    },
    innerActionColumn() {
      let { label, ...actionColumn } = this.actionColumn;

      return merge(
        {
          show: true,
          buttons: [],
          props: {
            label: label || '操作'
          }
        },
        actionColumn
      );
    },
    paginationShow() {
      return this.layouts.includes('pagination');
    },
    actionColumnShow() {
      return this.innerActionColumn.buttons.length > 0;
    },
    toolBarShow() {
      return this.layouts.includes('tool') && this.$slots.tool;
    }
  },
  methods: {
    renderTool() {
      return this.toolBarShow ? <div class={'ve-table__tool'}>{this.$slots['tool']}</div> : null;
    },
    renderTable() {
      return (
        <el-table
          ref='elTable'
          data={this.curTableData}
          {...{
            attrs: this.$attrs,
            on: this.$listeners,
            directives: this._server ? [{ name: 'loading', value: this.innerLoading }] : undefined
          }}
          class={'ve-table__table'}>
          {this.columns && this.renderTableColumns(this.columns)}
          {this.$slots.default}
          <template slot='empty'>{this.$slots.empty}</template>
          <template slot='append'>{this.$slots.append}</template>
          {this.actionColumnShow ? (
            <el-table-column
              prop={this.actionColumnProp}
              {...{
                attrs: this.innerActionColumn.props,
                scopedSlots: {
                  default: scope => {
                    return (
                      <div class='ve-table__action-list'>
                        {this.innerActionColumn.buttons.map(button => {
                          let buttonProps = Object.assign(
                            {
                              type: button.type || 'text',
                              icon: button.icon
                            },
                            button.props
                          );

                          let clickHandler = function() {
                            button.handler &&
                              button.handler(scope.row, scope.column, scope.$index, scope.store);
                          };

                          return (
                            <el-button onClick={clickHandler} {...{ attrs: buttonProps }}>
                              {button.label}
                            </el-button>
                          );
                        })}
                      </div>
                    );
                  }
                }
              }}
            />
          ) : null}
        </el-table>
      );
    },
    renderTableColumns(columns) {
      return columns.map(prop => {
        const props = {
          props: prop
        };
        props.scopedSlots = props.scopedSlots = {};
        if (prop.render) {
          props.scopedSlots.default = scope => <Render render={prop.render} {...scope}></Render>;
        }
        if (prop.header) {
          props.scopedSlots.header = scope => <Render render={prop.header} {...scope}></Render>;
        }
        return (
          <el-table-column {...props}>
            {prop.columns ? this.renderTableColumns(prop.columns) : null}
          </el-table-column>
        );
      });
    },
    renderPagination() {
      return this.paginationShow ? (
        <el-pagination
          ref='elPagination'
          class={'ve-table__pagination'}
          background
          {...{
            attrs: this.innerPaginationProps,
            on: {
              'size-change': this.handleSizeChange,
              'prev-click': this.handlePrevClick,
              'next-click': this.handleNextClick,
              'current-change': this.handleCurrentChange
            }
          }}
          current-page={this.innerCurrentPage}
          page-size={this.innerPageSize}
          total={this.innerTotal}
          class={'ve-table__pagination'}>
          {this.$slots.pagination}
        </el-pagination>
      ) : null;
    },
    handleSizeChange(size) {
      this.innerPageSize = size;
    },
    handlePrevClick(page) {
      this.$emit('prev-click', page);
    },
    handleNextClick(page) {
      this.$emit('next-click', page);
    },
    handleCurrentChange(page) {
      this.innerCurrentPage = page;
    }
  },
  mounted() {
    delegate.call(this, this.$refs.elTable, [
      'clearSelection',
      'toggleRowSelection',
      'toggleAllSelection',
      'toggleRowExpansion',
      'setCurrentRow',
      'clearSort',
      'clearFilter',
      'doLayout',
      'sort'
    ]);
  },
  watch: {
    // make innerCurrentPage and innerPageSize as data,
    // and watch currentPage to update innerCurrentPage, pageSize to update innerPageSize
    // at the same time watch innerCurrentPage and innerPageSize to emit sync emit.
    // the two watch cannot be replaced by computed getter and setter here,
    // because currentPage and pageSize can be not provided(undefined).
    pageSize: {
      immediate: true,
      handler(val) {
        this.innerPageSize = val;
      }
    },
    innerPageSize(newVal, oldVal) {
      this.$nextTick(() => {
        this.innerPageSize = newVal;
        if (oldVal !== newVal) {
          this.$emit('update:pageSize', newVal);
          this.$emit('size-change', this.innerPageSize);
          this.$emit('pagination-change', {
            pageSize: this.innerPageSize,
            currentPage: this.internalCurrentPage
          });
        }
      });
    },
    currentPage: {
      immediate: true,
      handler(val) {
        this.innerCurrentPage = val;
      }
    },
    innerCurrentPage(newVal, oldVal) {
      this.$nextTick(() => {
        this.internalCurrentPage = newVal;
        if (oldVal !== newVal) {
          this.$emit('update:currentPage', newVal);
          this.$emit('current-page-change', this.internalCurrentPage);
          this.$emit('pagination-change', {
            pageSize: this.innerPageSize,
            currentPage: this.internalCurrentPage
          });
        }
      });
    },
    paginationProps: {
      immediate: true,
      handler(val) {
        if (this.paginationShow) {
          this.innerPaginationProps = Object.assign({}, DefaultPaginationProps, val);

          if (this.innerPaginationProps.pageSizes.indexOf(this.innerPageSize) === -1) {
            console.warn(
              `[ve-table]: pageSize ${this.innerPageSize} is not included in pageSizes[${this.innerPaginationProps.pageSizes}], set pageSize to pageSizes[0]: ${this.innerPaginationProps.pageSizes[0]}`
            );
            this.innerPageSize = this.innerPaginationProps.pageSizes[0];
          }
        } else {
          this.innerPageSize = this.curTableData.length;
        }
      }
    }
  }
};
