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

const swtichHide = (item) => {
  console.log("switch hide");
  if (item.hide == undefined) {
    item.hide = true;
  } else {
    item.hide = !item.hide;
  }
};

function getMonth_day(date) {
  const time = new Date(date);
  const month = time.getMonth() + 1;
  const day = time.getDate();
  return `${month}月${day}日`;
}

onMounted(() => {});
</script>

<template>
  <div class="drawer-outer min-w-[832px]">
    <div
      class="level1 animate__animated animate__fadeInUp"
      v-for="(item1, index1) in props.data"
      :key="index1"
    >
      <div
        class="text-2xl leading-10 text-violet-900 cursor-pointer hover:text-violet-300"
        @click="swtichHide(item1)"
      >
        <div
          class="inline-block rounded-full h-10 w-10 bg-violet-600 text-center text-xl leading-10"
        >
          <font-awesome-icon
            icon="fa-solid fa-calendar-days"
            class="text-white"
          />
        </div>
        &nbsp;{{ item1[props.key_level1] }}
      </div>
      <transition name="linearInOut">
        <div v-show="!item1.hide" class="overflow-hidden">
          <div
            class="level2 w-[800px] rounded-md p-4 m-4 bg-gray-200 flex justify-between cursor-pointer"
            v-for="(item2, index2) in props.data[index1][key_array2]"
            :key="index2"
          >
            <div class="">{{ item2[props.key_level2] }}</div>
            <div class="" v-if="item2.time">
              <font-awesome-icon
                icon="fa-solid fa-clock"
                class="text-gray-500"
              />
              {{ getMonth_day(item2.time) }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
