<template>
  <div class="board-column">
    <div class="board-column-header">
      {{ headerText }}
    </div>
    <draggable
      v-bind="dragOptions"
      class="board-column-content"
      v-model="list"
      animation="2000"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <transition-group type="transition" name="flip-list">
        <div v-for="element in com_list" :key="element.id" class="board-item">
          {{ element.name }} {{ element.id }}
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
//  this.$emit('update:visible', false)
export default {
  name: "DragKanbanDemo",
  components: {
    draggable,
  },
  watch:{
      list(newValue,old){
        console.log(this);
//  this.$emit('update:list', newValue)
   console.log('newValue',newValue);
   console.log("old",old);
      },
      com_list(newValue,old){
       console.log("com_list被改变了");
      }
  },
  props: {
    headerText: {
      type: String,
      default: "Header",
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    // 列表数据
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {},
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    com_list: {
      get() {
        return this.list;
      },
      set() {
        this.$emit(changeList, 123)
      },
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
