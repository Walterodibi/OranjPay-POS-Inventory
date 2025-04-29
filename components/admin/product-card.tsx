import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: {
    id: string
    name: string
    category: string
    price: number
    stock: number
    image: string
    status: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square relative bg-white">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain p-3"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium truncate">{product.name}</h3>
          <Badge variant={product.status === "In Stock" ? "success" : "warning"}>{product.status}</Badge>
        </div>
        <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
        <div className="flex justify-between items-center">
          <div className="text-sm">Stock: {product.stock}</div>
          <div className="font-medium text-primary">₦{product.price.toLocaleString()}</div>
        </div>
      </CardContent>
    </Card>
  )
}
