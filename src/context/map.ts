import type { Restaurant } from "@/interfaces/restaurants";
import type { LatLng } from "leaflet";
import { create } from "zustand";

interface MapState {
  point: LatLng | null;
  setPoint: (point: LatLng | null) => void;

  radius: number;
  setRadius: (radius: number) => void;

  restaurantsWithinRadio: Restaurant[];
  setRestaurantsWithinRadio: (restaurants: Restaurant[]) => void;
}

export const useMapContext = create<MapState>((set) => ({
  point: null,
  setPoint: (point: LatLng | null) => set({ point }),

  radius: 200,
  setRadius: (radius: number) => set({ radius }),

  restaurantsWithinRadio: [],
  setRestaurantsWithinRadio: (restaurants: Restaurant[]) => set({ restaurantsWithinRadio: restaurants }),
}));
