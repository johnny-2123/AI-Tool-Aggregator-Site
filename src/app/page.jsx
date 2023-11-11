import { ScrollArea } from "@/src/components/ui/scroll-area";
import Image from "next/image";
import HomePageHeader from "@/src/components/Home Page/HomePageHeader";
import HomePageBody from "@/src/components/Home Page/HomePageBody";
import SearchBar from "@/src/components/search/SearchBar";
export default function Home() {
  return (
    <div className="w-11/12 py-0">
      <HomePageHeader />
      <SearchBar push={true} />
      <HomePageBody />
    </div>
  );
}
