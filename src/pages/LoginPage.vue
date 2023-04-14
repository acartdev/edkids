<template>
  <div class="row justify-center items-center">
    <div class="col-sm-8 text-center">
      <q-img width="150px" src="../assets/logo_edkids.png"></q-img>
    </div>
  </div>
  <div class="row q-mt-sm justify-start q-pl-lg">
    <div class="col-sm-5">
      <q-tabs v-model="tab" indicator-color="white" class="text-teal">
        <q-tab class="q-px-sm" name="mails" label="นักเรียน" />
        <q-tab class="q-px-sm" name="alarms" label="คุณครู" />
      </q-tabs>
    </div>
  </div>

  <div class="row justify-center items-start">
    <div class="col-sm-12">
      <q-tab-panels class="transparent no-padding fit" v-model="tab" animated>
        <q-tab-panel name="mails">
          <div class="row fit justify-center">
            <div class="col-sm-11">
              <q-input dark color="white" label="รหัสนักศึกษา"></q-input>
            </div>
            <div class="col-sm-11">
              <q-input
                v-model="id"
                label="วัน/เดือน/ปี เกิด"
                mask="##/##/####"
                fill-mask
                color="white"
                dark
                class="text-h6"
                hint="หากวันเกิดหรือเดือนเกิดเป็นเลขเดียวให้เติมเลข '0'"
              />
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="alarms">
          <div class="row fit justify-center">
            <div class="col-sm-11">
              <q-input dark label="ชื่อผู้ใช้" color="white"></q-input>
            </div>
            <div class="col-sm-11">
              <q-input dark label="รหัสผ่าน" color="white"></q-input>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div class="col-sm-10 q-mt-md">
      <q-btn
        style="background-color: #60f4a0"
        class="fit text-blue-grey-14 text-weight-bold"
        label="เข้าสู่ระบบ"
      ></q-btn>
    </div>
  </div>
  <div class="row justify-center q-mt-md">
    <div class="col-sm-10 text-center text-white">
      <p>
        หากท่าพบปัญหาการใช้งานหรือต้องการสมัครการเข้าใช้งานสำหรับครูผู้ควบคุม
        โปรด
        <a href="https://line.me/ti/p/9MYGyI-W25" class="text-primary">
          คลิ๊ก</a
        >
        เพื่อติดต่อ
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const tab = ref("mails");
</script>

<style lang="scss" scoped></style>
