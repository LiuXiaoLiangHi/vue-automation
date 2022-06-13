  <template>
  <div class="board-column">
    <!-- 头部信息 -->
    <div class="board-column-header">
      {{ headerText }}
    </div>
    <!-- 可拖拽的区域 -->
    <draggable :list="list" :group="group" class="board-column-content" :set-data="setData" animation="300" ghostClass="ghost">
      <!-- 具体的项 -->
      <div v-for="element in list" :key="element.id" class="board-item">
        {{ element.name }} {{ element.id }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "Helloworld",
  components: {
    draggable,
  },
  props: {
    //头部信息
    headerText: {
      type: String,
      default: "Header",
    },
    //
    group: {
      type: String,
    },
    // 当然你也可以设置options选项完成自定义的样式
    // options: {
    //   type: Object,
    //   default() {
    //     return {};
    //   },
    // },

    // 列表数据
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
 
  methods: {
    setData(dataTransfer) {
      // 避免火狐浏览器的bug
      // Detail see : https://github.comcom/RubaXa/Sortable/issues/1012
      dataTransfer.setData("Text", "");
    },
  },
};
</script>
<style lang="scss" scoped>
.board-column {
  min-width: 300px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;

  .board-column-header {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #333;
    color: #fff;
    border-radius: 3px 3px 0 0;
  }

  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;

    .board-item {
      user-select: none;
      cursor: pointer;
      width: 100%;
      height: 64px;
      margin: 5px 0;
      background-color: #fff;
      text-align: left;
      line-height: 54px;
      padding: 5px 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
