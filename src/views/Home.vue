<template>
  <div>
    <van-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
    >

      <van-search v-model="searchKey" placeholder="请输入搜索关键词" shape="round"/>

      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <van-image :src="require('@/assets/home/banner1.jpg')" fit="fill"/>
        </van-swipe-item>
        <van-swipe-item>
          <van-image :src="require('@/assets/home/banner2.jpg')" fit="fill"/>
        </van-swipe-item>
        <van-swipe-item>
          <van-image :src="require('@/assets/home/banner3.jpg')" fit="fill"/>
        </van-swipe-item>
        <van-swipe-item>
          <van-image :src="require('@/assets/home/banner4.jpg')" fit="fill"/>
        </van-swipe-item>
      </van-swipe>

      <van-grid :column-num="5" :border="false" icon-size="33" clickable>
        <van-grid-item icon="photo-o" text="美食外卖">
          <template #icon>
            <svg class="big-icon" aria-hidden="true">
              <use xlink:href="#iconfont-meishi"></use>
            </svg>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="超市便利" badge="减运费">
          <template #icon>
            <svg class="big-icon" aria-hidden="true">
              <use xlink:href="#iconfont-chaoshi"></use>
            </svg>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="美食团购">
          <template #icon>
            <svg class="big-icon" aria-hidden="true">
              <use xlink:href="#iconfont-meishi1"></use>
            </svg>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="丽人医美" badge="潮流季">
          <template #icon>
            <svg class="big-icon" aria-hidden="true">
              <use xlink:href="#iconfont-lirenmeifa"></use>
            </svg>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="休闲玩乐">
          <template #icon>
            <svg class="big-icon" aria-hidden="true">
              <use xlink:href="#iconfont-xiuxian"></use>
            </svg>
          </template>
        </van-grid-item>
      </van-grid>

      <van-grid :column-num="5" :border="false" icon-size="24" clickable>
        <van-grid-item icon-prefix="iconfont" icon="hongbao" text="夜宵">
          <template #icon>
            <svg class="small-icon" aria-hidden="true">
              <use xlink:href="#iconfont-yexiao"></use>
            </svg>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="水果">
          <template #icon>
            <svg class="small-icon" aria-hidden="true">
              <use xlink:href="#iconfont-shuiguo"></use>
            </svg>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="甜品饮品">
          <template #icon>
            <svg class="small-icon" aria-hidden="true">
              <use xlink:href="#iconfont-naicha"></use>
            </svg>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="买菜">
          <template #icon>
            <svg class="small-icon" aria-hidden="true">
              <use xlink:href="#iconfont-shucai"></use>
            </svg>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="红包膨胀">
          <template #icon>
            <svg class="small-icon" aria-hidden="true">
              <use xlink:href="#iconfont-hongbao"></use>
            </svg>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="送药上门" badge="1分起">
          <template #icon>
            <svg class="small-icon" aria-hidden="true">
              <use xlink:href="#iconfont-yao"></use>
            </svg>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="跑腿代购" badge="Hot">
          <template #icon>
            <svg class="small-icon" aria-hidden="true">
              <use xlink:href="#iconfont-daigou"></use>
            </svg>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="0元领水果">
          <template #icon>
            <svg class="small-icon" aria-hidden="true">
              <use xlink:href="#iconfont-shuiguo"></use>
            </svg>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="赚现金">
          <template #icon>
            <svg class="small-icon" aria-hidden="true">
              <use xlink:href="#iconfont-xianjinhongbao"></use>
            </svg>
          </template>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="提款机">
          <template #icon>
            <svg class="small-icon" aria-hidden="true">
              <use xlink:href="#iconfont-tikuanshenqing"></use>
            </svg>
          </template>
        </van-grid-item>
      </van-grid>

      <van-notice-bar :scrollable="false" background="#ecf9ff" color="#1989fa">
        <van-swipe
            vertical
            class="notice-swipe"
            :autoplay="3000"
            :show-indicators="false"
        >
          <van-swipe-item>
            <van-tag type="warning">赚豆</van-tag>&emsp;今天下 1 单，领 800 吃货豆
          </van-swipe-item>
          <van-swipe-item>
            <van-tag type="danger">红包</van-tag>&emsp;先领红包再下单！
          </van-swipe-item>
          <van-swipe-item>
            <van-tag type="primary">膨胀</van-tag>&emsp;你吃了吗？
          </van-swipe-item>
        </van-swipe>
      </van-notice-bar>

      <van-tabs v-model="tabBarActive" swipeable>
        <van-tab title="附近推荐">
          <van-card
              v-for="item in recommendShops"
              :key="item.shopId"
              :title="item.shopName"
              @click="goToShop(item.shopId,item.shopName)"
          >
            <template #thumb>
              <van-image :src="item.shopIcon" fit="fill" lazy-load/>
            </template>
            <template #desc>
              <div>
                <span class="point">{{ item.shopPoint }}分</span> 月售{{ item.monthlySale }}
              </div>
            </template>
            <template #tags>
              <div style="margin-top: 13px">
                <van-tag type="warning" color="#FFECE1" text-color="#F1974F">{{ item.shopDesc }}</van-tag>
              </div>
            </template>
          </van-card>
        </van-tab>
        <van-tab title="发现好菜">还没做完</van-tab>
        <van-tab title="超市">还没做完</van-tab>
        <van-tab title="水果">还没做完</van-tab>
        <van-tab title="买菜">还没做完</van-tab>
        <van-tab title="到店吃">还没做完</van-tab>
        <van-tab title="玩乐">还没做完</van-tab>
      </van-tabs>
    </van-pull-refresh>
    <bottom-bar/>
  </div>
</template>

<script>
import BottomBar from '@/components/BottomBar'
import {getRecommendShops} from '@/api/home'
import {Toast} from 'vant'

export default {
  name: 'Home',
  components: {
    BottomBar
  },
  data() {
    return {
      searchKey: '',
      isLoading: false,
      tabBarActive: 0,
      recommendShops: []
    }
  },
  async mounted() {
    const {data} = await getRecommendShops()
    this.recommendShops = data.detail
  },
  methods: {
    goToShop(shopId, shopName) {
      scrollTo(0, 0)
      this.$router.push({
        path: '/shop',
        query: {
          shopId: shopId,
          shopName: shopName
        }
      }).catch(res => {
        Toast({
          message: '尚未登录\n登录后可进入店铺',
          position: 'bottom',
        })
      })
    },
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功')
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>

<style>
.van-info {
  min-width: 45px !important;
  right: 1.4em !important;
}

.big-icon {
  width: 3em;
  height: 3em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.small-icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
}

.van-card {
  background-color: #fff !important;
}

.point {
  color: orange;
  font-size: 18px;
}

.van-card__title {
  font-size: 13px;
  font-weight: 1000 !important;
}
</style>
