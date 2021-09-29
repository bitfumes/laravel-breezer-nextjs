import { ChangeEvent, useState } from "react";
import axios from "plugins/axios";
import flash from "plugins/flash";
import useErrorField from "components/form/errorField";

export default function useForgotPassword() {
  const { setErrors, ShowError } = useErrorField();
  const [form, setForm] = useState({ email: "" });

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function sendEmail(e: any) {
    e.preventDefault();
    axios
      .post("forgot-password", form)
      .then(({ data }) => {
        flash("success", data.message);
        setForm({ email: "" });
      })
      .catch((e) => setErrors(e.response.data.errors));
  }

  return {
    sendEmail,
    form,
    handleInput,
    ShowError,
  };
}
