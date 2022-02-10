import { useEffect, useState, useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@components/Layout";
import { AuthContext } from "src/contexts/AuthContext";

const Dashboard: NextPage = () => {
  const [username, setUsername] = useState("");
  const { state: authState } = useContext(AuthContext);

  useEffect(() => {
    if (authState) {
      if (authState.isLogedin) {
        const name = authState.userInfo?.username;
        if (name) setUsername(name);
      } else setUsername("");
    }
  }, [authState]);

  return (
    <div>
      <Head>
        <title>Britjobs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="py-10">
          <div className="flex flex-col justify-center items-start">
            {username.length > 0 && <h1 className="text-6xl">Welcome, {username}!</h1>}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;