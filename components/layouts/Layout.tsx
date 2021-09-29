import type { NextPage } from "next";
import Header from "components/layouts/Header";

const Layout: NextPage = ({ children }) => {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
};

export default Layout;
