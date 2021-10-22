import axios from '../util/axios'

export function getRecommendShops(){
  return axios.get('/shop/recommend')
}
