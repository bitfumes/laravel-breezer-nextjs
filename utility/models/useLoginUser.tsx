import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import axios, { setAuthHeader } from "plugins/axios";
import flash from "plugins/flash";
import cookie from "js-cookie";
import useErrorField from "components/form/errorField";
import { useAppStore } from "store/app";

export default function useLoginUser() {
  const { asPath, push, query } = useRouter();
  const { setErrors, ShowError } = useErrorField();
  const [isVerified, setIsVerified] = useState(true);
  const { setLogin } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

  function performLogin(data: any) {
    if (isLoading) return;
    axios.defaults.withCredentials = true;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sanctum/csrf-cookie`)
      .then(() => {
        axios
          .post("/login", data)
          .then(({ data }: any) => handleLogin(data, "/"))
          .catch((e: any) => {
            if (e.response?.data?.errors?.verify) {
              setIsVerified(false);
              flash("error", e.response?.data?.errors?.verify);
            } else {
              flash("error", "There is some problem, try again.");
              setErrors(e.response.data.errors);
            }
          })
          .finally(() => setIsLoading(false));
      });
  }

  function handleLogin(data: any, path = asPath) {
    handleToken(data.access_token);
    setLogin({ user: data.user, isLoggedIn: true });
    flash("success", "You are logged In, Keep Learning");
    push(path);
  }

  function resendVerifyEmail() {
    axios
      .post(`/email/verify/resend`, { email: form.email })
      .then(() => {
        flash("success", "Verification Email sent, please check your Inbox");
      })
      .catch((e: any) => setErrors(e.response.data.errors));
  }

  function handleToken(access_token: string) {
    cookie.set("user-session", access_token, { expires: 1 });
    setAuthHeader(access_token);
  }

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function login(e: any) {
    e.preventDefault();
    performLogin(form);
  }

  function logout() {
    axios
      .post("/logout")
      .then(() => {
        cookie.remove("user-session");
        flash("success", "You are logged out.");
        window.location.href = "/";
      })
      .catch(() => flash("error", "There is some problem logging you out."));
  }

  function socialLoginVia(service: string) {
    axios
      .post(`social-login/${service}`)
      // .then(({ data }) => window.open(data, "_blank")?.focus())
      .then(({ data }) => (window.location.href = data))
      .catch((e: any) => {
        if (e.response?.data?.errors) {
          flash("error", e.response?.data?.errors.error);
        }
      });
  }

  function socialLogin() {
    const { service, code } = query;
    if (service) {
      axios
        .post(`social-login/${service}/callback`, { code })
        .then(({ data }) => handleLogin(data))
        .catch(() => flash("error", "There is some problem, try again"));
    }
  }

  function checkLogin() {
    const token = cookie.get("user-session");
    if (token) {
      setAuthHeader(token);
      axios
        .get("/user")
        .then(({ data }) => {
          setLogin({ user: data.data, isLoggedIn: true });
        })
        .catch(() => {
          cookie.remove("user-session");
          setLogin({ user: {}, isLoggedIn: false });
        });
    }
  }

  return {
    form,
    login,
    logout,
    ShowError,
    isVerified,
    checkLogin,
    handleInput,
    socialLogin,
    socialLoginVia,
    resendVerifyEmail,
  };
}
