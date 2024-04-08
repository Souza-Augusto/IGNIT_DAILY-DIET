import AsyncStorage from '@react-native-async-storage/async-storage';

import { MEALS_COLLECTION } from './storage-config';
import { mealDTO } from '@dtos/meal-dtos';

export async function GetMeals() {
  try {
    const storage = await AsyncStorage.getItem(MEALS_COLLECTION);

    const groups: mealDTO[] = storage ? JSON.parse(storage) : [];
    return groups;
  } catch (error) {
    throw error;
  }
}
