import Layout from "components/layouts/Layout";
import Auth from "middleware/auth";
import type { GetServerSideProps, NextPage } from "next";
import axios from "plugins/axios";
import redirect from "utility/redirect";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!Auth(ctx)) return redirect();

  try {
    const { data } = await axios.get(`/user`);
    return { props: data };
  } catch (e: any) {
    if (e.response?.data?.error === "Unauthenticated.") {
      return redirect();
    }
  }

  return { props: {} };
};

const Profile: NextPage = () => {
  return (
    <Layout>
      <div className="flex ">
        <h1 className="m-auto text-4xl">Profile</h1>
      </div>
    </Layout>
  );
};

export default Profile;
