import Layout from "components/layouts/Layout";
import Guest from "middleware/guest";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useLoginUser from "utility/models/useLoginUser";
import redirect from "utility/redirect";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!Guest(ctx)) return redirect();
  return { props: {} };
};

const Callback: NextPage = () => {
  const { socialLogin } = useLoginUser();

  useEffect(() => {
    socialLogin();
  }, []);

  return (
    <Layout>
      <div className="flex ">
        <h1 className="m-auto text-4xl">Getting things ready for you...</h1>
      </div>
    </Layout>
  );
};

export default Callback;
