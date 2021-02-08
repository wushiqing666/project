<template>
    <el-date-picker :props='props' :value="inputValue" @input="onInput" :placeholder="'请选择'+label">
    </el-date-picker>
</template>
<script>
import formItemMixin from './mixin';
export default {
  name: 'InputItem',
  mixins: [formItemMixin],
};
</script>
