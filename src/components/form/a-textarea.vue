<template>
    <el-input type="textarea" :rows="2" v-model="value" :placeholder="'请输入'+label"/>
</template>
<script>
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
    }
}
</script>