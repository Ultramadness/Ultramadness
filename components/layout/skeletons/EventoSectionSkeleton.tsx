import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "../Container";

export const EventoSectionSkeleton = () => {
  return (
    <Container className="min-h-screen bg-black-gray flex flex-col items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4 mb-16 w-full max-w-2xl">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>

      <div className="flex flex-row items-center justify-center flex-wrap gap-8 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col space-y-4">
            <Skeleton className="w-72 h-96 xl:w-80 xl:h-[400px] rounded-xs" />
            <Skeleton className="w-full h-10 rounded-xs" />
          </div>
        ))}
      </div>
    </Container>
  );
};
