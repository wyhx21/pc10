<template>
  <a-form layout="vertical" :model="currentData">
    <a-form-item label="系统编码">
      <a-input
        v-model:value="currentData.sysCode"
        placeholder="系统编码"
        disabled
      />
    </a-form-item>
    <a-form-item label="系统名称">
      <a-input v-model:value="currentData.sysName" placeholder="系统名称" />
    </a-form-item>
    <a-form-item label="备注信息">
      <a-input v-model:value="currentData.remark" placeholder="备注信息" />
    </a-form-item>
    <a-form-item label="是否有效">
      <a-switch v-model:checked="currentData.deleted" />
    </a-form-item>
  </a-form>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    components: {},
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
        currentData: {},
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
