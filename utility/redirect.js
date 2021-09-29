export default function redirect(path = "/") {
  return { redirect: { destination: path, permanent: true }, props: {} };
}
