import { Skeleton } from "@/components/ui/skeleton"
import { AdminHeader } from "@/components/admin/admin-header"

export default function OrdersLoading() {
  return (
    <div className="flex flex-col w-full">
      <AdminHeader title="Orders" description="View and manage customer orders" />

      <div className="p-4 md:p-6 space-y-6 w-full">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-36" />
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex gap-4 border-b pb-4">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>

            <div className="flex flex-wrap gap-2 justify-between">
              <Skeleton className="h-10 w-[250px]" />

              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-10 w-[150px]" />
                <Skeleton className="h-10 w-[150px]" />
                <Skeleton className="h-10 w-[150px]" />
                <Skeleton className="h-10 w-[100px]" />
                <Skeleton className="h-10 w-[150px]" />
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-3 px-4">
                      <Skeleton className="h-4 w-20" />
                    </th>
                    <th className="py-3 px-4">
                      <Skeleton className="h-4 w-16" />
                    </th>
                    <th className="py-3 px-4">
                      <Skeleton className="h-4 w-16" />
                    </th>
                    <th className="py-3 px-4">
                      <Skeleton className="h-4 w-24" />
                    </th>
                    <th className="py-3 px-4">
                      <Skeleton className="h-4 w-24" />
                    </th>
                    <th className="py-3 px-4">
                      <Skeleton className="h-4 w-16" />
                    </th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-4 px-4">
                          <Skeleton className="h-5 w-24" />
                        </td>
                        <td className="py-4 px-4">
                          <Skeleton className="h-5 w-16" />
                        </td>
                        <td className="py-4 px-4">
                          <Skeleton className="h-5 w-20" />
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Skeleton className="h-5 w-24" />
                        </td>
                        <td className="py-4 px-4">
                          <Skeleton className="h-5 w-16" />
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Skeleton className="h-5 w-5 ml-auto" />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
