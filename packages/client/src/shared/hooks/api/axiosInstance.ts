import axios from 'axios'

const API_URL = 'https://ya-praktikum.tech/api/v2/'

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

export default axiosInstance
