 <template>
  <div class="reg-content">
    <div class="reg-main">
      <div class="reg-desc">
        <span>欢迎注册</span>
        <br>
        <span>
          <small>更多功能等你发现</small></span>
        <p class="reg-desc-p">
          注册即送0元大礼包
        </p>
      </div>
      <el-form :model="reg_form" ref="reg_form" label-width="0px" :inline="false" size="normal" class="reg-from" :rules="reg_rueus">
        <el-form-item label="" prop="userName">
          <el-input v-model="reg_form.userName" placeholder="用户名（字母开头，6~16位数字字母）" class="reg_input" clearable></el-input>
        </el-form-item>
        <el-form-item label="" prop="userPhoneNumber">
          <el-input v-model.trim.number="reg_form.userPhoneNumber" placeholder="请输入手机号码" class="reg_input" clearable></el-input>
        </el-form-item>
        <el-form-item label="" prop="userCode">
          <el-input v-model.trim="reg_form.userCode" placeholder="请输入手机短信验证码" clearable required>
            <el-button slot="append" icon="el-icon-search" style="width: 70px; padding: 0">获取</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="userPassword">
          <el-input v-model.trim="reg_form.userPassword" placeholder="请输入密码（6~16位数字字母）" class="reg_input" show-password clearable></el-input>
        </el-form-item>
        <el-form-item label="" prop="reg_checked">
          <el-checkbox v-model.trim="reg_checked">
          </el-checkbox>
          <span style="margin-left:5px;color:#a3a3a3">
            我已阅读并接受
            <el-link type="primary" href="https://homewh.chaoxing.com/agree/userAgreement?appId=900001" :underline="false">《网络服务协议》</el-link>
            <el-link type="primary" href="https://www.yidianzixun.com/landing_privacy" :underline="false">《用户隐私协议》</el-link>
          </span>
        </el-form-item>
        <el-form-item label="">
          <el-button :type="buttonType" style="width:100%" :disabled="!reg_checked" @click=register>登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 登录接口
import { fetchRegister } from "@/api/user";
import {sleep} from '@/utils/sheep'
import { Message } from "element-ui";
import {
  validateUserName,
  validatePhone,
  validateAuthCode,
  validatePassword,
} from "@/utils/regular-verify";
export default {
  components: {},
  data() {
    return {
       reg_checked: false,
        buttonType: "info",
      reg_form: {
        userName: "",
        userPhoneNumber: "",
        userCode: "",
        userPassword: ""
      },
      reg_rueus: {
        userName: [
          {
            required: true,
            trigger: "blur",
            validator: validateUserName,
          },
        ],
        userPhoneNumber: [
          {
            required: true,
            trigger: "blur",
            validator: validatePhone,
          },
        ],
        userCode: [
          {
            required: true,
            trigger: "blur",
            validator: validateAuthCode,
          },
        ],
        userPassword: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
          },
        ],
      },
    };
  },
  watch: {
    // 监视是否勾选用户协议
    reg_checked(newvalue) {
        if (newvalue == true) {
          console.log("xxx");
          this.buttonType = "primary";
        } else {
          this.buttonType = "info";
        } 
    },
  },
  methods: {
    async register(){
      //校验结果
      let validateResult;
      await this.$refs.reg_form.validateField(
        ["userName", "userPhoneNumber","userCode","userPassword"],
        (errorMessage) => {
          if (errorMessage) {
            validateResult = false;
            this.$alert("你当前信息有误哦，请检查后再提交", "提示", {
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
      let result=  await fetchRegister(this.reg_form);
      if(result.code=20000){
        Message.success('3s后自动跳转登录页面哦')
        sleep(3000).then(()=>{
          this.$router.push('/login')
        })
      }
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.reg-content {
  width: 1000px;
  min-height: 550px;
  margin: 0 auto;
  margin-top: 100px;
  padding-bottom: 70px;
  background-color: #fff;
  .reg-main {
    width: 420px;
    margin: 0 auto;
    .reg-desc {
      padding-top: 50px;
      margin-bottom: 30px;
      .reg-desc-p {
        color: #fff;
        padding-left: 70px;
        margin-top: 10px;
        line-height: 32px;
        border-radius: 4px;
        font-size: 16px;
        background: url("https://juheimgs.oss-cn-beijing.aliyuncs.com/activity/202106/reg-gift.png")
          left 42px center no-repeat #ed510a;
      }
    }
    .reg_from {
      .reg_input {
        margin-bottom: 24px;
      }
    }
  }
}
</style>