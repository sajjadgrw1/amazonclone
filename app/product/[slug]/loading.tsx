import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <Skeleton className="mb-4 h-5 w-64" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <Skeleton className="aspect-square w-full" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </div>
  );
}
