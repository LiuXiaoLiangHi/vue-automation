<template>
  <div class="login">
    <div class="login_main">
      <!-- 二维码 -->
      <QuickMark />
      <!-- 登录的主体 -->
      <LoginMianContent />
      <!-- 登录信息的中下 -->
      <LoginFooter />
      <!-- 最下 -->
      <DownAPP />
    </div>
  </div>
</template>

<script>
import LoginMianContent from "./structure/main/Login-mian-content.vue";
import LoginFooter from "./structure/footer/Login-foot.vue";
import DownAPP from "./structure/footer/DownAPP.vue";
import QuickMark from "./components/QuickMark.vue";
export default {
  components: {
    LoginMianContent,
    LoginFooter,
    DownAPP,
    QuickMark,
  },
  methods: {
    open1() {
      const h = this.$createElement;
      this.$notify({
        title: "欢迎光临",
        message: h("i", { style: "color: teal" }, "这是你的系统"),
      });
    },
  },
  mounted() {
    this.open1();
  },
};
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-width: 950px;
  min-height: 100%;
  overflow: hidden;
  background: url("~@/assets/login/background.png") no-repeat;
  background-color: #b8e5f8;
  background-size: 100% 100%;
  
  .login_main {
    position: relative;
    background-color: #ffffff;
    border-radius: 3px;
    width: 380px;
    margin: 0 auto;
    overflow: hidden;
  }
}
</style>
