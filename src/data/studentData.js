import { defineProps } from "vue";
export const resStudent = () => {
  const studentData = defineProps({
    img: {
      type: String,
      default: "src/assets/logo_edkids.png",
    },
    birth_date: {
      type: String,
      default: "asdasd",
    },
    nick_name: {
      type: String,
    },
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    id: {
      type: Number,
    },
    special: {
      type: String,
    },
    status: {
      type: Boolean,
    },
    gender: {
      type: Number,
    },
    room: {
      type: String,
    },
  });
  return { studentData };
};
