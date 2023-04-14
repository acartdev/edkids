<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-py-sm bg-white shadow-3">
      <q-toolbar>
        <q-btn
          style="color: #1e293b"
          class="text-h6"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-right"> </q-toolbar-title>

        <div class="flex items-center justify-end">
          <div class="text-right text-subtitle1 no-padding">
            <p class="no-margin" style="color: #1e293b">ครู ธนภัทร กองเงิน</p>
            <p
              style="color: #1e293b"
              class="no-margin text-subtitle2 text-weight-light"
            >
              เตรียมอนุบาล
            </p>
          </div>

          <div class="q-ml-sm">
            <q-avatar style="width: 60px; height: 60px">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
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
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :to="link.link"
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

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "หน้าแรก",
    icon: "home",
    link: "/admin/",
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
  {
    title: "ออกจากระบบ",
    color: "text-red",
    icon: "login",
    link: "/logout",
  },
];
function test() {
  console.log("asdas");
}

export default defineComponent({
  name: "MainLayout",

  components: {
    // eslint-disable-next-line vue/no-unused-components
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
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
