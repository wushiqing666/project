<template>
  <div class="buttons-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Buttons',
  props: {
    page: {
      type: Number,
      default: 1,
      required: true
    },
    limit: {
      type: Number,
      default: 10,
      required: true
    },
    background: {
      type: Boolean,
      default: true
    },
    pageSizes: {
      type: Array,
      default: () => [10, 15, 20, 50]
    },
    total: {
      type: Number,
      default: 0,
      required: true
    },
    layout: {
      type: String,
      default: 'total, prev, pager, next, sizes, jumper'
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
    }
  }
}
</script>

<style lang="less">
.buttons-wrapper{
    width: 100%;
    height: 31px;
  margin-top: 15px;
  margin-bottom: 15px;
  .buttons-item{
     margin-right: 20px;
  }
}
</style>
