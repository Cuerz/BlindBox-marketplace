<template>
  <div>
    <Row class="container">
      <i-col span="8" offset="2" class="signup-img-box">
        <img src="static/img/signup-sale.png" alt="">
      </i-col>
      <i-col span="8" class="box">
        <div class="sign-up-title">
          <h1 style="font-size:50px;text-align:center">Sign Up</h1>
        </div>
        <div class="sign-up-box">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto">

            <!-- 用户名 -->
            <el-form-item label="用户名" prop="username">
              <el-input v-model.number="ruleForm.username"></el-input>
            </el-form-item>

            <!-- 手机 -->
            <el-form-item label="手机" prop="phone">
              <el-input v-model.number="ruleForm.phone"></el-input>
            </el-form-item>

            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>

            <!-- 确认密码 -->
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
              <div class="button">
                <el-button type="primary" @click="submitForm('ruleForm')">SUBMIT</el-button>
                <el-button @click="resetForm('ruleForm')">RESET</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>

import { register } from '@/api/user';

export default {
  data () {
    var validateUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        if (this.ruleForm.phone.toString().length !== 11) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        phone: '',
        password: '',
        checkPass: ''
      },
      rules: {
        username: [
          { validator: validateUser, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register(this.ruleForm).then(response => {
            if (response.code === 20000) {
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.$router.push({path: '/Login'});
            } else {
              this.$message({
                message: response.message,
                type: 'error'
              });
            }
          });
        } else {
          console.log('error submit!!');
          this.$message({
            message: '请填写正确的信息',
            type: 'error'
          });
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.container {
  margin: 150px auto 0;
  height: 500px;
  overflow: hidden;
}
.signup-img-box {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.signup-img-box>img {
  height: 80%;
}
.sign-up-title {
  width: 430px;
  margin: 15px auto;
  height: 80px;
}

.sign-up-box {
  margin: 30px auto;
  width: 70%;
  align-items: center;
}

.button{
  display: flex;
  justify-content: space-around;
}
</style>
