<template>
  <a-form layout="horizontal" :model="currentData" class="app-edit-form_2">
    <a-form-item label="标题">
      <a-input v-model:value="currentData.title" placeholder="标题" />
    </a-form-item>
    <a-form-item label="链接">
      <a-input v-model:value="currentData.msgLink" placeholder="链接" />
    </a-form-item>
    <a-form-item label="消息类型">
      <a-select v-model:value="currentData.msgType" placeholder="消息类型">
        <a-select-option :value="1">轮播</a-select-option>
        <a-select-option :value="2">消息</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="排序">
      <a-input-number
        :precision="0"
        v-model:value="currentData.msgSort"
        placeholder="排序"
      />
    </a-form-item>
    <a-form-item label="生效时间">
      <a-range-picker
        v-model:value="dataRange"
        :placeholder="['生效开始时间', '生效结束时间']"
        @change="onDataChange"
      >
        <template #suffixIcon><SmileOutlined /></template>
      </a-range-picker>
    </a-form-item>
    <a-form-item label="是否有效">
      <app-switch v-model="currentData.deleted" />
    </a-form-item>
    <a-form-item label="内容">
      <a-textarea
        v-model:value="currentData.content"
        placeholder="内容"
        :maxlength="150"
        allow-clear
        :rows="7"
      />
    </a-form-item>
  </a-form>
</template>
<script>
  import { SmileOutlined } from '@ant-design/icons-vue'
  import AppSwitch from '@com/switch'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    components: {
      AppSwitch,
      SmileOutlined,
    },
    computed: {
      ...mapGetters({
        editData: 'appSystemMsg/mainMsg/currentData',
      }),
    },
    watch: {
      editData: {
        handler(val) {
          this.currentData = { ...val }
          this.dataRange = [val['beginTime'], val['endTime']]
        },
        immediate: true,
      },
    },
    data() {
      return {
        currentData: {},
        dataRange: [],
      }
    },
    methods: {
      ...mapMutations({
        setEditData: 'appSystemMsg/mainMsg/currentData',
      }),
      submit() {
        this.setEditData(this.currentData)
      },
      onDataChange(date, dateString) {
        this.currentData.beginTime = dateString[0]
        this.currentData.endTime = dateString[1]
      },
    },
  }
</script>
