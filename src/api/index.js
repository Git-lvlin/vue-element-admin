import goodApi from './goods.js'
import userApi from './user.js'

export default {
    ...goodApi,
    ...userApi
}