 <template>
  <div style="height:100%">
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
<style lang="scss" scoped>
div {
 
  background-color: #f3f5f8;
}
</style>