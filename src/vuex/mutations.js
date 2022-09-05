// 设置用户登录信息
export const SET_USER_LOGIN_INFO = (state, data) => {
  state.username = data;
};

// 设置加载状态
export const SET_LOAD_STATUS = (state, status) => {
  state.isLoading = status;
};
