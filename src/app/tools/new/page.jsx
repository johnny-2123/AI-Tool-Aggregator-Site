import { getServerSession } from "next-auth/next";
import { authConfig } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import SubmitToolForm from "@/src/components/form/SubmitToolForm";
import { ScrollArea } from "@/src/components/ui/scroll-area";

const page = async () => {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    redirect("/sign-in");
  }
  return (
    <ScrollArea className="w-full h-full overflow-hidden">
      <SubmitToolForm session={session} />
    </ScrollArea>
  );
};

export default page;
