import type { Restaurant } from "@/interfaces/restaurants";
import type { SortBy } from "@/types/sortBy";
import { create } from "zustand";

interface RestaurantState {
  selectedRestaurant: string | null;
  setSelectedRestaurant: (restaurantId: string | null) => void;

  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;

  filteredRestaurants: Restaurant[];
  setFilteredRestaurants: (restaurants: Restaurant[]) => void;

  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;
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

  sortBy: "rating",
  setSortBy: (sortBy) => set({ sortBy }),

  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
