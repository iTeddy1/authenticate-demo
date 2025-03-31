import type { Metadata } from "next";
import { GetInfo } from "./components/get-info/get-info";

export default function IndexPage() {
  return <GetInfo />;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
