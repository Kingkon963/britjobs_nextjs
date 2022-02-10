import { useEffect, useState, useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@components/Layout";
import { AuthContext } from "src/contexts/AuthContext";

const Home: NextPage = () => {
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
            <h1>Home Page</h1>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
