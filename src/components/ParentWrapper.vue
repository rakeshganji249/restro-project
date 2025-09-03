<!-- DOCUMENT filename="ParentWrapper.vue" -->
<template>
  <div>
    <button @click="toggleComponent">
      Switch Component (Current: {{ current }})
    </button>

    <!--  KeepAlive caches TableComponent state -->
    <KeepAlive>
      <component
        :is="currentComponent"
        :key="current"
        ref="dynamicComp"
        :items="items"
        :headers="headers"
        @table-action="handleTableAction"
      />
    </KeepAlive>
  </div>
</template>

<script>
import TableComponent from "./TableComponent.vue"

export default {
  name: "ParentWrapper",
  components: { TableComponent },
  data() {
    return {
      current: "TableComponent",
      items: [
        { id: 1, name: "Apple", price: "100" },
        { id: 2, name: "Banana", price: "50" },
      ],
      headers: ["Name", "Price"],
    }
  },
  computed: {
    currentComponent() {
      return this.current === "TableComponent" ? "TableComponent" : "div"
    },
  },
  methods: {
    toggleComponent() {
      this.current =
        this.current === "TableComponent" ? "Other" : "TableComponent"
    },
    handleTableAction(payload) {
      console.log("Parent received action:", payload)
    },
  },
}
</script>
