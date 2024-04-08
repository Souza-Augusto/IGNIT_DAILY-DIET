import { mealDTO, listMealDTO } from '@dtos/meal-dtos';

type Props = {
  title: string;
  data: mealDTO[];
}[];

export function CountMeals(data: listMealDTO[]) {
  try {
    let count = 0;

    data.forEach((group) => {
      group.data.forEach(() => {
        count++;
      });
    });

    return count;
  } catch (error) {
    throw error;
  }
}
