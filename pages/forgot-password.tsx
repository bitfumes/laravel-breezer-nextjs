import Layout from "components/layouts/Layout";
import type { NextPage } from "next";
import useForgotPassword from "utility/models/useForgotPassword";

const ForgotPassword: NextPage = () => {
  const { sendEmail, form, handleInput, ShowError } = useForgotPassword();

  return (
    <Layout>
      <div className="flex">
        <section className="w-full">
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-5/12 px-4 pt-32">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 font-bold">
                        Forgot Password
                      </h6>
                    </div>
                    <div className="flex-auto px-4 py-10 pt-0">
                      <form>
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                            placeholder="Email"
                            style={{ transition: "all 0.15s ease 0s" }}
                            onChange={handleInput}
                            value={form.email}
                          />
                          <ShowError name="email" />
                          <ShowError name="error" />
                        </div>
                        <div className="text-center mt-6">
                          <button
                            className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                            type="button"
                            style={{ transition: "all 0.15s ease 0s" }}
                            onClick={sendEmail}
                          >
                            Send Password Reset Email
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
