<template>
  <q-page class="">
    <div class="row fit justify-center items-center">
      <!-- white background start -->
      <div
        style="height: 620px; border-radius: 16px"
        class="col-sm-11 bg-white q-pa-md"
      >
        <!-- white background end -->

        <!-- student card start -->
        <div class="row items-center justify-center fit q-pb-lg q-mx-sm">
          <q-spinner
            v-if="loading == true"
            color="secondary"
            class="absolute-center"
            size="3em"
          />
          <div class="col-sm-6">
            <div class="row justify-center">
              <div
                class="col-sm-8 bg-green-12 q-pt-md shadow-16"
                style="border-radius: 25px; overflow: hidden"
              >
                <div class="flex flex-center column">
                  <q-img
                    :src="entityItem.image?.thumbnail"
                    width="150px"
                    height="150px"
                    style="border-radius: 50%"
                    class="shadow-10"
                  ></q-img>

                  <div
                    class="q-py-xl bg-grey-2 fit q-px-md q-py-lg q-mt-lg relative-position"
                  >
                    <p
                      style="
                        border-radius: 6px;
                        top: -16px;
                        width: 250px;
                        font-size: 1.2rem;
                      "
                      class="absolute text-center q-pa-xs text-green-12 shadow-3 absolute-center bg-blue-grey-10 q-mt-md"
                    >
                      น้อง {{ entityItem.nick_name }}
                    </p>
                    <ul
                      class="q-pa-xs no-margin"
                      style="list-style-type: none; font-size: 18px"
                    >
                      <li>
                        <b> ชื่อ-นามสกุล : </b>
                        {{ entityItem.gender ? "เด็กชาย" : "เด็กหญิง" }}&nbsp;
                        {{
                          entityItem.first_name + "  " + entityItem.last_name
                        }}
                      </li>
                      <li><b> โรงเรียน : </b> &nbsp; วัดโนนศรีสะอาด</li>
                      <li>
                        <b> ห้อง : </b> &nbsp; {{ teacherEntityItem?.room }}
                      </li>
                      <li>
                        <b> รหัสนักเรียน : </b> &nbsp;{{ entityItem.special }}
                      </li>
                      <li>
                        <b> วัน/เดือน/ปี เกิด : </b> &nbsp;{{
                          // entityItem.birth_date
                          birthDay + " / " + birthMonth + " / " + birthYear
                        }}
                      </li>
                      <li>
                        <b> อายุ : </b> &nbsp;
                        <!-- {{ age[0] }} ขวบ -->
                        {{
                          yearAge +
                          " ปี " +
                          monthAge +
                          " เดือน " +
                          dayAge[0] +
                          " วัน "
                        }}
                      </li>
                      <li>
                        <b> ครูผู้สอน : </b> &nbsp;{{
                          teacherEntityItem?.first_name +
                          " " +
                          teacherEntityItem?.last_name
                        }}
                      </li>
                      <!-- <li>{{ today }}</li> -->
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- student card end -->

          <!-- <div class="col"></div> -->

          <!-- section right start -->
          <div class="col-sm-6 self-stretch">
            <div class="row q-py-lg q-pr-md fit">
              <!-- pie chart start -->

              <div class="col-sm-12 shadow-13" style="border-radius: 16px">
                <div class="row justify-center items-center">
                  <div class="col-sm-12">
                    <chartConduct :point="conductEntityItem" />
                    <div
                      v-if="
                        conductEntityItem[0] == 0 &&
                        conductEntityItem[1] == 0 &&
                        conductEntityItem[2] == 0
                      "
                      class="text-secondary text-center text-h6"
                    >
                      ไม่มีข้อมูลคะแนนความประพฤติในขณะนี้
                    </div>
                  </div>
                </div>
              </div>
              <!-- pie chart end -->

              <!-- parent card start -->
              <div class="col-sm-12 self-end">
                <div
                  class="shadow-10 q-pa-md row items-center"
                  style="border-radius: 16px"
                >
                  <q-img
                    :src="parentEntityItem.image?.thumbnail"
                    width="100px"
                    height="100px"
                    style="border-radius: 50%"
                  ></q-img>
                  <div class="q-pl-md" style="height: 100%; font-size: 16px">
                    <ul style="list-style-type: none" class="no-padding">
                      <li>
                        ชื่อ-นามสกุล :
                        {{
                          parentEntityItem.first_name +
                          " " +
                          parentEntityItem.last_name
                        }}
                      </li>
                      <li>ชื่อเล่น : {{ parentEntityItem.nick_name }}</li>
                      <li>เบอร์โทรศัพท์ : {{ parentEntityItem.phone }}</li>
                      <li>E-Mail : {{ parentEntityItem.email }}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- parent card end -->
            </div>
          </div>
        </div>
      </div>

      <!-- section right end -->
    </div>
  </q-page>
</template>

<script setup>
import {
  ref,
  defineComponent,
  defineAsyncComponent, //chart
  onMounted,
  onUnmounted,
  watch,
} from "vue";

import { StudentApi } from "src/api/StudentApi";
import { useRoute } from "vue-router";
import { ParentsApi } from "src/api/ParentsApi";
import { ConductApi } from "src/api/ConductApi";
import { TeacherApi } from "src/api/TeacherApi";
import { studentKey, teacherKey } from "src/boot/utils/config";

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

const id = localStorage.getItem(studentKey);
const teacherId = localStorage.getItem(teacherKey);
const studentId = ref(id);
const parentEntityItem = ref({});
const entityItem = ref({});
const loading = ref(false);
const conductEntityItem = ref([]);
const teacherEntityItem = ref();

const fetchData = async () => {
  loading.value = true;

  const respone = await getOne(studentId.value);
  const teacherResponse = await getOneTeacher(teacherId);
  const parentsResponse = await getParentsStudentInfo(studentId.value);
  const conductResponse = await getConductAverage(studentId.value);

  loading.value = false;

  if (conductResponse) {
    conductResponse.entity.forEach((element) => {
      conductEntityItem.value.push(Number(element.very_good));
      conductEntityItem.value.push(Number(element.good));
      conductEntityItem.value.push(Number(element.bad));
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
  import("../components/Charts/ConductChart.vue")
);

onMounted(() => {
  if (route.params.studentId) {
    studentId.value = route.params.studentId;
  }

  fetchData();
});
</script>
<style></style>
