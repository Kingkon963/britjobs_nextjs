import { useEffect, useState, useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@components/Layout";
import { useLazyQuery } from "@apollo/client";
import GetContactDetail from "@graphQL/queries/GetContactDetail.gql";
import { GetContactDetailQuery } from "@graphQL/graphql-operations";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Dashboard: NextPage = () => {
  const [profileIsIncomplete, setProfileIsIncomplete] = useState(false);
  const session = useSession();
  const router = useRouter();
  const [runGetContactDetails, { loading, error, data }] =
    useLazyQuery<GetContactDetailQuery>(GetContactDetail);

  useEffect(() => {
    if (session.data) {
      runGetContactDetails({
        variables: {
          userID: session.data.id,
        },
      });
    } else {
      // router.push("/");
    }
  }, [router, runGetContactDetails, session.data]);

  useEffect(() => {
    console.log(data);
    if (data?.contactDetail?.data) {
      setProfileIsIncomplete(false);
    } else {
      if (data !== undefined) setProfileIsIncomplete(true);
    }
  }, [data, loading]);

  return (
    <div>
      <Head>
        <title>Britjobs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        {profileIsIncomplete && (
          <div
            className="bg-info text-base-200 sticky top-0 z-50 flex items-center 
        justify-center gap-5 py-2 font-bold tracking-wider"
          >
            <span>Your profile is incomplete!</span>
            <Link passHref href="/auth/completeProfile">
              <button className="btn btn-primary btn-sm">Complete Profile</button>
            </Link>
          </div>
        )}
        <Layout>
          <div className="py-10">
            <div className="flex flex-col items-start justify-center">
              {/* {authState.isLogedin && authState.userInfo?.username && (
                <h1 className="text-6xl">Welcome, {authState.userInfo?.username}!</h1>
              )} */}
            </div>
          </div>
        </Layout>
      </>
    </div>
  );
};

export default Dashboard;
