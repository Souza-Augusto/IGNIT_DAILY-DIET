import { listMealDTO } from '@dtos/meal-dtos';

export function CountOffDietMeals(data: listMealDTO[]) {
  try {
    let count = 0;

    data.forEach((group) => {
      group.data.forEach((meal) => {
        if (!meal.healthy) {
          count++;
        }
      });
    });

    return count;
  } catch (error) {
    throw error;
  }
}
