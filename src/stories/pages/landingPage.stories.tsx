import LandingPage from "../../../pages/index";
import { Meta } from "@storybook/react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

export default {
  title: "Pages/LandingPage",
  component: LandingPage,
} as Meta;

export const Default = () => (
  <SessionProvider>
    <QueryClientProvider client={client}>
      <LandingPage />
    </QueryClientProvider>
  </SessionProvider>
);
