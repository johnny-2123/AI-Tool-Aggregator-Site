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

const ToolCard = ({ tool }) => {
  return (
    <Card className="w-1/3">
      <CardHeader className="w-full px-0 pt-0">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={tool.imageUrl}
            alt={`image for ${tool.title}`}
            width={500}
            height={500}
            className="rounded-t"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent>
        <CardTitle className="font-xl">{tool.title}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
