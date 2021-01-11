<template>
  <a-form layout="vertical" :model="currentData" class="app-edit-form_1">
    <a-form-item label="系统编码">
      <a-input v-model:value="currentData.sysCode" placeholder="系统编码" />
    </a-form-item>
    <a-form-item label="系统名称">
      <a-input v-model:value="currentData.sysName" placeholder="系统名称" />
    </a-form-item>
    <a-form-item label="是否有效">
      <app-switch v-model="currentData.deleted" />
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
  import AppSwitch from '@com/switch'
  export default {
    components: {
      AppSwitch,
    },
    computed: {
      ...mapGetters({
        editData: 'appSystemInfo/system/currentData',
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
        currentData: {
          id: 0,
          deleted: false,
          remark: '',
          sysCode: '',
          sysName: '',
        },
      }
    },
    methods: {
      ...mapMutations({
        setEditData: 'appSystemInfo/system/currentData',
      }),
      submit() {
        this.setEditData(this.currentData)
      },
    },
  }
</script>
