import type { Restaurant } from '@/interfaces/restaurants';
import { api } from '@/lib/api';
import { AxiosError } from 'axios';
import type { Either } from '../types/either';

export const getRestaurants = async (): Promise<Either<string, Restaurant[]>> => {
  try {
    const response = await api.get<Restaurant[]>('');

    return { right: response.data };
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError) {
      return { left: error.message ?? "Error fetching restaurants" };
    }

    return { left: "Error fetching restaurants" };
  }
};