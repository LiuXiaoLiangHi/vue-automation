 <template>
  <div class="reg">
    <RegisterHeader />
    <RegisterMain />
  </div>
</template>
<script>
import RegisterHeader from "./header/index.vue";
import RegisterMain from "./main/index.vue";
export default {
  components: {
    RegisterHeader,
    RegisterMain,
  },
};
</script>
<style lang="scss">
body {
  //body的背景颜色
  background-color: #f3f5f8;
}
</style>