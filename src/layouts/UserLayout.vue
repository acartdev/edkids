<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="transparent">
      <q-toolbar class="bg-teal q-py-md z-max shadow-20">
        <div class="row justifyt-center fit items-center gt-xs">
          <div class="col-sm-9">
            <q-breadcrumbs active-color="white">
              <q-breadcrumbs-el label="หน้าหลัก" icon="home" to="/user" />
              <q-breadcrumbs-el
                label="รายงานกิจกรรม"
                to="/post-list"
                icon="perm_media"
              />
              <q-breadcrumbs-el
                label="คะแนนความประพฤติ"
                icon="self_improvement"
                to="/conduct-list"
              />
              <q-breadcrumbs-el
                label="ข้อมูลครู"
                icon="account_circle"
                to="/teacher-info"
              />
            </q-breadcrumbs>
          </div>
        </div>
        <div class="row justify-end fit items-center">
          <div class="col-7 col-sm-5">
            <div class="flex justify-around items-center">
              <p>
                {{ entityItem.gender ? "เด็กชาย" : "เด็กหญิง" }}
                {{ entityItem.first_name + " " + entityItem.last_name }} <br />
                เตรียมอนุบาลห้อง {{ entityItem.room }}
              </p>

              <q-avatar class="q-ml-xs" size="50px">
                <img :src="entityItem.image?.thumbnail" alt="" />
                <q-menu fit>
                  <q-list>
                    <q-item class="no-padding no-margin">
                      <q-item-section class="q-px-xs q-py-sm">
                        <q-btn
                          dense=""
                          flat=""
                          label="ออกจากระบบ"
                          @click="logoutProcess()"
                          class="text-caption no-margin text-center"
                          icon-right="logout"
                          text-color="negative"
                        ></q-btn
                      ></q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-avatar>
            </div>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="fit">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
    <q-tabs class="fixed-bottom bg-white shadow-20 gt-xl" dense align="justify">
      <q-route-tab
        to="/user"
        exact
        class="text-teal"
        icon="home"
        label="หน้าหลัก"
      />
      <q-route-tab
        to="/conduct-list"
        exact=""
        class="text-teal"
        icon="self_improvement"
        label="ความประพฤติ"
      />
      <q-route-tab
        exact
        to="/post-list"
        class="text-teal"
        icon="perm_media"
        label="รายงานกิจกรรม"
      />
      <q-route-tab
        exact
        to="/teacher-info"
        class="text-teal"
        icon="account_circle"
        label="ข้อมูลครู"
      />
    </q-tabs>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { LocalStorage, useMeta, useQuasar } from "quasar";
import { StudentApi } from "src/api/StudentApi";
import { studentKey } from "src/boot/utils/config";
import { AuthenApi } from "src/api/AuthenApi";
import { useAuthenStore } from "src/stores/authen";

const leftDrawerOpen = ref(false);
const id = localStorage.getItem(studentKey);
const studentId = ref(id);
const { getOne } = StudentApi();
const entityItem = ref({});
const { userLogout } = AuthenApi();
const authenStore = useAuthenStore();
onMounted(async () => {
  await fetchData();
  authenStore.setUserId(entityItem.value.teacher_id);
});

const fetchData = async () => {
  const respone = await getOne(studentId.value);
  if (respone) {
    respone.entity.forEach((element) => {
      entityItem.value = element;
    });
  }
};

const logoutProcess = async () => {
  const response = await userLogout();
  console.log("userLogout", response);
  if (response && response.status) {
    //clear aut key on localStorage
    authenStore.logout();
    LocalStorage.clear();
    // $q.notify({
    //   message: response.message,
    // });

    //redirect to login page
    setTimeout(() => {
      authenStore.logout();
      window.location.replace("/");
    }, 500);
  }
};
</script>

<style lang="scss">
* p {
  padding: 0;
  margin: 0;
}

body.screen--md {
  .q-tabs {
    display: none;
  }
  .q-toolbar {
    padding: 1rem 1rem;
  }
}
.q-layout {
  background: #f5f5f5;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translatex(-40px);
  opacity: 0.5;
}
</style>
