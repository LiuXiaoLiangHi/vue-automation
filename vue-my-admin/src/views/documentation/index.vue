<template>
  <div class="app-container documentation-container">
  <iframe class="apiIframe" width="100%"  height="1000px" src="https://console-docs.apipost.cn/preview/a887cac05ce01346/87f9dc8739ed76bf?target_id=5fd8ee34-aa78-4a60-f6c5-3c3e1ac97f52#5fd8ee34-aa78-4a60-f6c5-3c3e1ac97f52"></iframe>
  </div>
</template>

<script>

export default {
  name: 'Documentation',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container{
  padding: 0;
}
.documentation-container {
   height: 100%;
   width: 100%;
   
   .apiIframe{
     border: none;
   }
}
</style>
