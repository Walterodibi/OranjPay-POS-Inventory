import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[150px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-[300px]" />
          <Skeleton className="h-10 w-[200px]" />
        </div>
        <Skeleton className="h-[500px] w-full" />
      </div>
    </div>
  )
}
