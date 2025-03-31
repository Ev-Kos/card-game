import axios from 'axios'

const API_URL_YANDEX = 'https://ya-praktikum.tech/api/v2/'
const API_URL = __SERVER_URL__
  ? `${__SERVER_URL__}api/`
  : 'http://localhost:3001/api/'

export const axiosInstance = axios.create({
  baseURL: API_URL_YANDEX,
  withCredentials: true,
})

export const axiosInstanceServerNode = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})
