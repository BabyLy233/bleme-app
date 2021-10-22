import axios from '../util/axios'

export function addAddress(params, userId) {
  return axios.post(
    `/address/add?userId=${userId}`,
    params,
  )
}

export function getAddress(userId) {
  return axios.get(
    `/address/get?userId=${userId}`
  )
}

export function editAddress(params, addressId) {
  return axios.put(
    `/address/edit?addressId=${addressId}`,
    params
  )
}

export function delAddress(addressId) {
  return axios.delete(
    `/address/del?addressId=${addressId}`
  )
}
