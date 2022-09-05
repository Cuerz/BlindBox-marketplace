import { getToken, removeToken } from '@/utils/auth';

// 用户登录
export const signIn = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    commit('SET_USER_LOGIN_INFO', data);
    resolve(true);
  });
};

// 退出登陆
export const signOut = ({ commit }) => {
  removeToken('user');
  commit('SET_USER_LOGIN_INFO', '');
};

// 判断是否登陆
export const isLogin = ({ commit }) => {
  const user = getToken('user');
  if (user) {
    commit('SET_USER_LOGIN_INFO', user);
  }
};
