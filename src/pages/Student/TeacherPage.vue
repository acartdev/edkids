<template>
  <q-page class="bg-white">
    <div class="row fit justify-center bg-white items-center q-pt-lg">
      <div class="col-4 col-sm-12 text-center">
        <q-avatar size="120px">
          <q-img :src="entityItem.image?.thumbnail" alt="" />
        </q-avatar>
      </div>
      <div class="col-9 q-mt-sm col-sm-4">
        <p class="text-h6 q-mb-sm text-center">
          <q-icon color="teal" name="person"></q-icon> คุณครู:
          {{
            entityItem.first_name +
            " " +
            " นามสกุล" +
            " " +
            entityItem.last_name
          }}
        </p>
        <p class="text-h6 q-mb-sm text-center">
          <q-icon color="teal" name="sell"></q-icon> ชื่อเล่น:ครู
          {{ entityItem.nick_name }}
        </p>
        <p class="text-h6 q-mb-sm text-center">
          <q-icon color="teal" name="cast_for_education"></q-icon> ตำแหน่ง:
          {{ entityItem.position }}
        </p>
        <p class="text-h6 q-mb-sm text-center">
          <q-icon color="teal" name="meeting_room"></q-icon> ควบคุมห้อง:
          {{ entityItem.room }}
        </p>
      </div>
    </div>
    <div class="row justify-center fit">
      <div class="col-7 col-sm-2 q-mt-md text-center">
        <a :href="entityItem.link_line">
          <q-btn color="green-13" size="20px" :icon-right="biLine"
            >ติดต่อผ่านทางไลน์ &nbsp;
          </q-btn>
        </a>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { biLine } from "@quasar/extras/bootstrap-icons";
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

<style scoped lang="scss"></style>
