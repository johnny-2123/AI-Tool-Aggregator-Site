import { getServerSession } from "next-auth/next";
import { authConfig } from "@/src/lib/auth";
import SignInForm from "@/src/components/form/SignInForm";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authConfig);

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full">
      <SignInForm />
    </div>
  );
};

export default page;
