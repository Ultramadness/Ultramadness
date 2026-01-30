import { Skeleton } from "@/components/ui/skeleton";

export const HeroSectionSkeleton = () => {
  return (
    <section className="min-h-screen relative bg-black-gray/20">
      <div className="min-h-[80vh] flex flex-col justify-between pt-24 pb-8">
        <div className="flex flex-col gap-4 px-6 md:px-12 items-end">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="size-8 rounded-full" />
          ))}
        </div>

        <div className="px-6 md:px-12">
          <div className="w-full lg:w-[65%] 2xl:w-[55%] space-y-4">
            <Skeleton className="h-10 w-48 rounded-xs" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        </div>
      </div>
      <div className="h-14 w-full">
        <Skeleton className="h-full w-full" />
      </div>
    </section>
  );
};
