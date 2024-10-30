<!--
 * @Description: What's this for
 * @Autor: WangYuan1
 * @Date: 2024-08-21 17:24:47
 * @LastEditors: WangYuan
 * @LastEditTime: 2024-08-21 18:01:01
-->
<template>
  <div class="pl-24 pr-24"  v-design-loading="!complete">
    <div class="h-72 lh-72 text-18 c-#333">原始数据</div>
    <div v-if="formData.length">
      <el-table v-if="complete" :data="formData" border style="width: 100%">
        <el-table-column prop="date" label="用户id" width="180" />
        <el-table-column
          v-for="(widget, index) in form?.widgetList"
          :key="index"
          :prop="widget.id"
          :label="`问题${index + 1}.${widget?.props?.label}`"
        >
          <template #default="{ row }">
            <!-- 单选 -->
            <div v-if="widget.componentName === 'FormRadioWidget'">
              {{
                widget?.props?.options?.find(
                  (item) => item.id == row.data[widget.id]
                )?.label
              }}
            </div>
            <!-- 多选 -->
            <div v-else-if="widget.componentName === 'FormCheckboxWidget'">
              {{
                widget?.props?.options
                  ?.filter((item) => row.data[widget.id].includes(item.id))
                  ?.map((item) => item.label)
                  ?.join("、")
              }}
            </div>

            <div v-else-if="widget.componentName === 'FormRateWidget'">
              {{ Constants?.RateObject[row?.data[widget.id]] }}
            </div>

            <div v-else>{{ row.data[widget.id] }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-empty
      v-else
     class="mt-150"
      image="https://s0.wenjuan.com/wj-reportfed/367da81a/img/no-data.eae7866b.png"
      :image-size="200"
      description="暂无用户填写数据"
    />
  </div>
</template>

<script setup lang="ts">
import { http } from "@/utils/http";
import { useRoute, useRouter } from "vue-router";
import { ref, reactive, toRefs, defineProps, computed } from "vue";
import Constants from "@/constants/index";

const route = useRoute();
const { id, type } = route.query;
let complete = ref(false);
let form = ref({});
let formData = ref([]);

console.log("id", id);

init();

async function init() {
  await http.post("/form/getDetailById", { id }).then((res) => {
    console.log(res);
    form.value = res.data.formDesign;
  });

  await http.post("/formData/getForPage", { formId: id }).then((res) => {
    formData.value = res.data.list;
  });

  complete.value = true;
}
</script>

<style lang="scss" scoped></style>
