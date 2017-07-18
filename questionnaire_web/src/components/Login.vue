<template>
  <div>
    <el-row type="flex" justify="end" align="middle" style="margin:20px">
      <el-col :span="1">
        <el-tooltip :content="animation ? '点击关闭动画' : '点击打开动画'" placement="top">
          <el-switch
            v-model="animation"
            on-color="#13ce66"
            off-color="#ff4949"
            on-text="打开"
            off-text="关闭"
            @change="switchAnimation">
          </el-switch>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle" style="margin: 200px">
      <el-col :span="4">
        <el-row type="flex" justify="left" align="middle" class="markSetRow loginInput" >
          <el-col>
            <el-input v-model="userName" placeholder="请输入用户名"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="left" align="middle" class="markSetRow loginInput" >
          <el-col>
            <el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center" align="middle" class="markSetRow" >
          <el-col :span="18">
            <el-button type="primary" style="width:150px" @click="login">登录</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  // import Background from '../components/Background';
  import bus from '../utils/bus';
  import axios from 'axios';

  export default {
    name: 'Login',
    data(){
      return {
        animation: false,
        userName: '',
        password: ''
      }
    },
    methods: {
      switchAnimation() {
        bus.$emit('setLoadingStatus', this.animation);
      },
      login() {
        if(this.validate()){
          axios.post(`${bus.host}/user/login`, {userName: this.userName, password: this.password})
            .then(({data}) => {
              console.log(data, 'datadatadatadata');
              if(data){
                this.$notify({title: '成功', message: '登录成功', type: 'success'});
                sessionStorage.setItem("userName", this.userName);
                //document.cookie = `userName=${this.userName}`;
                this.$router.push({path: '/questionList'});
              }else {
                this.$notify.error({title: '错误', message: '登录失败'});
              }
            })
            .catch(function (error) {

            });
        }
      },
      validate() {
        console.log(this.userName, this.password)
        if(!this.userName) {
          return this.warning('用户名不能为空');
        }else if(!this.password) {
          return this.warning('密码不能为空');
        }else {
          return true
        }
      },
      warning(message) {
        this.$message({message: message, type: 'warning'});
        return false
      }

    },
    components: {
      // Background
    },
    mounted() {
      // this.init();
    }
  }
</script>

<style>
  .loginInput {
    width: 200px;
  }
</style>
