import { mealDTO } from '@dtos/meal-dtos';
import { GetMeals } from './get-meals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEALS_COLLECTION } from './storage-config';

export async function NewMealRegister(meal: mealDTO) {
  try {
    const storageGroups = await GetMeals();

    storageGroups.push(meal);

    const storage = JSON.stringify(storageGroups);
    await AsyncStorage.setItem(MEALS_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
