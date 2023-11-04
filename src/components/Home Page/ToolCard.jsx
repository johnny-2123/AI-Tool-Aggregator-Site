import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/src/components/ui/aspect-ratio";
import { ExternalLink } from "lucide-react";

const ToolCard = ({ tool }) => {
  return (
    <Card className="w-[30%] md:w-[45%] sm:w-[100%] xs:w-[100%] m-2 flex flex-col">
      <CardHeader className="w-full px-0 pt-0">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={tool.imageUrl}
            alt={`image for ${tool.title}`}
            layout="fill"
            objectFit="cover"
            className="rounded-t"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <CardTitle className="font-xl mb-2">{tool.title}</CardTitle>
        <CardDescription>{tool.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="overflow-hidden">{tool.pricing.toLowerCase()}</p>
        <a href={tool.url} target="_blank">
          <ExternalLink />
        </a>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
