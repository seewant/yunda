<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2023-02-28 10:12:33
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-09-19 10:46:16
-->

<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="https://www.sunmao-design.top/mall-cook/yunda/img/upload"
    multiple
    :show-file-list="false"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-exceed="handleExceed"
    :on-success="handleSuccess"
  >
    <div>
      <el-button
        class="w-96px h-40px"
        style="box-shadow: 0 6px 8px 0 rgb(34, 84, 244, 0.16)"
        type="primary"
        color="#2254f4"
      >
        上传
      </el-button>
    </div>
  </el-upload>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { UploadProps, UploadUserFile } from "element-plus";

const emits = defineEmits(["success"]);
const fileList = ref<UploadUserFile[]>([]);

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};

function handleSuccess() {
  ElMessage({
    message: "图片上传成功！",
    type: "success",
  });
  emits("success");
}
</script>
