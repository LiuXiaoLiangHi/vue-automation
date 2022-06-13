 <template>
  <div class="about">
    <h1>测试vue-video-player</h1>
    <div style="width: 600px">
      <video-player ref="videoPlayer" style="" class="video-player vjs-custom-skin" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" />
      <!-- //监听开始状态 -->
      <!-- //监听暂停状态 -->
    </div>
    <video width="550" height="400" controls>
      <source :src=" require('@/assets/video/oceans.mp4')" type="video/mp4">
    </video>
    <div>
     <div v-for="(item) in items " :key=item.id>{{item.id}}</div>
    </div>
  </div>
</template>
<script>
import "video.js/dist/video-js.css";

import { videoPlayer } from "vue-video-player";
export default {
  components: {
    videoPlayer,
  },
  data() {
    return {
      items:[
        {id:1},
        {id:3}
      ],

      playerOptions: {
        playbackRates: [0.5, 0.7, 1, 1.2, 1.5, 2.0], //播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            // src: require("@/assets/video/oceans.mp4"), // url地址
            src: "https://www.bilibili.com/video/BV1Dr4y1c7xS?t=126.3",
          },
        ],
        hls: true,
        poster: require("@/assets/video/bacc.jpg"), // 你的封面地址
        // width: document.documentElement.clientWidth, // 播放器宽度
        // width:'200',
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, // 全屏按钮
        },
      },
    };
  },
  mounted() {
    console.log("这是当前的播放器实例对象", this.player);
    console.log(this.player.width());
    console.log(document.documentElement.clientWidth);
    console.log('中都是',this)
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
      console.log("开始播放!", player);
    },
    onPlayerPause(player) {
      console.log("播放暂停", player);
    },
    // ...player event

    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log("更新播放的状态", playerCurrentState);
    },

    // player is ready
    playerReadied(player) {
      console.log("视频以及占比好了", player);
      // you can use it to do something...
      // player.[methods]
    },
  },
};
</script>
<style lang="scss">
.about {
  padding: 50px !important;
  .video-js .vjs-big-play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // width: 72px;
    // height: 72px;
    // border-radius: 100%;
    // z-index: 100;
    // background-color: #ffffff;
    // border: solid 1px #979797;
  }
  // .vjs-tech{
  // object-fit: cover !important
  // }
  .vjs-poster {
    background-size: 100%;
  }
}
</style>
