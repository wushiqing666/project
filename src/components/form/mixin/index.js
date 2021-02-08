export default {
  props: {
    value:{
      type: [String, Number],
      default: '',
    },
    label:{
      type: [String, Number],
      default: '',
    },
    props:{
      type: [String],
      default: '',
    },
    items:{
      type: [Array],
      default: ()=>([]),
    },
  },
  computed: {
    inputValue(){
      return this.value
    }
  },
  watch: {
    inputValue(value) {
      this.$emit('input',{props:this.props,value:value});
    },
  },
  methods: {
    onInput(value) {
      this.$emit('input', {props:this.props,value:value});
    },
  },
};
