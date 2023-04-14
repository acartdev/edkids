import Swal from "sweetalert2";

export const alertShow = () => {
  const alertWarning = async () => {
    return await Swal.fire({
      title: "ยกเลิก",
      text: "คุณได้ยกเลิกการทำรายการ",
      icon: "warning",
    });
  };
  const alertSuccess = async (title, text) => {
    return await Swal.fire({
      title: title,
      text: text,
      icon: "success",
    });
  };
  return { alertWarning, alertSuccess };
};
