<!-- DOCUMENT filename="TableComponent.vue" -->
<template>
  <div class="table-container">
    <!--  Transition for smooth fade when table appears/disappears -->
    <Transition name="fade">
      <table v-if="items.length > 0">
        <thead>
          <tr>
            <!-- Named slot for table headers -->
            <slot name="header">
              <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
            </slot>
          </tr>
        </thead>

        <!--  TransitionGroup for row add/remove animations -->
        <TransitionGroup name="list" tag="tbody">
          <tr v-for="(item, index) in items" :key="item.id || index">
            <slot name="row" :item="item" :index="index">
              <td v-for="(header, colIndex) in headers" :key="colIndex">
                {{ item[header.toLowerCase()] || 'N/A' }}
              </td>
            </slot>
          </tr>
        </TransitionGroup>
      </table>
      <p v-else>No data available.</p>

    </Transition>


    <!--  Teleport: Modal rendered outside the table container -->
    <Teleport to="body">
      <div v-if="showModal" class="modal">
        <p>Action performed at {{ lastAction?.timestamp }}</p>
        <button @click="showModal = false">Close</button>
      </div>
    </Teleport>

    <!-- Action button -->
    <button ref="actionBtn" @click="handleAction" class="action-btn">
      Perform Action
    </button>

    <!--  Suspense: async child example -->
    <Suspense>
      <template #default>
        <AsyncInfo />
      </template>
      <template #fallback>
        <p>Loading extra info...</p>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue"

//  Async component for Suspense
const AsyncInfo = defineAsyncComponent(() =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        template: `<p>Extra async info loaded!</p>`,
      })
    }, 2000)
  })
)

// Mixin
const loggingMixin = {
  created() {
    console.log("TableComponent: Created with mixin logging")
  },
}

export default {
  name: "TableComponent",
  mixins: [loggingMixin], //Using mixin
  props: {
    items: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      default: () => [],
    },
  },
  components: { AsyncInfo },
  data() {
    return {
      isLoading: false,
      showModal: false,
      lastAction: null,
    }
  },
  methods: {
    handleAction() {
      this.lastAction = { timestamp: new Date() }
      this.showModal = true
      this.$emit("table-action", this.lastAction)

      //  Using plugin
      this.$log("Action performed inside TableComponent")
    },
  },
  watch: {
    items: {
      immediate: true,
      handler(newItems) {
        this.isLoading = newItems.length === 0
      },
    },
  },
  beforeMount() {
    console.log("TableComponent: Before Mount")
  },
  mounted() {
    console.log("TableComponent: Mounted")
    //Template ref usage
    console.log("Action Button Ref:", this.$refs.actionBtn)
  },
}
</script>

<style scoped>
.table-container {
  margin: 20px auto;
  width: 80%;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th,
td {
  border: 1px solid #f3b53b;
  padding: 10px;
  text-align: left;
}
th {
  background-color: #f3b53b;
  color: white;
}
.action-btn {
  background-color: #f3b53b;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
.action-btn:hover {
  background-color: #553330;
}
/* ✅ Transition fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* ✅ TransitionGroup for rows */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
/* ✅ Modal styling (Teleport) */
.modal {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 2px solid #f3b53b;
  padding: 20px;
  z-index: 1000;
}
</style>
