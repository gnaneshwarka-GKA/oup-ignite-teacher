import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SubjectCardProps {
  title: string;
  image: string;
  color: string;
  onClick: () => void;
}

const SubjectCard = ({ title, image, color, onClick }: SubjectCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        "border-2 hover:border-primary group overflow-hidden"
      )}
    >
      <CardContent className="p-6 flex flex-col items-center gap-4">
        <div
          className={cn(
            "w-24 h-24 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 overflow-hidden",
            color
          )}
        >
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold text-foreground text-center">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">Click to open</p>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
