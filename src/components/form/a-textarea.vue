<template>
    <el-input :props='props' @input="onInput" type="textarea" :rows="2" :value="inputValue" :placeholder="'请输入'+label"/>
</template>
<script>
import formItemMixin from './mixin';
export default {
    props:{
        value:{
            type:[String,Number],
            default:''
        },
        label:{
            type:[String],
            default:''
        }
    },
    mixins: [formItemMixin],
}
</script>