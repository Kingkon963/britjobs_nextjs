import * as React from "react";
import type { NextPage } from "next";
import Layout from "@components/Layout";
import defaultProfilePic from "src/assets/svg/defaultProfilePic";
import TextField from "@components/TextField";

const ProfilePage: NextPage = () => {
  return (
    <Layout>
      <div className="mt-10 w-full px-24">
        <div className="flex gap-10 border-b p-5">
          <div>
            <div className="w-48">{defaultProfilePic}</div>
            <button className="bg-base-300 btn btn-secondary mt-5 w-full">Change</button>
          </div>
          <div>
            <h2 className="text-3xl">Md. Naimul Islam Kingkon</h2>
            <TextField />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
