<template>
    <el-input :props='props' :value="inputValue" @input="onInput" :placeholder="'请输入'+label"></el-input>
</template>
<script>
import formItemMixin from './mixin';

export default {
  name: 'InputItem',
  mixins: [formItemMixin],
};
</script>