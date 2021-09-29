import { ChangeEvent, useState } from "react";
import axios from "plugins/axios";
import flash from "plugins/flash";
import useErrorField from "components/form/errorField";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";

export default function usePasswordReset() {
  const router = useRouter();

  const { setErrors, ShowError } = useErrorField();
  const [form, setForm] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function reset(e: any) {
    e.preventDefault();
    axios
      .post("/password/reset", { ...form, token: router.query?.token })
      .then(({ data }) => {
        flash("success", data.message);
        router.push("/login");
      })
      .catch((e) => setErrors(e.response.data.errors));
  }

  return {
    reset,
    form,
    handleInput,
    ShowError,
  };
}
