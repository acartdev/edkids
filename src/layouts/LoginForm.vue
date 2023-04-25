<!-- eslint-disable vue/valid-template-root -->
<template>
  <q-layout>
    <q-page-container>
      <q-page class="window-height" style="background-color: #1e293b">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>

        <div class="row justify-center items-center fit">
          <div class="col-sm-3">
            <RouterView></RouterView>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup></script>

<style lang="scss" scoped>
.circle:nth-child(1) {
  position: absolute;
  right: 0;

  width: 300px;
  height: 300px;
  background: #60f4a0;
  clip-path: circle(50% at right 25% top 25%);
}
.circle:nth-child(2) {
  position: absolute;
  right: 10%;

  width: 250px;
  height: 250px;
  background: #60f4a0;
  clip-path: circle(50% at right 100px top 0);
}
.circle:nth-child(3) {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 350px;
  height: 350px;
  background: #60f4a0;
  clip-path: circle(50% at left 30% bottom 30%);
}
body.screen--xs {
  .circle:nth-child(3) {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 220px;
    height: 220px;
    background: #60f4a0;
    clip-path: circle(50% at left 30% bottom 30%);
  }
  .circle:nth-child(1) {
    position: absolute;
    right: 0;

    width: 200px;
    height: 200px;
    background: #60f4a0;
    clip-path: circle(50% at right 25% top 25%);
  }
  .circle:nth-child(2) {
    position: absolute;
    right: 10%;

    width: 180px;
    height: 120px;
    background: #60f4a0;
    clip-path: circle(50% at right 100px top 0);
  }
}
</style>
