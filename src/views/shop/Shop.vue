<template>
  <div style="height: 100%">
    <div class="wrapper">
      <van-nav-bar
          :title="shopName"
          left-arrow
          @click-left="onClickLeft"
          fixed
          placeholder
      >
        <template #right>
          <van-popover
              v-model="showPopover"
              trigger="click"
              :actions="actions"
              @select="onSelect"
              placement="bottom-end"
              theme="dark"
          >
            <template #reference>
              <van-icon name="ellipsis" size="24px"/>
            </template>
          </van-popover>
        </template>
      </van-nav-bar>

      <van-tabs v-model="active" color="#02B6FD" sticky @change="tabsChange">
        <van-tab class="orderFood" title="点餐">
          <van-row gutter="35" style="height: 100%;">
            <van-col span="4" style="height: 100%;">
              <van-sidebar v-model="activeKey">
                <van-sidebar-item v-for="item in inShopCate" :key="item.categoryId" :title="item.categoryName"
                                  @click="clickTabItem(item.categoryId)">
                </van-sidebar-item>
              </van-sidebar>
            </van-col>
            <van-col span="20">
              <div v-if="inCateGoods.length === 0">&emsp;暂无数据</div>
              <van-card
                  v-else
                  :price="good.presentPrice"
                  :origin-price="good.originalPrice"
                  :desc="good.goodDesc"
                  :title="good.goodName"
                  :thumb="good.goodImg"
                  v-for="good in inCateGoods"
                  :key="good.goodId"
              >
                <template #price>
                  <div class="price">¥ {{ good.presentPrice }}</div>
                </template>
                <template #tags>
                  <div>月售 {{ good.monthlySale }}</div>
                </template>
                <template #num>
                  <van-button icon="plus" type="info" size="mini" round @click="addToCart(good)"/>
                </template>
              </van-card>
            </van-col>
          </van-row>

        </van-tab>
        <van-tab title="评价">

        </van-tab>
        <van-tab title="商家">

        </van-tab>
      </van-tabs>

      <van-submit-bar :price="totalPrice*100" button-text="提交订单" @submit="onSubmit">
        <template>
          <van-badge :content="totalNum">
            <van-icon name="bag-o" size="46px" color="#6495ED"/>
          </van-badge>
        </template>
      </van-submit-bar>

    </div>
  </div>
</template>

<script>
import {getGoodsInCate, getIsCate} from '@/api/shop'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'Shop',
  async mounted() {
    const {data: cateData} = await getIsCate(this.shopId)
    this.inShopCate = cateData.detail
    this.cateId = this.inShopCate[0].categoryId
    await this.getGoodsInCate()
  },
  computed: {
    ...mapGetters(['totalNum', 'totalPrice'])
  },
  data() {
    return {
      activeKey: 0,
      active: 0,
      showPopover: false,
      actions: [{text: '购物车'}, {text: '分享商家'}, {text: '举报'}],
      shopId: this.$route.query.shopId,
      shopName: this.$route.query.shopName,
      cateId: 1,
      inShopCate: [],
      inCateGoods: [],
    }
  },
  methods: {
    ...mapActions(['addToCart']),
    async getGoodsInCate() {
      const {data: goodsData} = await getGoodsInCate(this.shopId, this.cateId)
      this.inCateGoods = goodsData.detail
    },
    onClickLeft() {
      this.$router.back()
    },
    onSelect(_, index) {
      if (index === 0) {
        this.$router.push('/cart')
      }
    },
    onSubmit() {

    },
    clickTabItem(categoryId) {
      this.cateId = categoryId
      this.getGoodsInCate()
      scrollTo(0, 0)
    },
    tabsChange() {
      scrollTo(0, 0)
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
}

.wrapper {
  height: 100% !important;
}

.van-sidebar {
  height: 95%;
  background-color: #f7f8fa !important;
}

.van-sidebar-item--select::before {
  background-color: #fff !important;
}

.orderFood {
  height: 100% !important;
}

.van-tabs__content {
  height: 100% !important;
}

.van-tab__pane {
  height: 100% !important;
}

.van-tabs {
  height: 100% !important;
}

.price {
  font-size: 18px;
}
</style>
