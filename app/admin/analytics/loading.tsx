import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[150px]" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[150px]" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-[100px] w-full" />
        <Skeleton className="h-[100px] w-full" />
        <Skeleton className="h-[100px] w-full" />
        <Skeleton className="h-[100px] w-full" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center">
          <Skeleton className="h-10 w-[400px]" />
        </div>
        <Skeleton className="h-[500px] w-full" />
      </div>
    </div>
  )
}
