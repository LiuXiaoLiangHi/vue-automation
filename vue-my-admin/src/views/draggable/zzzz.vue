  <template>
  <div class="board-column">
    <div class="board-column-header">
      {{ headerText }}
    </div>

    <draggable class="list-group" 
    tag="ul"
     v-model="list"
      v-bind="dragOptions" @start="isDragging = true" @end="isDragging = false">
      <transition-group type="transition" name="flip-list">
        <li class="list-group-item" 
        v-for="element in list"
         :key="element.order">
          
          {{ element.name }}
        </li>
      </transition-group>
    </draggable>

  </div>
 
 
 
</template>

<script>
import draggable from "vuedraggable";
 
export default {
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
          list: {
      type: Array,
      default() {
        return [];
      },
    },
    },
  name: "transition-example",
  display: "Transition",
  order: 6,
  components: {
    draggable,
  },
  data() {
     
  },
  methods: {
     
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
}
}
</script>

<style>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>