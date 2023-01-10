import { boot } from 'quasar/wrappers'
import $axios from 'axios'

// const toQueryString = obj => {
//   return Object.keys(obj)
//     .reduce((a, k) => {
//       a.push(
//         typeof obj[k] === 'object'
//           ? toQueryString(obj[k])
//           : `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`
//       )
//       return a
//     }, [])
//     .join('&')
// }

// const encodeUrlXhr = (url, data) => {
//   if (data && typeof data === 'object') {
//     url += (/\?/.test(url) ? '&' : '?') + toQueryString(data)
//   }
//   return url
// }

const $getGeoData = async ({ url, params }) => {
  try {
    const { data } = await $axios({ method: 'get', url, params })
    return data
    // const res = await $axios(url, {
    //   method: 'get',
    //   // baseUrl: url,
    //   // url,
    //   data,
    //   mode: 'no-cors',
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json'
    //   }
    // })
    // console.log(res)
    // return res
  } catch (err) {
    console.error(err)
  }
}

export default boot(({ app }) => {
  app.provide('$axios', $axios)
  app.provide('$getGeoData', $getGeoData)
  app.config.globalProperties.$axios = $axios
  app.config.globalProperties.$getGeoData = $getGeoData
})

export { $axios, $getGeoData }
