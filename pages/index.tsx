import { useEffect, useState, useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Layout from "@components/Layout";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import getContactDetails from "api/getContactDetails";
import { useQuery } from "react-query";

const LandingPage: NextPage = () => {
  const { data: session } = useSession();
  const query = useQuery("getContactDetails", getContactDetails);
  const renderCounter = useRef(0);

  renderCounter.current = renderCounter.current + 1;
  console.log("renderCounter", renderCounter.current);

  useEffect(() => {
    //console.log(query.data?.data.data);
  }, [query]);

  return (
    <div>
      <Head>
        <title>Britjobs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex items-center p-5 px-16">
        <h1 className="text-5xl">Britjobs</h1>
        <div className="ml-auto flex gap-2">
          {!session && (
            <>
              <button className="btn">Hire</button>
              <Link href={"/auth/login"} passHref>
                <button className="btn">Login</button>
              </Link>
              <Link href={"/auth/register"} passHref>
                <button className="btn">Register</button>
              </Link>
            </>
          )}
          {session && (
            <>
              <p>{session.user?.email}</p>
              <p className="link" onClick={() => signOut()}>
                signout?
              </p>
            </>
          )}
        </div>
      </header>
      <main>
        <div className="flex h-[75vh] flex-col items-center justify-center gap-5 border">
          <div className="w-[50vw]">
            <h1 className="mb-5 text-5xl">Find a Job Today</h1>
            <div className="flex justify-center gap-5 rounded-2xl bg-slate-200 p-5">
              <input type="text" className="input  w-full" placeholder="Position" />
              <input type="text" className="input  w-full" placeholder="City" />
              <button className="btn btn-primary">Search</button>
            </div>
          </div>
        </div>
      </main>

      <div className="p-16">
        <h1 className="text-5xl">Trending Jobs</h1>
        <div className="primary-content divider h-2"></div>
        <div className="flex gap-5">
          <div className="card relative shadow-md">
            <figure className="relative">
              <Image
                src="https://api.lorem.space/image/shoes?w=400&h=225"
                alt="Shoes"
                width={400}
                height={225}
              />
              <div className="from-base-200 absolute bottom-0 h-fit w-full bg-gradient-to-t  to-transparent px-7">
                <h2 className="card-title py-2 text-2xl">Shoe store management</h2>
              </div>
            </figure>
            <div className="card-body bg-base-200">
              <div className="card-text text-base">
                <div className="flex justify-between">
                  <div>
                    <div>£10.85 - £12.00 per hour</div>
                    <div>Full-time, Permanent</div>
                    <div>Stonebridge Ltd.</div>
                  </div>
                  <span>Dhanmondi, Dhaka</span>
                </div>
              </div>
              {/* <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
