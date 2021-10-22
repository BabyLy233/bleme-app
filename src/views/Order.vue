<template>
  <div>
    <not-logged v-if="!token"/>
    <empty-order v-if="token && orderList.length===0"/>
    <van-nav-bar
        v-if="token"
        title="订单"
        fixed
        placeholder
    />

    <van-collapse v-model="activeName" accordion v-if="token && orderList.length!==0" >
      <van-collapse-item
          v-for="(list,index) in orderItem"
          :key="list[0].orderId"
          :title="'订单号：'+list[0].orderId"
          :name="list[0].orderId"
          :label="timeArr[index]"
      >
        <van-cell-group>
          <van-cell
              v-for="(goodArr,index) in list"
              :key="index"
              :title="goodArr.itemName"
              :value="'x '+goodArr.itemNum"
              :label="'¥ '+goodArr.itemPrice"
          />
          <van-cell title="总价" :value="'¥ '+priceArr[index]"/>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>

    <bottom-bar/>
  </div>
</template>

<script>
import NotLogged from '@/components/NotLogged'
import BottomBar from '@/components/BottomBar'
import EmptyOrder from '@/components/EmptyOrder'
import {getOrdersList} from '@/api/order'

export default {
  name: 'Order',
  components: {
    NotLogged,
    BottomBar,
    EmptyOrder
  },
  mounted() {
    if (this.token) {
      getOrdersList(this.token).then(res => {
        this.orderList = res.data.detail.orderListPOS
        this.orderItem = res.data.detail.orderItemPOS
        this.orderList.forEach(item => {
          this.priceArr.push(item.totalPrice)
          this.timeArr.push(item.createTime.replace(/[T]/,' '))
        })
      })
    }
  },
  data() {
    return {
      token: window.sessionStorage.getItem('token'),
      orderList: [],
      orderItem: [],
      activeName: '0',
      priceArr: [],
      timeArr:[]
    }
  },
}
</script>

<style scoped>

</style>
