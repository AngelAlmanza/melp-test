import { useMapContext } from "@/context/map";
import { useRestaurantContext } from "@/context/restaurant";
import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";

export const MapUtilComponent = () => {
  const setPoint = useMapContext(state => state.setPoint);
  const setRestaurantsWithinRadio = useMapContext(state => state.setRestaurantsWithinRadio);
  const point = useMapContext(state => state.point);
  const restaurants = useRestaurantContext(state => state.filteredRestaurants)
  const selectedRestaurantId = useRestaurantContext(state => state.selectedRestaurant)
  const radius = useMapContext(state => state.radius)

  const map = useMapEvents({
    click(e) {
      setPoint(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (!point) {
      setRestaurantsWithinRadio([]);
      return;
    }

    const nearbyRestaurants = restaurants.filter(restaurant => {
      const distance = map.distance(point, [
        restaurant.address.location.lat,
        restaurant.address.location.lng
      ]);
      return distance <= radius;
    });

    setRestaurantsWithinRadio(nearbyRestaurants);

  }, [point, radius, map, restaurants, setRestaurantsWithinRadio]);

  useEffect(() => {
    if (selectedRestaurantId) {
      const restaurant = restaurants.find(r => r.id === selectedRestaurantId);
      if (restaurant) {
        map.flyTo([
          restaurant.address.location.lat,
          restaurant.address.location.lng
        ], 18);
      }
    }
  }, [selectedRestaurantId, restaurants, map]);

  return null
}