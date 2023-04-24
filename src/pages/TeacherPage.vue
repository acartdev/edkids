<template>
  <q-page class="fit">
    <div class="row fit justify-center item-center">
      <div
        class="col-sm-11 bg-white q-pa-md q-px-lg"
        style="border-radius: 16px; height: 620px"
      >
        <q-spinner
          v-if="loading == true"
          color="secondary"
          class="absolute-center"
          size="3em"
        />
        <div class="q-pa-md" v-if="loading == true">
          <div class="q-gutter-md flex column">
            <q-skeleton
              type="circle"
              size="150px"
              class="self-center flex-center"
            />
            <q-skeleton height="390px" />
          </div>
        </div>

        <div class="row items-start fit justify-center">
          <div class="col-sm-6 q-pt-md">
            <div class="flex flex-center column">
              <q-img
                :src="imageFile"
                width="150px"
                height="150px"
                style="border-radius: 50%"
                class="shadow-10"
              >
              </q-img>
              <p class="text-h4 text-weight-bold q-pt-lg q-ma-none">
                ครู {{ entityItem?.first_name + " " + entityItem.last_name }}
              </p>
              <ul
                style="list-style-type: none; font-size: 24px"
                class="no-padding no-margin"
              >
                <li class="q-pt-sm">ชื่อเล่น : {{ entityItem.nick_name }}</li>
                <li class="q-pt-sm">ตำแหน่ง : {{ entityItem.position }}</li>
                <li class="q-pt-sm">โทรศัพท์ : {{ entityItem.phone }}</li>
              </ul>
              <q-btn
                tag="a"
                :href="entityItem.link_line"
                target="_blank"
                class="bg-green-13 q-pa-md text-h6 text-white q-mt-md"
                style="border-radius: 16px; letter-spacing: 1.3px"
                >ติดต่อผ่าน LINE</q-btn
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { TeacherApi } from "src/api/TeacherApi";
import { useRoute } from "vue-router";
import { teacherKey } from "src/boot/utils/config";

const { getOneTeacher } = TeacherApi();
const id = localStorage.getItem(teacherKey);
const studentId = ref(id);
const imageFile = ref();
const route = useRoute();
const entityItem = ref({});
const loading = ref(false);

onMounted(() => {
  if (route.params.studentId) {
    studentId.value = route.params.studentId;
  }
  if (studentId.value) {
    fetchData();
  }
});

const fetchData = async () => {
  loading.value = true;
  const respone = await getOneTeacher(studentId.value);
  loading.value = false;

  if (respone) {
    respone.entity.forEach((element) => {
      entityItem.value = element;
      imageFile.value = element.image.thumbnail;
    });
  }
};
</script>

<style scoped></style>
