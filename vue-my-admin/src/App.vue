<template>
  <div id="app">
    <router-view />
     <UndevelopedFeatures :isShowUnder.sync="isShowUnder" :closeNumber="closeNumber" @changeShow="changeShow"/>
  </div>
</template>

<script>
import { sleep } from "@/utils/sheep.js";
export default {
    name: 'App',
  data() {
    return {
      isShowUnder:false,// 弹窗是否显示
      closeNumber: 3, // 距离弹窗关闭的秒数
    };
  },
  watch: {
    // 监视弹窗是否显示
    isShowUnder(newvalue) {
      if (newvalue == true) {
        this.closeDialog();
      } else {
        // 清除所有的定时器，不然显示的时间会错乱
        // 消耗大量性能可能存在问题
        for (let i = 1; i < 100000; i++) {
          clearInterval(i);
        }
        // 延迟将显示的时间更改为3，不延迟会在弹窗关闭的一瞬间显示3,体现较差
        sleep(500).then(() => {
          console.log("重新恢复到3");
          this.closeNumber = 3;
        });
      }
    },
  },
  methods: {
    closeDialog() {
      // console.log("开启了");
      sleep().then(() => {
        this.closeNumber--; // console.log("秒数减一");
        sleep().then(() => {
          this.closeNumber--; // console.log("秒数再次减一");
          sleep().then(() => {
            this.isShowUnder = false;  //关闭弹窗
          });
        });
      });
    },
    // 自定义事件-关闭弹窗--如果使用了sync的话请注释
    changeShow(){
      this.isShowUnder=false
    }
  },
};
</script>