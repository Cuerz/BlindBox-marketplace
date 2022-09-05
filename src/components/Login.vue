<template>
<!-- 登录页面 -->
  <div>
    <Row class="container">
      <i-col span="9" class="login-box">
        <div class="login-container">
          <div class="login-header">
            <h1>Sign in</h1>
          </div>
          <div class="form-box">
            <el-form ref="form" :model="form">

              <!-- username -->
              Username<el-input v-model="form.username" placeholder="username" />

              <!-- password -->
              Password<el-input v-model="form.password" placeholder="password" show-password />
              <button @click="handleSubmit" class="submit-button">SUBMIT</button>
            </el-form>
          </div>
        </div>
      </i-col>
      <i-col span="10" offset="2" class="login-img-box">
        <img src="../../static/img/login.png" alt="">
      </i-col>
    </Row>
  </div>
</template>

<script>
import { login } from '@/api/user';
import { setToken } from '@/utils/auth';
import store from '@/vuex/store';
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapMutations(['SET_USER_LOGIN_INFO']),
    ...mapActions(['signIn']),
    handleSubmit () {
      if (this.form.username === '' || this.form.password === '') {
        this.$message({
          message: '请填写完整',
          type: 'error'
        });
      } else {
        login(this.form).then(response => {
          if (response.code === 20000) {
            this.$message({
              message: response.message,
              type: 'success'
            });
            this.signIn(this.form.username);
            setToken('user', this.form.username);
            this.$router.push({path: '/'});
          } else {
            this.$message({
              message: response.message,
              type: 'error'
            });
          }
        });
      }
    }
  },
  store
};
</script>

<style scoped>
.container {
  margin-top: 30px;
  height: 485px;
  background-color: #fff;
}
.login-img-box {
  margin-top: 9vh;
  height: 485px;
  overflow: hidden;
  align-items: center;
}
.login-img-box>img {
  width: 50%;
}
.login-box {
  margin: 9vh 4vw 0 3vw;
  height: 485px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container {
  width: 80%;
  height: 280px;
}
.login-header {
  height: 50px;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
}
.form-box {
  width: 60%;
  margin: 5px auto;
}

.submit-button{
  margin-top: 25px;
  user-select: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: inherit;
  font-weight: 600;
  text-align: center;
  border-radius: 4px;
  border: none;
  background-color: rgb(252, 213, 53);
  width: 100%;
  height: 48px;
}

</style>
