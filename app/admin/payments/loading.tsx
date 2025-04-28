import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-10 w-[180px]" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center">
          <Skeleton className="h-10 w-[400px]" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-[250px] w-full" />
          <Skeleton className="h-[250px] w-full" />
          <Skeleton className="h-[250px] w-full" />
          <Skeleton className="h-[250px] w-full" />
          <Skeleton className="h-[250px] w-full" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  )
}
