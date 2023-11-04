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
import Link from "next/link";

const ToolCard = ({ tool }) => {
  return (
    <Card className="w-1/3">
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
      <CardContent>
        <CardTitle className="font-xl mb-2">{tool.title}</CardTitle>
        <CardDescription>{tool.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p>{tool.pricing.toLowerCase()}</p>
        <a href={tool.url} target="_blank">
          <ExternalLink />
        </a>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
