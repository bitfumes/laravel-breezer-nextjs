import Layout from "components/layouts/Layout";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex ">
        <h1 className="m-auto text-4xl">Home</h1>
      </div>
    </Layout>
  );
};

export default Home;
