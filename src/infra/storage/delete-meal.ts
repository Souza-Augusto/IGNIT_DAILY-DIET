import { GetMeals } from './get-meals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MEALS_COLLECTION } from './storage-config';
import { mealDTO } from '@dtos/meal-dtos';

export async function DeleteMeal(mealToDelete: mealDTO) {
  try {
    let storageGroups = await GetMeals();

    const updatedData = storageGroups.filter(
      (meal) => meal.id !== mealToDelete.id
    );

    storageGroups = updatedData;

    const storage = JSON.stringify(storageGroups);
    await AsyncStorage.setItem(MEALS_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
