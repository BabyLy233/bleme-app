import axios from '../util/axios'

export function login(params) {
  return axios.post(
    '/user/login',
    params
  )
}

export function register(params) {
  return axios.post(
    '/user/register',
    params
  )
}

export function getUser(params) {
  return axios.get(
    `/user/getUserInfo?id=${params}`,
  )
}

export function verifyPayPwd(userId, payPwd) {
  return axios.post(
    `/user/verifyPayPwd?userId=${userId}&payPwd=${payPwd}`
  )
}

export function editPwd(oldPwd, newPwd, userId) {
  return axios.put(
    `/user/editPwd?userId=${userId}&newPwd=${newPwd}&oldPwd=${oldPwd}`,
  )
}
