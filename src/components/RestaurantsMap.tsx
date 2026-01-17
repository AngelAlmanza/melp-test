import { MAP_CENTER, MAP_ZOOM } from "@/constants/map";
import { useMapContext } from "@/context/map";
import { useRestaurantContext } from "@/context/restaurant";
import { Circle, MapContainer, Marker, Popup, TileLayer, } from 'react-leaflet';
import { MapUtilComponent } from "./MapUtilComponent";

export const RestaurantsMap = () => {
  const restaurants = useRestaurantContext(state => state.filteredRestaurants)
  const point = useMapContext(state => state.point)
  const radius = useMapContext(state => state.radius)

  return (
    <section className="size-full">
      <MapContainer center={[MAP_CENTER.lat, MAP_CENTER.lng]} zoom={MAP_ZOOM} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          point && (
            <>
              <Marker position={point}>
                <Popup>Location provided by user</Popup>
              </Marker>
              <Circle
                center={point}
                radius={radius}
                pathOptions={{
                  color: 'blue',
                  fillColor: 'blue',
                  fillOpacity: 0.2,
                }}
              />
            </>
          )
        }
        <MapUtilComponent />
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