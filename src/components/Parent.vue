<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <q-dialog v-model="pop.show" persistent>
    <q-card class="q-pa-sm" style="min-width: 700px">
      <q-card-section>
        <div class="text-h6">ข้อมูลผู้ปกครอง</div>
      </q-card-section>

      <q-card-section class="q-pt-none" style="height: 290px; width: 100%">
        <div class="row fit justify-between q-gutter-sm">
          <div class="col-sm-5 flex flex-center">
            <q-img
              style="
                object-fit: cover;
                object-position: center;
                max-height: 290px;
              "
              :src="parent.image.thumbnail"
            ></q-img>

            <!-- <div class="">
            </div> -->
          </div>
          <div class="col-sm-6">
            <div class="row items-center justify-between fit">
              <div class="col-sm-5">
                <q-input
                  v-model="parent.first_name"
                  dense
                  clearable
                  label="ชื่อจริง"
                  color="teal"
                />
              </div>
              <div class="col-sm-6">
                <q-input
                  v-model="parent.last_name"
                  dense
                  clearable
                  label="นามสกุล"
                  color="teal"
                />
              </div>
              <div class="col-sm-5">
                <q-input
                  v-model="parent.ocupation"
                  clearable
                  label="อาชีพ "
                  dense
                  color="teal"
                />
              </div>
              <div class="col-sm-6">
                <q-input
                  v-model="parent.phone"
                  clearable
                  label="เบอร์โทร"
                  dense
                  color="teal"
                />
              </div>
              <div class="col-sm-7">
                <q-input
                  v-model="parent.email"
                  clearable
                  label="Email:"
                  dense
                  color="teal"
                />
              </div>
              <div class="col-sm-4">
                <q-input
                  v-model="parent.zip_code"
                  clearable
                  label="รหัสไปรษณีย์"
                  dense
                  color="teal"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn color="negative" flat label="ยกเลิก" @click="$emit('close')" />
        <q-btn color="warning" flat label="แก้ไขข้อมูล" />
        <q-btn color="teal" flat label="ตกลง" @click="$emit('close')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { ParentApi } from "src/api/ParentApi";
const { getParentList } = ParentApi();
const pop = ref(res);
const data = ref([]);
const parent = ref({
  first_name: "",
  last_name: "",
  nick_name: "",
  birth_date: "",
  phone: "",
  zip_code: "",
  email: "",
  ocupation: "",
  img_file: "",
  image: {},
});
const listParent = async () => {
  const response = await getParentList(pop.value.id);
  if (response) {
    data.value = response.entity;
    data.value.forEach((items) => {
      parent.value = items;
    });
  }
};

const close = defineEmits("close");
const res = defineProps({
  show: {
    default: false,
    type: Boolean,
  },
  id: Number,
});
onMounted(() => {
  listParent();
});
</script>

<style lang="scss" scoped></style>
