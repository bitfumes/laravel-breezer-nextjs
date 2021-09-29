import Layout from "components/layouts/Layout";
import type { GetServerSideProps, NextPage } from "next";
import axios from "plugins/axios";
import redirect from "utility/redirect";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { user, expires, signature } = ctx.query;
    await axios.get(
      `/email/verify/${user}?expires=${expires}&signature=${signature}`
    );
    return redirect("/login");
  } catch (e: any) {}

  return { props: {} };
};

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex ">
        <h1 className="m-auto text-4xl">
          We are unable to verify your email, please try to login and resend
          verify email.
        </h1>
      </div>
    </Layout>
  );
};

export default Home;
