<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-py-sm shadow-3" :class="bgColor">
      <q-toolbar>
        <q-btn
          style="color: #1e293b"
          class="text-h6"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-right"> </q-toolbar-title>

        <div class="flex items-center justify-end">
          <div class="text-right text-subtitle1 no-padding">
            <p class="no-margin" style="color: #1e293b">
              ครู {{ teacherData.first_name + " " + teacherData.last_name }}
            </p>
            <p
              style="color: #1e293b"
              class="no-margin text-subtitle2 text-weight-light"
            >
              {{ teacherData.position }} ห้อง {{ teacherData.room }}
            </p>
          </div>

          <div class="q-ml-sm">
            <q-avatar style="width: 60px; height: 60px">
              <img
                :src="teacherData.image?.thumbnail"
                style="object-fit: cover"
              />
            </q-avatar>
            <q-menu>
              <q-list>
                <q-item class="no-padding no-margin">
                  <q-item-section class="q-px-xs q-py-sm"
                    ><q-btn
                      dense=""
                      flat=""
                      label="แก้ไขข้อมูลครู"
                      :to="`/teacher`"
                      class="text-caption no-margin text-center"
                      icon-right="edit"
                      text-color="warning"
                    ></q-btn>
                    <q-btn
                      dense=""
                      flat=""
                      label="ออกจากระบบ"
                      @click="logOut()"
                      class="text-caption no-margin text-center"
                      icon-right="logout"
                      text-color="negative"
                    ></q-btn
                  ></q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      style="background: #1e293b"
    >
      <q-item-label class="q-pa-lg">
        <div class="logo flex items-center justify-center">
          <p class="q-px-md text-center text-h4 text-weight-bolder no-margin">
            T
          </p>
          <span class="text-h4 no-padding text-grey-4 q-ml-xs">eacher</span>
        </div>
      </q-item-label>
      <q-list class="q-px-lg">
        <EssentialLink
          v-for="items in linksList"
          :key="items.title"
          v-bind="items"
          :to="items.link"
        />
      </q-list>
    </q-drawer>

    <q-page-container class="fit">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref, onBeforeMount } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useQuasar, Notify, LocalStorage } from "quasar";
import { teacherKey } from "src/boot/utils/config";
import { AuthenApi } from "src/api/AuthenApi";
import { useAuthenStore } from "src/stores/authen";
import { teacherApi } from "src/api/Teacher";
import { alertShow } from "src/composable/alertShow";

const bgColor = ref("bg-white");
const { alertWarning } = alertShow();
const { getTeacher } = teacherApi();
const { userLogout, getUserDataByAuth } = AuthenApi();

const authenStore = useAuthenStore();
const $q = useQuasar();
const pageTop = ref();
onBeforeMount(() => {
  window.addEventListener("scroll", () => {
    pageTop.value = window.pag;
  });
});
const ontop = () => {
  if (window.pageXOffset < 0) {
    bgColor.value = "bg-green";
  } else {
    bgColor.value = "bg-red";
  }
};
const teacherData = ref({});
const leftDrawerOpen = ref(false);

const logOut = () => {
  $q.dialog({
    title: "ออกจากระบบ?",
    message: "คุณต้องการออกจากระบบหรือไม่?",
    cancel: true,
    persistent: true,
    ok: {
      color: "red",
    },
    cancel: {
      color: "warning",
    },
  })
    .onOk(() => {
      logoutProcess();
    })

    .onCancel(() => {
      alertWarning();
    });
};
onMounted(() => {
  getUserProcess();
});

const getUser = async () => {
  const response = await getTeacher(authenStore.auth);
  if (response) {
    for (let items of response.entity) {
      teacherData.value = items;
      LocalStorage.set(teacherKey, teacherData.value.room);
    }
  }
};

const getUserProcess = async () => {
  const response = await getUserDataByAuth();
  if (response && response.userData) {
    authenStore.setAuthen(response.userData);
  }
  getUser();
};

const logoutProcess = async () => {
  const response = await userLogout();

  if (response && response.status) {
    authenStore.logout();
    Notify.create({
      message: "ออกจากระบบสำเร็จ",
      color: "red",
    });

    setTimeout(() => {
      authenStore.logout();
      window.location.replace("/");
    }, 500);
  }
};

const linksList = ref([
  {
    title: "หน้าแรก",
    icon: "home",
    link: "/admin",
  },
  {
    title: "รายชื่อนักเรียน",
    icon: "receipt_long",
    link: "/list",
  },
  {
    title: "สมัครเรียน",
    icon: "group_add",
    link: "/register",
  },
  {
    title: "ความประพฤติ",
    icon: "timeline",
    link: "/point",
  },
  {
    title: "โพสต์",
    icon: "add_a_photo",
    link: "/post",
  },
  {
    title: "รายชื่อที่ถูกจัดเก็บ",
    icon: "person_off",
    link: "/history",
  },
]);
</script>
<style scoped>
* {
  font-family: en_default;
}
.logo p {
  border-radius: 10px;
  background: #60f4a0;
  color: #1e293b;
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
