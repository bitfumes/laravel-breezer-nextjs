import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import axios from "plugins/axios";
import flash from "plugins/flash";
import useErrorField from "components/form/errorField";

export default function useRegisterUser() {
  const router = useRouter();
  const { setErrors, ShowError } = useErrorField();
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  });

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function register(e: any) {
    e.preventDefault();
    axios
      .post("register", form)
      .then(() => {
        flash("success", "Please verify your email.");
        router.push("/login");
      })
      .catch((e) => setErrors(e.response.data.errors));
  }

  return {
    register,
    form,
    handleInput,
    ShowError,
  };
}
