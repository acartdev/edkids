<template>
  <q-page class="q-mb-xl">
    <div class="row q-pa-none">
      <div class="col-12 col-md-0 relative-position">
        <q-img fit="cover" class="shadow-12" :src="url" :ratio="16 / 9" />
      </div>
      <div class="col-12 col-md-3 respons q-pa-none">
        <div class="row justify-center items-center relative-position">
          <div class="col-4" style="position: absolute; top: -100px">
            <q-avatar size="9rem" class="shadow-12">
              <img :src="entityItem.image?.thumbnail" alt="" />
            </q-avatar>
          </div>
        </div>
        <div class="row justify-center items-center q-mt-xl q-pa-none">
          <div class="col-6 q-ml-sm">
            <p class="text-center q-pt-md q-mb-md text-h6">
              ข้อมูลของนักเรียน<q-icon color="warning" name="bolt"></q-icon>
            </p>
          </div>
          <div class="col-12">
            <q-card>
              <q-card-section>
                <div class="row">
                  <div class="col-8">
                    <ul class="q-px-md q-py-none">
                      <li class="q-mb-xs">
                        <span
                          ><q-icon color="teal" name="person"></q-icon>
                          ชื่อจริง:</span
                        >
                        &nbsp;
                        {{ entityItem.gender ? "เด็กชาย" : "เด็กหญิง" }}
                        {{ entityItem.first_name + " " + entityItem.last_name }}
                      </li>
                      <li class="q-mb-xs">
                        <span
                          ><q-icon color="teal" name="account_circle"></q-icon>
                          ชื่อเล่น:</span
                        >{{ entityItem.nick_name }}
                      </li>
                      <li class="q-mb-xs">
                        <span
                          ><q-icon color="teal" name="child_friendly"></q-icon>
                          อายุ:</span
                        >
                        {{ age[0] }}
                      </li>
                      <li class="q-mb-xs">
                        <span
                          ><q-icon color="teal" name="location_city"></q-icon>
                          โรงเรียน:</span
                        >
                        เตรียมอนุบาล
                      </li>
                      <li class="q-mb-xs">
                        <span
                          ><q-icon color="teal" name="meeting_room"></q-icon>
                          ห้อง:</span
                        >
                        {{ entityItem.room }}
                      </li>

                      <li class="q-mb-xs">
                        <span
                          ><q-icon color="teal" name="vpn_key"></q-icon>
                          รหัสนักเรียน:</span
                        >
                        {{ entityItem.special }}
                      </li>
                      <li class="q-mb-xs">
                        <span
                          ><q-icon color="teal" name="groups_3"></q-icon>
                          ครูผู้สอน: คุณครู</span
                        >
                        {{
                          teacherEntityItem?.first_name +
                          " " +
                          teacherEntityItem?.last_name
                        }}
                      </li>
                    </ul>
                  </div>
                  <div class="col-2 self-center">
                    <q-icon
                      size="80px"
                      color="warning"
                      name="insights"
                    ></q-icon>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="col-12">
          <p class="text-h6 text-center q-mt-md">
            กราฟคะแนนของนักเรียน
            <q-icon color="warning" name="trending_up"></q-icon>
          </p>
        </div>
        <div class="col-12 q-mt-md q-px-md q-mb-xl">
          <div class="row bg-white shadow-6 justify-start">
            <div
              v-if="conductEntityItem.length > 0"
              class="col-4 q-pt-sm q-pl-xl text-center"
            >
              <chart-conduct :point="conductEntityItem" />
            </div>
            <div v-else class="col-12 text-center q-py-md">
              <p>
                ไม่พบข้อมูลการให้คะแนน
                <q-icon name="close" color="red"></q-icon>
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 q-mb-xl">
          <div class="row justify-center">
            <div class="col-12 text-center text-h6 q-mb-sm">
              ข้อมูลผู้ปกครอง
              <q-icon color="warning" name="family_restroom"></q-icon>
            </div>
            <div class="col-12">
              <q-card>
                <q-card-section>
                  <div class="row">
                    <div class="col-8">
                      <ul class="q-px-md q-py-none">
                        <li class="q-mb-xs">
                          <span
                            ><q-icon color="teal" name="person"></q-icon>
                            ชื่อจริง:</span
                          >
                          &nbsp;

                          {{
                            parentEntityItem.first_name +
                            " " +
                            parentEntityItem.last_name
                          }}
                        </li>
                        <li class="q-mb-xs">
                          <span
                            ><q-icon
                              color="teal"
                              name="account_circle"
                            ></q-icon>
                            ชื่อเล่น:</span
                          >{{ parentEntityItem.nick_name }}
                        </li>
                        <li class="q-mb-xs">
                          <span
                            ><q-icon color="teal" name="phone"></q-icon>
                            เบอร์โทร:</span
                          >
                          {{ parentEntityItem.phone }}
                        </li>
                        <li class="q-mb-xs">
                          <span
                            ><q-icon color="teal" name="meeting_room"></q-icon>
                            อีเมล:</span
                          >
                          {{ parentEntityItem.email }}
                        </li>

                        <li class="q-mb-xs">
                          <span
                            ><q-icon color="teal" name="hail"></q-icon>
                            อาชีพ:</span
                          >
                          {{ parentEntityItem.ocupation }}
                        </li>
                        <li class="q-mb-xs">
                          <span
                            ><q-icon color="teal" name="groups_3"></q-icon>
                            รหัสไปรษณีย์:</span
                          >
                          {{ parentEntityItem?.zip_code }}
                        </li>
                      </ul>
                    </div>
                    <div class="col-2 self-center">
                      <q-icon
                        size="80px"
                        color="warning"
                        name="diversity_1"
                      ></q-icon>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="desktop q-px-xl">
      <div class="row fit q-pa-md">
        <div class="col-sm-3 text-left q-mb-md">
          <q-img
            class="shadow-12"
            width="200px"
            height="200px"
            :src="entityItem.image?.thumbnail"
          ></q-img>
        </div>

        <div class="col-sm-3 text-left">
          <div class="row fit">
            <div class="col-sm-12">
              <ul class="q-px-md q-py-none">
                <li class="q-mb-xs">
                  <span
                    ><q-icon color="teal" name="person"></q-icon>
                    ชื่อจริง:</span
                  >
                  &nbsp;
                  {{ entityItem.gender ? "เด็กชาย" : "เด็กหญิง" }}
                  {{ entityItem.first_name + " " + entityItem.last_name }}
                </li>
                <li class="q-mb-xs">
                  <span
                    ><q-icon color="teal" name="account_circle"></q-icon>
                    ชื่อเล่น:</span
                  >{{ entityItem.nick_name }}
                </li>
                <li class="q-mb-xs">
                  <span
                    ><q-icon color="teal" name="account_circle"></q-icon>
                    อายุ: </span
                  >{{ yearAge[0] + " ปี " + monthAge[0] + " เดือน " }}
                </li>
                <li class="q-mb-xs">
                  <span
                    ><q-icon color="teal" name="location_city"></q-icon>
                    โรงเรียน:</span
                  >
                  เตรียมอนุบาล
                </li>
                <li class="q-mb-xs">
                  <span
                    ><q-icon color="teal" name="meeting_room"></q-icon>
                    ห้อง:</span
                  >
                  {{ entityItem.room }}
                </li>

                <li class="q-mb-xs">
                  <span
                    ><q-icon color="teal" name="vpn_key"></q-icon>
                    รหัสนักเรียน:</span
                  >
                  {{ entityItem.special }}
                </li>
                <li class="q-mb-xs">
                  <span
                    ><q-icon color="teal" name="groups_3"></q-icon> ครูผู้สอน:
                    คุณครู</span
                  >
                  {{
                    teacherEntityItem?.first_name +
                    " " +
                    teacherEntityItem?.last_name
                  }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <q-img
            width="200px"
            height="200px"
            fit="cover"
            :src="parentEntityItem.image?.thumbnail"
          ></q-img>
        </div>
        <div class="col-sm-3">
          <ul class="q-px-md q-py-none">
            <li class="q-mb-xs">
              <span
                ><q-icon color="teal" name="person"></q-icon> ชื่อจริง:</span
              >
              &nbsp;

              {{
                parentEntityItem.first_name + " " + parentEntityItem.last_name
              }}
            </li>
            <li class="q-mb-xs">
              <span
                ><q-icon color="teal" name="account_circle"></q-icon>
                ชื่อเล่น:</span
              >{{ parentEntityItem.nick_name }}
            </li>
            <li class="q-mb-xs">
              <span><q-icon color="teal" name="phone"></q-icon> เบอร์โทร:</span>
              {{ parentEntityItem.phone }}
            </li>
            <li class="q-mb-xs">
              <span
                ><q-icon color="teal" name="meeting_room"></q-icon> อีเมล:</span
              >
              {{ parentEntityItem.email }}
            </li>

            <li class="q-mb-xs">
              <span><q-icon color="teal" name="hail"></q-icon> อาชีพ:</span>
              {{ parentEntityItem.ocupation }}
            </li>
            <li class="q-mb-xs">
              <span
                ><q-icon color="teal" name="groups_3"></q-icon>
                รหัสไปรษณีย์:</span
              >
              {{ parentEntityItem?.zip_code }}
            </li>
          </ul>
        </div>
        <div class="col-sm-6 q-mt-xl">
          <div class="row fit">
            <div class="col-sm-6 text-left">
              <q-img
                class="shadow-12"
                width="200px"
                height="200px"
                :src="teacherEntityItem?.image.thumbnail"
              ></q-img>
            </div>
            <div class="col-sm-6">
              <ul class="q-px-md q-py-none">
                <li class="q-mb-xs">
                  <span
                    ><q-icon color="teal" name="person"></q-icon>
                    ชื่อจริง:</span
                  >
                  &nbsp;

                  {{
                    teacherEntityItem?.first_name +
                    " " +
                    teacherEntityItem?.last_name
                  }}
                </li>
                <li class="q-mb-xs">
                  <span
                    ><q-icon color="teal" name="account_circle"></q-icon>
                    ชื่อเล่น: ครู </span
                  >{{ teacherEntityItem?.nick_name }}
                </li>
                <li class="q-mb-xs">
                  <span
                    ><q-icon color="teal" name="phone"></q-icon> ตำแหน่ง:</span
                  >
                  {{ teacherEntityItem?.position }}
                </li>
                <li class="q-mb-xs">
                  <span
                    ><q-icon color="teal" name="meeting_room"></q-icon>
                    ครูควบคุมห้อง:</span
                  >
                  {{ teacherEntityItem?.room }}
                </li>

                <li class="q-mb-xs">
                  <span
                    ><q-icon color="teal" name="hail"></q-icon> โรงเรียน:</span
                  >
                  เตรียมอนุบาล
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-sm-5 q-mt-xl text-center">
          <div
            style="border-radius: 30px"
            class="row bg-white shadow-6 justify-start"
          >
            <div
              v-if="conductEntityItem.length > 0"
              class="col-sm-10 q-pt-sm q-pl-xl"
            >
              <chart-conduct :point="conductEntityItem" />
            </div>
            <div v-else class="col-12 q-py-md">
              <p class="text-center">
                ไม่พบข้อมูลการให้คะแนน<q-icon name="close" color="red"></q-icon>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {
  ref,
  defineAsyncComponent, //chart
  onMounted,
} from "vue";

import { StudentApi } from "src/api/StudentApi";
import { useRoute } from "vue-router";
import { ParentsApi } from "src/api/ParentsApi";
import { ConductApi } from "src/api/ConductApi";
import { TeacherApi } from "src/api/TeacherApi";
import { studentKey, teacher_id } from "src/boot/utils/config";
import { useAuthenStore } from "src/stores/authen";
import { LocalStorage, useMeta } from "quasar";
useMeta({ title: "หน้าหลัก" });
const authenStore = useAuthenStore();
const url = ref("https://picsum.photos/500/300");

const route = useRoute();
const birthYear = ref();
const birthMonth = ref();
const birthDay = ref();
const age = ref([]);
const dayAge = ref([]);
const monthAge = ref([]);
const yearAge = ref([]);
const { getOne } = StudentApi();
const { getParentsStudentInfo } = ParentsApi();
const { getConductAverage } = ConductApi();
const { getOneTeacher } = TeacherApi();
const id = LocalStorage.getItem(studentKey);
const teacherId = ref();
const studentId = ref(id);
const parentEntityItem = ref({});
const entityItem = ref({});
const loading = ref(false);
const conductEntityItem = ref([]);
const teacherEntityItem = ref();
const refresh = () => {
  url.value = "https://picsum.photos/500/300?t=" + Math.random();
};
const fetchData = async () => {
  loading.value = true;

  const respone = await getOne(studentId.value);
  const teacherResponse = await getOneTeacher(teacherId.value);
  const parentsResponse = await getParentsStudentInfo(studentId.value);
  const conductResponse = await getConductAverage(studentId.value);

  loading.value = false;

  if (conductResponse) {
    conductResponse.entity.forEach((element) => {
      if (element.very_good > 0 || element.bad > 0 || element.good > 0) {
        conductEntityItem.value.push(Number(element.very_good));
        conductEntityItem.value.push(Number(element.good));
        conductEntityItem.value.push(Number(element.bad));
      }
    });
  }

  if (respone) {
    respone.entity.forEach((element) => {
      entityItem.value = element;
    });

    let today = new Date();
    let day = String(today.getDate()).padStart(2, "0");
    let month = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let year = today.getFullYear();

    // birth day

    birthYear.value = entityItem.value.birth_date.substring(0, 4);
    birthMonth.value = entityItem.value.birth_date.substring(5, 7);
    birthDay.value = entityItem.value.birth_date.substring(8, 10);

    // calculate age

    const total = year - Number(birthYear.value);

    year -= birthYear.value;
    month -= birthMonth.value;
    day -= birthDay.value;

    if (day < 0) {
      if (
        month == 1 ||
        month == 3 ||
        month == 5 ||
        month == 7 ||
        month == 8 ||
        month == 10 ||
        month == 12
      ) {
        day += 31;
      }
      if (month == 2) {
        day += 28;
      }
      if (month == 4 || day == 6 || month == 9 || month == 11) {
        day += 30;
      }
      if (month <= 0) {
        year--;
        month += 12;
        day += 30;
      }
      month -= 1;
    }

    // age collect

    dayAge.value.push(day);
    monthAge.value.push(month);
    yearAge.value.push(year);

    age.value.push(total);
  }
  if (parentsResponse) {
    parentsResponse.entity.forEach((element) => {
      parentEntityItem.value = element;
    });
  }
  if (teacherResponse) {
    teacherResponse.entity.forEach((element) => {
      teacherEntityItem.value = element;
    });
  }
};

const chartConduct = defineAsyncComponent(() =>
  import("../../components/Charts/ConductChart.vue")
);

onMounted(async () => {
  teacherId.value = LocalStorage.getItem(teacher_id);
  refresh();

  if (route.params.studentId) {
    studentId.value = route.params.studentId;
  }

  await fetchData();
});
</script>
<style scoped lang="scss">
* li {
  list-style: none;
  padding: 0;

  box-sizing: border-box;
}
body.screen--lg {
  .desktop {
    display: block;
    * p,
    span {
      font-size: 1rem;
    }
  }
  .q-page {
    margin: 0;
  }
  .respons {
    display: none;
  }
}
body.screen--xs {
  .desktop {
    display: none;
  }
}
</style>
