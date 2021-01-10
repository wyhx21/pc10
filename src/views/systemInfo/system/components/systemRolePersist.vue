<template>
  <a-form layout="vertical" :model="currentData" class="app-edit-form_1">
    <a-form-item label="角色编码">
      <a-input v-model:value="currentData.roleCode" placeholder="角色编码" />
    </a-form-item>
    <a-form-item label="角色名称">
      <a-input v-model:value="currentData.roleName" placeholder="角色名称" />
    </a-form-item>
    <a-form-item label="备注信息">
      <a-textarea
        v-model:value="currentData.remark"
        placeholder="备注信息"
        showCount
        :maxlength="50"
        allow-clear
        :rows="3"
      />
    </a-form-item>
  </a-form>
</template>
<script>
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {},
    computed: {
      ...mapGetters({
        roleInfo: 'appSystemInfo/system/roleInfo',
      }),
    },
    watch: {
      roleInfo: {
        handler(val) {
          this.currentData = { ...val }
        },
        immediate: true,
      },
    },
    data() {
      return {
        currentData: {
          roleCode: '',
          roleName: '',
          remark: '',
        },
      }
    },
    methods: {
      ...mapMutations({
        setRoleInfo: 'appSystemInfo/system/roleInfo',
      }),
      submit() {
        this.setRoleInfo(this.currentData)
      },
    },
  }
</script>
