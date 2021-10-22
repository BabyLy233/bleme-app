<template>
  <div>
    <not-logged v-if="!token"/>

    <div v-else>
      <van-nav-bar title="个人中心"/>

      <van-cell-group border>
        <van-cell title="单元格">
          <template #title>
            <van-image class="userPic" :src="require('@/assets/ecy.png')" round width="80px" height="80px"/>
          </template>
          <template #label>
            <div class="username">&emsp;
              {{ userInfo.username }}
              <p class="userId">
                &emsp;&emsp;用户ID：{{ userInfo.id }}&emsp;
                <br>
                <span v-if="userInfo.role === 1" class="role">普通会员</span>
                <span v-else-if="userInfo.role === 2" class="role">高级会员</span>
                <span v-else-if="userInfo.role === 3" class="role">管理员</span>
              </p>
            </div>
          </template>
        </van-cell>
      </van-cell-group>

      <van-cell-group inset>
        <van-cell title="地址管理" is-link @click="goLink('/user/address')">
          <template #icon>
            <van-icon name="location" size="24" color="#00FA9A"/>&emsp;
          </template>
        </van-cell>
        <van-cell title="我的钱包" is-link>
          <template #icon>
            <van-icon name="gem" size="24" color="#00BFFF"/>&emsp;
          </template>
        </van-cell>
        <van-cell title="我的优惠" is-link>
          <template #icon>
            <van-icon name="coupon" size="24" color="#FF8C00"/>&emsp;
          </template>
        </van-cell>
        <van-cell title="我的收藏" is-link>
          <template #icon>
            <van-icon name="like" size="24" color="#FF6347"/>&emsp;
          </template>
        </van-cell>
        <van-cell title="我的足迹" is-link>
          <template #icon>
            <van-icon name="eye" size="24" color="#FFD700"/>&emsp;
          </template>
        </van-cell>
        <van-cell title="修改密码" is-link @click="goLink('/user/edit_password')">
          <template #icon>
            <van-icon name="setting" size="24" color="#BC8F8F"/>&emsp;
          </template>
        </van-cell>
      </van-cell-group>

      <van-button class="logoutBtn" type="danger" block @click="logout">注销</van-button>
    </div>

    <bottom-bar/>
  </div>
</template>

<script>
import BottomBar from '@/components/BottomBar'
import NotLogged from '@/components/NotLogged'
import {Dialog, Toast} from 'vant'
import {getUser} from '@/api/user'

export default {
  name: 'User',
  components: {
    BottomBar,
    NotLogged
  },
  data() {
    return {
      token: window.sessionStorage.getItem('token'),
      userInfo: {}
    }
  },
  async mounted() {
    if (!this.token) {
      return
    }
    const {data} = await getUser(this.token)
    this.userInfo = data.detail
  },
  methods: {
    goLink(url) {
      this.$router.push(url)
    },
    goLogin() {
      this.$router.push('/login')
    },
    goRegister() {
      this.$router.push('/register')
    },
    logout() {
      Dialog.confirm({
        title: '注销',
        message: '您确定要注销当前账户吗？',
      })
          .then(() => {
            // on confirm
            window.sessionStorage.removeItem('token')
            Toast.success('注销成功')
            this.$router.push('/home')
          })
          .catch(() => {
            // on cancel
          })
    }
  }
}
</script>

<style scoped>
.userPic {
  float: left;
}

.username {
  font-size: 24px;
  color: black;
  margin-top: 0.6em;
}

.logoutBtn {
  margin-top: 100px;
}

.userId {
  font-size: 15px;
}

.role {
  color: deeppink;
  font-size: 14px;
  margin-left: 30px;
}
</style>
