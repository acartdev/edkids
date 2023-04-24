<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="transparent">
      <q-btn
        class="text-weight-bold text-h6"
        color="blue-grey-10"
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="leftDrawerOpen = !leftDrawerOpen"
      />
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <div class="flex justify-center q-pt-md column items-center">
          <q-img
            :src="entityItem.image?.thumbnail"
            width="150px"
            height="150px"
            style="border-radius: 50%"
          />
          <p class="text-h6 q-pt-md no-margin text-green-12">
            น้อง {{ entityItem.nick_name }}
          </p>
          <p class="no-margin text-white">
            เตรียมอนุบาล ห้อง {{ entityItem.room }}
          </p>
        </div>
        <div class="q-pt-xl q-px-lg">
          <!-- <essential-link v-for="i in linksList" :key="i" v-bind="i" /> -->
          <menu-user-link v-for="i in linksList" :key="i" v-bind="i" />

          <!-- logout -->

          <q-item
            clickable
            @click="logoutConfirm"
            style="font-size: 23px; border-bottom: 2px solid #42d293"
          >
            <q-item-section>
              <q-item-label class="text-right text-red"
                >ออกจากระบบ</q-item-label
              >
            </q-item-section>
            <q-item-section avatar>
              <q-icon class="text-red" name="logout" />
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container class="fit">
      <div class="circle"></div>

      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import MenuUserLink from "components/MenuUserLink.vue";
import { defineComponent, ref, onMounted } from "vue";
import { LocalStorage, useMeta, useQuasar } from "quasar";
import { useRoute } from "vue-router";

import { StudentApi } from "src/api/StudentApi";
import { studentKey } from "src/boot/utils/config";
import { AuthenApi } from "src/api/AuthenApi";
import { useAuthenStore } from "src/stores/authen";

// import { biGear, biPencil } from "@quasar/extras/bootstrap-icons";

const route = useRoute();
const leftDrawerOpen = ref(false);
const id = localStorage.getItem(studentKey);
const studentId = ref(id);
const { getOne } = StudentApi();
const entityItem = ref({});

const { userLogout } = AuthenApi();
const $q = useQuasar();
const authenStore = useAuthenStore();

onMounted(() => {
  if (route.params.studentId) {
    studentId.value = route.params.studentId;
  }
  fetchData();
});

const fetchData = async () => {
  const respone = await getOne(studentId.value);
  if (respone) {
    respone.entity.forEach((element) => {
      entityItem.value = element;
    });
    // entityItem.value = respone;
  }
};
const linksList = [
  {
    title: "หน้าหลัก",
    icon: "home",
    link: "/homePage/",
    color: "text-white",
  },
  {
    title: "โพสต์",
    icon: "perm_media",
    link: "/postList",
    color: "text-white",
  },
  {
    title: "ความประพฤติ",
    icon: "self_improvement",
    link: "/conductList",
    color: "text-white",
  },
  {
    title: "ครูผู้สอน",
    icon: "account_circle",
    link: "/teacherInfo",
    color: "text-white",
  },
  // {
  //   title: "ออกจากระบบ",
  //   icon: "logout",
  //   link: "/",
  //   color: "text-red",
  // },
];
const logoutConfirm = async () => {
  $q.dialog({
    title: "EDKids",
    message: "ยืนยันการออกจากระบบ",
    cancel: true,
    ok: {
      label: "ตกลง",
      flat: true,
      outline: true,
      color: "positive",
    },
    cancel: {
      label: "ยกเลิก",
      flat: true,
      color: "negative",
    },
  })
    .onOk(() => {
      console.log("OK");
      logoutProcess();
    })
    .onCancel(() => {
      console.log("Cancel");
    });
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

<style>
.circle {
  width: 350px;
  height: 350px;
  background: #60f4a0;
  clip-path: circle(50% at right 25% top 25%);
  position: absolute;
  right: 0;
  top: -10px;
}
.q-layout {
  background: #e5e5e5;
}
.q-drawer {
  background: #1e293b;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}

.slide-fade-enter-active {
  transition: all 0.8s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
