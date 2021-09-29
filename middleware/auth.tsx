import { setAuthHeader } from "plugins/axios";
import cookie from "next-cookies";

export default function Auth(ctx: any) {
  const cookies = cookie(ctx);
  const token = cookies["user-session"];

  if (token) {
    setAuthHeader(token);
    return true;
  }

  setAuthHeader(null);

  return false;
}
