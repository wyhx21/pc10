<template>
  <a-form layout="vertical" :model="currentData" class="app-edit-form_1">
    <a-form-item label="角色编码">
      <a-input
        v-model:value="currentData.roleCode"
        placeholder="角色编码"
        disabled
      />
    </a-form-item>
    <a-form-item label="角色名称">
      <a-input v-model:value="currentData.roleName" placeholder="角色名称" />
    </a-form-item>
    <a-form-item label="角色类型">
      <a-input
        v-model:value="currentData.roleTypeValue"
        placeholder="角色类型"
        disabled
      />
    </a-form-item>
    <a-form-item label="是否有效">
      <app-switch
        v-model="currentData.deleted"
        :disabled="currentData.roleType != 2"
      />
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
  import { mapGetters, mapMutations } from 'vuex'
  import AppSwitch from '@com/switch'
  export default {
    components: {
      AppSwitch,
    },
    computed: {
      ...mapGetters({
        editData: 'appSystemInfo/role/currentData',
      }),
    },
    watch: {
      editData: {
        handler(val) {
          this.currentData = { ...val }
        },
        immediate: true,
      },
    },
    data() {
      return {
        currentData: {},
      }
    },
    methods: {
      ...mapMutations({
        setEditData: 'appSystemInfo/role/currentData',
      }),
      submit() {
        this.setEditData(this.currentData)
      },
    },
  }
</script>
