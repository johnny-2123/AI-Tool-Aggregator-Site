import { getServerSession } from "next-auth/next";
import { authConfig } from "@/src/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authConfig);

  return <div className="w-full"></div>;
};

export default page;
