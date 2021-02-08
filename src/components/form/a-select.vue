<template>
    <el-select :props='props' :value="inputValue" @input="onInput" :placeholder="'请选择'+label">
        <el-option v-for="(item,index) in items" :key="index" :value="item.value" :label="item.label" />
    </el-select>
</template>
<script>
import formItemMixin from './mixin';
export default {
  name: 'InputItem',
  mixins: [formItemMixin],
};
</script>
