 <template>
  <div class="components-container board">
    <Kanban :key="1" :list="list1" :group="group" class="kanban todo" header-text="看板1" />
    <Kanban :key="2" :list="list2" :group="group" class="kanban working" header-text="看板2" />
    <Kanban :key="3" :list="list3" :group="group" class="kanban done" header-text="看板3" />
  </div>
</template>
<script>
import Kanban from "@/components/Kanban";

export default {
  name: "DragKanbanDemo",
  components: {
    Kanban,
  },
  data() {
    return {
      group: "mission",
      list1: [
        { name: "Mission", id: 1 },
        { name: "Mission", id: 2 },
        { name: "Mission", id: 3 },
        { name: "Mission", id: 4 },
      ],
      list2: [
        { name: "Mission", id: 5 },
        { name: "Mission", id: 6 },
        { name: "Mission", id: 7 },
      ],
      list3: [
        { name: "Mission", id: 8 },
        { name: "Mission", id: 9 },
        { name: "Mission", id: 10 },
      ],
    };
  },
  methods: {
    changeList(key) {
      console.log(key, "key被改变了");
    },
  },
  mounted() {
    // this.$on("changeList", this.changeList())
  },
};
</script>
<style lang="scss">
.board {
  width: 1000px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4a9ff9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>

