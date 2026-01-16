import { ENVIRONMENT } from "@/constants/environment"
import type { Restaurant } from "@/interfaces/restaurants"
import { Globe, Mail, MapPin, Phone, Share2, Star } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type Props = {
  restaurant: Restaurant
}

export const RestaurantCard = ({ restaurant }: Props) => {
  const handleClickShare = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(restaurant.contact.site)}`
    window.open(shareUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <Card>
      <CardHeader>
        <div className="size-full relative">
          <img src={`${ENVIRONMENT.BASE_URL}images/placeholder.png`} className="w-full h-32 rounded object-cover hidden lg:block" />
          <div className="absolute -top-8 -right-8 lg:top-2 lg:right-2 flex items-center gap-x-4">
            <Badge variant="secondary" className="bg-yellow-300 text-gray-800 text-xl">
              {restaurant.rating.toFixed(1)}
              <Star className="ml-1" />
            </Badge>
            <Badge asChild>
              <Button variant="link" className="bg-blue-600 text-white text-xl cursor-pointer" onClick={handleClickShare}>
                <Share2 />
              </Button>
            </Badge>
          </div>
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