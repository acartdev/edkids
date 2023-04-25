<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="transparent">
      <q-toolbar class="bg-teal q-py-md z-max">
        <div class="row justify-end fit items-center">
          <div class="col-6 col-md-2">
            <div class="flex justify-around items-center">
              <p>
                {{ entityItem.gender ? "เด็กชาย" : "เด็กหญิง" }}
                {{ entityItem.first_name + " " + entityItem.last_name }} <br />
                เตรียมอนุบาลห้อง {{ entityItem.room }}
              </p>

              <q-avatar class="q-ml-xs" size="50px">
                <img :src="entityItem.image?.thumbnail" alt="" />
                <q-menu>
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
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="70"
      :breakpoint="900"
      elevated
      class="text-teal flex flex-column items-center justify-around"
      style="background-color: #1e293b"
    >
      <q-list class="">
        <q-item
          class="q-my-xl"
          v-for="items in linksList"
          :key="items"
          :to="items.link"
          ><q-icon size="30px" :name="items.icon"></q-icon>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container class="fit">
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
    <q-tabs v-model="tab" class="fixed-bottom bg-white" dense align="justify">
      <q-route-tab
        exact
        v-for="menu in linksList"
        :key="menu"
        :to="menu.link"
        class="text-teal"
        :name="menu.names"
        :icon="menu.icon"
        :label="menu.title"
      />
    </q-tabs>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { LocalStorage, useMeta, useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { StudentApi } from "src/api/StudentApi";
import { studentKey } from "src/boot/utils/config";
import { AuthenApi } from "src/api/AuthenApi";
import { useAuthenStore } from "src/stores/authen";
import MenuUserLink from "src/components/MenuUserLink.vue";
// import { biGear, biPencil } from "@quasar/extras/bootstrap-icons";
const route = useRouter();
const leftDrawerOpen = ref(false);
const id = localStorage.getItem(studentKey);
const studentId = ref(id);
const { getOne } = StudentApi();
const entityItem = ref({});
const { userLogout } = AuthenApi();
const $q = useQuasar();
const authenStore = useAuthenStore();

onMounted(() => {
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
    names: "home",
  },
  {
    title: "โพสต์",
    icon: "perm_media",
    link: "/post-list",
    color: "text-white",
    names: "post",
  },
  {
    title: "ความประพฤติ",
    icon: "self_improvement",
    link: "/conduct-list",
    color: "text-white",
    names: "conduct",
  },
  {
    title: "ครูผู้สอน",
    icon: "account_circle",
    link: "/teacher-info",
    color: "text-white",
    names: "teacher",
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

<style lang="scss">
* p {
  padding: 0;
  margin: 0;
}

body.screen--lg {
  .q-tabs {
    display: none;
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
