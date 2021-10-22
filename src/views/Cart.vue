<template>
  <div class="wrapper">
    <not-logged v-if="!token"/>
    <empty-cart v-if="!totalNum && token"/>
    <van-nav-bar
        v-if="!totalNum && token"
        title="购物车"
        left-arrow
        @click-left="leftClick"
        fixed
        placeholder
    />
    <van-nav-bar
        v-if="totalNum"
        title="购物车"
        left-arrow
        @click-left="leftClick"
        @click-right="rightClick"
        fixed
        placeholder
    >
      <template #right>
        <span style="color: red">清空购物车</span>
      </template>
    </van-nav-bar>
    <van-card
        v-for="good in cartList"
        :key="good.good.goodId"
        :num="good.num"
        :price="good.good.presentPrice"
        :desc="good.good.goodDesc"
        :title="good.good.goodName"
        :thumb="good.good.goodImg"
    >
      <template #footer>
        <!-- 全部删除 -->
        <van-button size="mini" type="danger" icon="cross" round @click="clearFromCart(good.good.goodId)"/>
        <!-- 数量减一 -->
        <van-button size="mini" type="info" icon="minus" round @click="delFromCart(good.good.goodId)"/>
      </template>
      <template #price>
        <div class="price">¥ {{ good.good.presentPrice }}</div>
      </template>
    </van-card>

    <van-submit-bar
        v-if="token"
        :price="totalPrice*100"
        button-text="提交订单"
        @submit="onSubmit"
        tip-icon="fire-o"
    >
      <template>
        <div>共 {{ totalNum }} 件商品</div>
      </template>
    </van-submit-bar>

    <bottom-bar/>

    <van-popup v-model="show" position="bottom" :style="{ height: '45%' }" round>
      <div class="pwdTip">请输入6位交易密码</div>
      <van-password-input
          :value="value"
      />
      <van-number-keyboard
          v-model="value"
          :show="true"
      />
    </van-popup>

  </div>
</template>

<script>
import NotLogged from '@/components/NotLogged'
import BottomBar from '@/components/BottomBar'
import EmptyCart from '@/components/EmptyCart'
import {mapActions, mapGetters} from 'vuex'
import {Dialog, Notify, Toast} from 'vant'
import {addOrder} from '@/api/order'
import {verifyPayPwd} from '@/api/user'

export default {
  name: 'Cart',
  components: {
    NotLogged,
    BottomBar,
    EmptyCart
  },
  data() {
    return {
      token: window.sessionStorage.getItem('token'),
      show: false,
      value: '',
      showKeyboard: false,
    }
  },
  computed: {
    ...mapGetters(['cartList', 'totalPrice', 'totalNum'])
  },
  methods: {
    ...mapActions(['delFromCart', 'clearFromCart', 'clearCart']),
    onSubmit() {
      if (this.totalNum !== 0) {
        this.show = true
      } else {
        Toast({
          message: '当前购物车没有商品\n无法提交订单',
          position: 'bottom',
        })
      }
    },
    leftClick() {
      this.$router.back()
    },
    rightClick() {
      Dialog.confirm({
        title: '清空购物车',
        message: '您确定要清空购物车吗？',
      })
          .then(() => {
            // on confirm
            this.clearCart()
            Notify({type: 'success', message: '清空购物车成功'})
          })
          .catch(() => {
            // on cancel

          })
    },
  },
  watch: {
    value(newVal) {
      if (newVal.length === 6) {
        verifyPayPwd(this.token, this.value).then(res => {
          if (res.data.detail) {
            this.value = ''
            addOrder(this.cartList, this.token)
            this.$store.commit('AFTER_ADD_ORDER')
            this.show = false
            Notify({type: 'success', message: '已成功下单！'})
          } else {
            this.value = ''
            Notify({type: 'danger', message: '交易密码验证失败！'})
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.van-icon-fire-o {
  font-size: 16px;
}

.van-submit-bar__tip-text {
  margin-left: 10px;
}

.wrapper {
  max-height: 84%;
}

.van-password-input__security {
  margin-top: 20px;
}

.pwdTip {
  font-size: 1.5rem;
  text-align: center;
  margin-top: 5px;
}
</style>
