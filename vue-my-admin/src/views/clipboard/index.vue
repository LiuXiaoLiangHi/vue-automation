<template>
  <div class="app-container">

    <el-tabs v-model="activeName">

      <el-tab-pane label="直接使用剪贴板" name="directly">
        <el-input v-model="inputData" placeholder="请输入" style="width:400px;max-width:100%;" />
        <el-button type="primary" icon="el-icon-document" @click="handleCopy(inputData,$event)">
          复制
        </el-button>
      </el-tab-pane>

      <el-tab-pane label="通过v-directive指令使用剪贴板" name="v-directive">
        <el-input v-model="inputData" placeholder="请输入" style="width:400px;max-width:100%;" />
        <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
          复制
        </el-button>
      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<script>
import clip from "@/utils/clipboard"; // 通过调用函数的形式
import clipboard from "@/directive/clipboard/index.js"; //  通过使用v-directivex指令来使用clipboard

export default {
  name: "ClipboardDemo",
  // 注册指令
  directives: {
    clipboard,
  },
  data() {
    return {
      // 当前活跃的tab
      activeName: "directly", 
      // input框的数据 
      inputData: "",
    };
  },
  methods: {
    // 触发copy
    handleCopy(text, event) {
      clip(text, event);
    },
    // copy剪切成功
    clipboardSuccess() {
      this.$message({
        message: "复制成功",
        type: "success",
        duration: 1500,
      });
    },
  },
};
</script>

