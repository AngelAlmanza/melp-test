import type { Restaurant } from "@/interfaces/restaurants"
import { Globe, Mail, MapPin, Phone, Star } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type Props = {
  restaurant: Restaurant
}

export const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <Card>
      <CardHeader>
        <div className="size-full relative">
          <img src="/images/placeholder.png" className="w-full h-32 rounded object-cover" />
          <Badge variant="secondary" className="absolute top-2 right-2 bg-yellow-300 text-gray-800 text-xl">
            {restaurant.rating}
            <Star className="ml-1" />
          </Badge>
        </div>
        <CardTitle>{restaurant.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <article>
          <section className="flex gap-1 w-full text-base">
            <span className="inline-block py-1">
              <MapPin size={20} />
            </span>
            <p className="wrap-break-word">
              {restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state}
            </p>
          </section>
          <section className="w-full">
            <div className="flex gap-2">
              <span className="inline-block py-1">
                <Phone />
              </span>
              <p className="wrap-break-word truncate">
                {restaurant.contact.phone}
              </p>
            </div>
            <div className="flex gap-2">
              <span className="inline-block py-1">
                <Mail />
              </span>
              <a
                href={`mailto:${restaurant.contact.email}`}
                className="wrap-break-word truncate text-black hover:underline hover:text-blue-600"
              >
                {restaurant.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block py-1">
                <Globe />
              </span>
              <a
                href={restaurant.contact.site}
                className="wrap-break-word truncate text-black hover:underline hover:text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {restaurant.contact.site}
              </a>
            </div>
          </section>
        </article>
      </CardContent>
    </Card>
  )
}