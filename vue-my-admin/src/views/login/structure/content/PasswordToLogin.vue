<template>
  <el-form :model="loginForm" ref="loginForm" :rules="loginRules" class="needPs">
    <el-form-item label="" prop="username">
      <el-input v-model.trim="loginForm.username" placeholder="用户名" prefix-icon="el-icon-user-solid" clearable required>
      </el-input>
    </el-form-item>
    <el-form-item label="" prop="password">
      <el-input v-model.trim="loginForm.password" placeholder="密码" prefix-icon="el-icon-thumb" show-password clearable required>
      </el-input>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" size="default" style="width: 100%" :disabled="is_or__diable" @click="submitForm">
        {{ login_title }}
        <i class="el-icon-loading" v-show="loading"></i>
      </el-button>
    </el-form-item>
    <div class="from_down">
      <span>
        <router-link to="/register" class="from_down_a">用户注册?</router-link>
      </span>
      <span>
        <el-link type="primary">忘记密码？</el-link>
      </span>
    </div>
  </el-form>
</template>

<script>
import { Message } from "element-ui";
import { validateUserName, validatePassword } from "@/utils/regular-verify";

export default {
  data() {
    return {
      // redirect:undefined,
      loading: false, // 登录按钮---是否正在登录
      login_title: "登录", // 登录按钮title
      // 登录表单信息
      loginForm: { username: "", password: "" },
      // 校验规则
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUserName },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
    };
  },
  //   watch: {
  //   $route: {
  //     handler: function(route) {
  //       this.redirect = route.query && route.query.redirect
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    // 表单提交
    async submitForm() {
      
      // 校验表单是否有错误
      let validateResult;
      await this.$refs.loginForm.validateField(
        ["userName", "password"],
        (errorMessage) => {
          if (errorMessage) {
            validateResult = false;
            this.$alert("你当前用户名或密码有误哦，请检查后再提交", "提示", {
              confirmButtonText: "确定",
              callback: () => {},
            });
          }
        }
      );
      if (validateResult == false) {
        console.log("当前表单还有错误喔，不能向下执行");
        return;
      } else {
        // 表单没有错误的情况
        // 改变登录中的相关信息
        this.loading = true;
        this.login_title = "登录中";
        // 开始 commit --发送api请求--并设置相关信息
        this.$store
          .dispatch("user/login", this.loginForm)
          .then(async () => {
            await this.$router.push({ path: "/" });
            this.loading = false;
            this.login_title = "登录";
          })
          .catch(() => {
            console.log("发送请求失败哦");
            this.loading = false;
            this.login_title = "登录";
          });
      }
    },
  },

  computed: {
    //登录按钮是否禁用
    is_or__diable() {
      return this.loginForm.username == "" || this.loginForm.password == "";
    },
    isFromErrow() {
      this.$refs.loginForm.validateField(
        ["userName", "password"],
        (errorMessage) => {
          if (errorMessage) {
            this.$alert("你当前用户名或密码有误哦，请检查后再提交", "提示", {
              confirmButtonText: "确定",
              callback: () => {
                this.loading = false;
                this.login_title = "登录";
                return false;
              },
            });
          }
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.needPs {
  padding: 0 20px;
}
.from_down {
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  .from_down_a {
    color: #409eff;
    &:hover {
      color: #409eff;
    }
  }
}
.from_down > span {
  display: inline-block;
  font-size: 14px;
  color: #8590a6;
}
</style>
