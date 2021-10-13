<template>
  <n-modal
    :show="show"
    preset="dialog"
    :title="title"
    positive-text="确认"
    @update:show="$emit('update:show', $event)"
    @positive-click="onPositiveClick"
  >
    <n-input
      v-model:value="value"
      type="text"
    />
  </n-modal>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {newDirectory} from "../../api/file";

export default defineComponent({
  name: "RenameModal",
  props: {
    type: {
      type: String,
      default: "create",
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:show'],
  data() {
    return {
      title: this.type === "create" ? "请输入文件夹名字" : "请输入新的名字",
      value: "新建文件夹",
    }
  },
  methods: {
    onPositiveClick() {
      if (this.type === "create") {
        newDirectory(this.$store.state.currentDirectory, this.value)
          .then(() => this.$store.commit("refresh"))
          .then(() => this.$emit("update:show", false))
      } else {
        this.$emit("update:show", false)
      }
    },
  },
})
</script>

<style scoped>

</style>
