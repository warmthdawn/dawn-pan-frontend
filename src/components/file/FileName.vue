<template>
  <div class="label">
    <span class="icon">
      <div>
        <slot />
      </div>
    </span>
    <span class="content">
      {{ content }}
    </span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "FileName",
  props: {
    content: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped lang="stylus">
.label
  display flex
  align-items center
.icon
  margin 6px
  margin-left 0
  height 18px
  width 18px
  position relative
  flex-shrink 0
  div
    height 18px
    width 18px
    position absolute
    left 0
    top 50%
    transform translateY(-50%)
    display flex

</style>
