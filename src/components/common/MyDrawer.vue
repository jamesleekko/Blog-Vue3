<script setup>
import { reactive, onMounted, ref } from "vue";
import { useGlobalStore } from "~/assets/plugins/pinia/global-store";

const store = useGlobalStore();

const props = defineProps({
  data: { type: Array, default: () => [] },
  key_level1: { type: String, default: "" },
  key_level2: { type: String, default: "" },
  key_array2: { type: String, default: "" },
});

const swtichExpand = (item) => {
  item.expand = !item.expand;
};

onMounted(() => {
  if(props.data.length > 0) {
    props.data[0].expand = true;
  }
});
</script>

<template>
  <div class="drawer-outer">
    <div class="level1" v-for="(item1, index1) in props.data" :key="index1" @click="swtichExpand(item1)">
      <div>{{ item1[props.key_level1] }}</div>
      <div
        class="level2"
        v-for="(item2, index2) in props.data[index1][key_array2]"
        :key="index2"
        v-show="item1.expand"
      >
        <div>{{ item2[props.key_level2] }}</div>
      </div>
    </div>
  </div>
</template>
