<template>
  <a-form layout="vertical" :model="currentData" class="app-edit-form_1">
    <a-form-item label="用户编码">
      <a-input v-model:value="currentData.userCode" placeholder="用户编码" />
    </a-form-item>
    <a-form-item label="用户名称">
      <a-input v-model:value="currentData.userName" placeholder="用户名称" />
    </a-form-item>
    <a-form-item label="设置密码">
      <a-input
        v-model:value="currentData.userPwd"
        placeholder="设置密码"
        type="password"
      />
    </a-form-item>
    <a-form-item label="性别">
      <a-radio-group name="radioGroup" v-model:value="currentData.sex">
        <a-radio :value="0">男</a-radio>
        <a-radio :value="1">女</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="是否有效">
      <app-switch v-model="currentData.deleted" />
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
        editData: 'appSystemInfo/user/currentData',
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
        setEditData: 'appSystemInfo/user/currentData',
      }),
      submit() {
        this.setEditData(this.currentData)
      },
    },
  }
</script>
