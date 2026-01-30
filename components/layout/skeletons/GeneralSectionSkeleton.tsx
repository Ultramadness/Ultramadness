import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "../Container";

export const GeneralSectionSkeleton = ({
  hasDescription = true,
  itemsCount = 3,
  itemClassName = "w-60 h-72",
}: {
  hasDescription?: boolean;
  itemsCount?: number;
  itemClassName?: string;
}) => {
  return (
    <Container className="py-16 md:py-24 flex flex-col items-center gap-16">
      <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
        <Skeleton className="h-12 w-3/4" />
        {hasDescription && <Skeleton className="h-6 w-1/2" />}
      </div>

      <div className="flex flex-row items-start justify-center flex-wrap gap-12 w-full">
        {Array.from({ length: itemsCount }).map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-4">
            <Skeleton className={itemClassName} />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-5 w-48" />
          </div>
        ))}
      </div>
    </Container>
  );
};
