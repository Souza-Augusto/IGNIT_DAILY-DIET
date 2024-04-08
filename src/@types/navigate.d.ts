import { mealDTO, listMealDTO } from '@dtos/meal-dtos';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      statistics: {
        meals: listMealDTO[];
      };
      'register-meal'?: { meal?: mealDTO };
      'meal-details': { meal: mealDTO };
      'status-noticed': { healthy: boolean };
      'meal-update'?: { meal: mealDTO };
    }
  }
}
