import cookie from "next-cookies";

export default function Guest(ctx: any) {
  const cookies = cookie(ctx);
  const token = cookies["user-session"];
  return !token;
}
