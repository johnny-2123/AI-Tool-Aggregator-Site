import { ScrollArea } from "@/src/components/ui/scroll-area";
import Image from "next/image";
import HomePageHeader from "@/src/components/Home Page/HomePageHeader";
import HomePageBody from "@/src/components/Home Page/HomePageBody";

export default function Home() {
  return (
    <ScrollArea className="outline-double w-full px-4 py-4">
      <HomePageHeader />
      <HomePageBody />
    </ScrollArea>
  );
}
