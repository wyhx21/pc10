<template>
  <div>
    <a-row class="app-msg-head">
      <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <h3>系统信息</h3>
      </a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <a href="#">部署时间: {{ updateTime }}</a>
      </a-col>
    </a-row>
    <a-row class="app-msg-main" :gutter="[16, 16]">
      <a-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="8"
        :xl="6"
        v-for="item of msgList"
        :key="item['id']"
      >
        <app-msg-item :data="item" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import AppMsgItem from './components/msgItem'
  export default {
    components: {
      AppMsgItem,
    },
    computed: {
      ...mapGetters({
        msgList: 'appSystemInfo/index/dataList',
      }),
    },
    data() {
      return {
        updateTime: process.env.VUE_APP_UPDATE_TIME,
      }
    },
    beforeMount() {
      this.queryMsg()
    },
    methods: {
      ...mapActions({
        queryMsg: 'appSystemInfo/index/queryMsg',
      }),
    },
  }
</script>
<style lang="scss">
  @import '@style/variable.scss';
  .app-msg-head {
    margin-bottom: 1em;
    a {
      float: right;
    }
  }
  .app-msg-main {
    .app-msg-item {
      height: 100%;
      border: 2px solid $app-main-border-color;
      border-radius: 10px;
      padding: 5px;
    }

    h4 {
      text-align: center;
      color: $app-main-font-main;
      font-weight: bold;
    }

    p {
      text-indent: 2em;
    }
  }
</style>
