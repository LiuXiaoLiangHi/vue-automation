 <template>
  <div class="login_footer_other">
    <div @click="lianxi">
      <svg-icon icon-class="纸飞机" />
      <span>联系作者</span>
    </div>
    <div style="border:1px solid #EBEBEB;height:40px;margin-top:7px"></div>
    <div @click="xiazai">
      <svg-icon icon-class="下载" />
      <span>下载SDK</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    lianxi() {
      this.$root.$children[0].isShowUnder = true;
    },
    xiazai() {
      this.$root.$children[0].isShowUnder = true;
    },
  },
};
</script>

<style lang="scss">
.login_footer_other {
  width: 100%;
  background-color: #f6f6f6;
  height: 55px;
  line-height: 55px;
  color: #1296db;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  & > div > span {
    margin-left: 10px;
  }
  & div:nth-child(1) {
    margin-left: 20px;
  }
  & div:nth-child(3) {
    margin-right: 20px;
  }
  & div:nth-child(1):hover {
    cursor: pointer;
  }
  & div:nth-child(3):hover {
    cursor: pointer;
  }
}
</style>