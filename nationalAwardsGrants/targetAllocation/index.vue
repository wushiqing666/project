<template>
  <div class="targetAllocation-container">
    <div class="targetAllocation-text">指标分配</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: '指标分配',
}
</script>

<style lang="less" scoped>
.targetAllocation {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
