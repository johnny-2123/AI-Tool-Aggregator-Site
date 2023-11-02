import { getServerSession } from "next-auth/next";
import { authConfig } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import SubmitToolForm from "@/src/components/form/SubmitToolForm";

const page = async () => {
  const session = await getServerSession(authConfig);

  return (
    <div className="w-full mx-auto p-10 rounded-md outline-accent">
      <SubmitToolForm />
    </div>
  );
};

export default page;
