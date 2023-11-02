import { getServerSession } from "next-auth/next";
import { authConfig } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { toast } from "@/src/components/ui/use-toast";
import SubmitToolForm from "@/src/components/form/SubmitToolForm";
import { ScrollArea } from "@/src/components/ui/scroll-area";

const page = async () => {
  const session = await getServerSession(authConfig);

  return (
    <ScrollArea className="w-full h-full overflow-hidden">
      <SubmitToolForm session={session} />
    </ScrollArea>
  );
};

export default page;
