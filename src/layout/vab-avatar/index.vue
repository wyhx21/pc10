<template>
  <div class="vab-avatar">
    <a-dropdown>
      <span class="ant-dropdown-link">
        <img class="vab-avatar_img" src="@/assets/head.gif" />
        {{ username }}
        <DownOutlined />
      </span>
      <template v-slot:overlay>
        <a-menu>
          <a-menu-item>
            <a-popconfirm
              title="确认退出登录？"
              ok-text="确认"
              cancel-text="取消"
              @confirm="logout"
            >
              退出登录
            </a-popconfirm>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
  import { recordRoute } from '@/config'
  import { DownOutlined } from '@ant-design/icons-vue'

  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'VabAvatar',
    components: { DownOutlined },
    computed: {
      ...mapGetters({
        username: 'appSystem/account/userName',
      }),
    },
    methods: {
      ...mapActions({
        userLogOut: 'appSystem/account/logOut',
      }),
      async logout() {
        this.userLogOut().then(() => {
          if (recordRoute) {
            const fullPath = this.$route.fullPath
            this.$router.push(`/login?redirect=${fullPath}`)
          } else {
            this.$router.push('/login')
          }
        })
      },
    },
  }
</script>
<style lang="less">
  .vab-avatar {
    .ant-dropdown-link {
      display: block;
      min-height: 64px;
      cursor: pointer;
    }

    .vab-avatar_img {
      width: 32px;
      height: 32px;
      border-radius: 32px;
    }
  }
</style>
