import { MAP_CENTER, MAP_ZOOM } from "@/constants/map";
import { useRestaurantContext } from "@/context/restaurant";
import type { LatLng } from "leaflet";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, } from 'react-leaflet';
import { ShowMeBtn } from "./ShowMeBtn";

export const RestaurantsMap = () => {
  const restaurants = useRestaurantContext(state => state.filteredRestaurants)
  const [position, setPosition] =  useState<LatLng | null>(null);

  const handleSetPosition = (position: LatLng) => {
    setPosition(position);
  };

  return (
    <section className="size-full">
      <MapContainer center={[MAP_CENTER.lat, MAP_CENTER.lng]} zoom={MAP_ZOOM} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          position && (
            <Marker position={position}>
              <Popup>You are here</Popup>
            </Marker>
          )
        }
        <ShowMeBtn handleSetPosition={handleSetPosition} />
        {
          restaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={[restaurant.address.location.lat, restaurant.address.location.lng]}
            >
              <Popup>
                <strong>{restaurant.name}</strong>
              </Popup>
            </Marker>
          ))
        }
      </MapContainer>
    </section>
  )
}