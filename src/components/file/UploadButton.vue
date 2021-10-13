<template>

  <n-upload
    v-model:file-list="uploading"
    abstract
    action="http://localhost:5000/api/upload"
    :data="getData"
    @finish="$store.commit('refresh')"
  >

    <n-upload-trigger
      #="{handleClick}"
      abstract
    >
      <n-button
        type="primary"
        @click="handleClick"
      >
        上传
        <template #icon>
          <n-icon>
            <arrow-upload20-regular />
          </n-icon>
        </template>
      </n-button>
    </n-upload-trigger>
    <div
      v-if="uploading.length > 0"
      class="upload-file-list"
    >
      <n-card
        class="upload"
        title="上传列表"
      >
        <n-upload-file-list />
      </n-card>
    </div>
  </n-upload>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {ArrowUpload20Regular} from "@vicons/fluent";
import {UploadFileInfo} from "naive-ui";
import {loadFileHash} from "../../utils/shautils";

export default defineComponent({
  name: "UploadButton",
  components: {
    ArrowUpload20Regular,
  },
  data() {
    return {
      uploading: [],
    }
  },
  methods: {
    getData(file: UploadFileInfo) {
      const fileObj = (file as any).file.file
      const hash = loadFileHash(fileObj)
      console.log(hash);
      return {
        uploadDirectory: this.$store.state.currentDirectory,
        hash: hash,
        fileName: file.file?.name,
      };
    },
  },
});
</script>

<style scoped lang="stylus">
.upload-file-list
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 480px;
  z-index 100;
</style>
