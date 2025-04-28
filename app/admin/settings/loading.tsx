import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-[120px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-10 w-[500px]" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    </div>
  )
}
