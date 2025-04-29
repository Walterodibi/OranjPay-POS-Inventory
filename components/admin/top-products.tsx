import Image from "next/image"
import { products } from "@/lib/mock-data"

// Get top 5 products by price (just for demo purposes)
const topProducts = products.sort((a, b) => b.price - a.price).slice(0, 5)

export function TopProducts() {
  return (
    <div className="space-y-4">
      {topProducts.map((product) => (
        <div key={product.id} className="flex items-center gap-3">
          <div className="h-10 w-10 relative rounded-md overflow-hidden bg-white">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-1"
              sizes="40px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.category}</p>
          </div>
          <div className="text-sm font-medium">₦{product.price.toLocaleString()}</div>
        </div>
      ))}
    </div>
  )
}
