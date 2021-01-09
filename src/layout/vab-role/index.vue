<template>
  <div class="vab-role-wrap">
    <a-cascader
      v-model:value="modelValue"
      :options="roleOptions"
      @change="onChange"
      :allowClear="false"
      placeholder="请选择角色"
    />
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        roleOptions: 'appSystem/userRoleAuth/roleOptions',
        value: 'appSystem/account/sysRoleValue',
      }),
    },
    data() {
      return {
        modelValue: ['', ''],
      }
    },
    mounted() {
      this.accountInit()
      this.modelValue = this.value
    },
    methods: {
      ...mapActions({
        accountInit: 'appSystem/userRoleAuth/accountInit',
        roleChange: 'appSystem/userRoleAuth/roleChange',
      }),
      onChange(val) {
        const roleId = val[1]
        this.roleChange({ roleId })
      },
    },
  }
</script>
<style lang="less">
  .vab-role-wrap {
    margin-left: 20px;
  }
</style>
