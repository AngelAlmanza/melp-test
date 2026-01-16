import type { Restaurant } from "@/interfaces/restaurants";
import { create } from "zustand";

interface RestaurantState {
  selectedRestaurant: Restaurant | null;
  setSelectedRestaurant: (restaurant: Restaurant | null) => void;

  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;

  filteredRestaurants: Restaurant[];
  setFilteredRestaurants: (restaurants: Restaurant[]) => void;
}

export const useRestaurantContext = create<RestaurantState>((set) => ({
  selectedRestaurant: null,
  setSelectedRestaurant: (restaurant) =>
    set({ selectedRestaurant: restaurant }),

  restaurants: [],
  setRestaurants: (restaurants) => set({ restaurants }),

  filteredRestaurants: [],
  setFilteredRestaurants: (restaurants) =>
    set({ filteredRestaurants: restaurants }),
}));
