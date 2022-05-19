<template>
  <div class="btn_none" @click="SocialSignin">
    <svg-icon :icon-class="svgName" class="other_svg" ></svg-icon>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  props: ["svgName", "title"],
  methods: {
    SocialSignin() {

       this.$root.$children[0].isShowUnder = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn_none {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    user-select: none;
  }
}
.other_svg {
  width: 1.3em;
  height: 1.3em;
}
</style>
