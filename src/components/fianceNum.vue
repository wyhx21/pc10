<template>
  <div
    v-if="modelValue.length < 1"
    class="app-fiance-num app-data-placeholder"
    :class="$attrs.class"
  >
    {{ placeholder }}
  </div>
  <div class="app-fiance-num" :class="$attrs.class" :style="style" v-else>
    <span class="app-fiance_currency">{{ currency }}</span>
    <span class="app_fiance_integer">{{ numInteger }}</span>
    <span>.</span>
    <span class="app_fiance_decimal">{{ numDecimal }}</span>
  </div>
</template>
<script>
  export default {
    props: {
      currency: {
        default: '¥',
      },
      modelValue: {
        default: '',
      },
      placeholder: {
        default: '请输入金额',
      },
      color: {
        default: 'rgba(0,0,0,0.65)',
      },
      fontWeight: {
        default: 600,
      },
    },
    data() {
      return {
        style: {
          color: this.color,
          fontWeight: this.fontWeight,
        },
      }
    },
    computed: {
      numInteger() {
        return `${this.modelValue}.00`.split(/\./g)[0]
      },
      numDecimal() {
        const dec = `${this.modelValue}.00`.split(/\./g)[1].padEnd(2, '00')
        if (dec.length > 4) {
          return dec.substring(0, 4)
        }
        return dec
      },
    },
    methods: {},
  }
</script>
<style lang="scss">
  @import '@style/fianceNum.scss';
</style>
