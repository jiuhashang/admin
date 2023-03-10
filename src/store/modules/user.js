import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  const { avatar = '', name = '', role = {}, menuList = [] } = {}
  return {
    token: getToken() || '',
    name,
    avatar,
    menuList,
    userInfo: {
      avatar, name, role, menuList
    }
  }
}

const state = getDefaultState()
const defaultAvatar = 'https://zn-image.obs.cn-east-3.myhuaweicloud.com:443/adminImage%2F1630380211339.png'

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar || defaultAvatar
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userName, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: userName.trim(), password: password }).then(response => {
        // console.log(response)
        const { data: { userName: name, userName, nickName, image: avatar, seAdminRoleInfo: role, seAdminMenuInfoList: menuList, token }} = response
        commit('SET_TOKEN', token)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        setToken(response.data.token)
        const userInfo = {
          name, avatar, role: role || {}, menuList, userName, nickName
        }
        commit('SET_USERINFO', userInfo)
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { userName: name, userName, nickName, image: avatar, seAdminRoleInfo: role, seAdminMenuInfoList: menuList } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        const userInfo = {
          name, avatar, role: role || {}, menuList, userName, nickName
        }
        commit('SET_USERINFO', userInfo)
        resetRouter()
        resolve(userInfo)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

