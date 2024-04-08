import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '@screens/Home/view';
import { RegisterMeal } from '@screens/register-meal/view';
import { Statistics } from '@screens/statistcs/view';
import { MealDetails } from '@screens/meal-details/view';
import { mealDTO } from '@dtos/meal-dtos';
import { StatusNoticed } from '@screens/status-noticed/view';
import { MealUpdate } from '@screens/meal-update/view';

type routes = {
  home: undefined;
  statistics: undefined;
  'register-meal'?: mealDTO;
  'meal-details': mealDTO;
  'status-noticed': { healthy: boolean };
  'meal-update': mealDTO;
};

const { Navigator, Screen } = createNativeStackNavigator<routes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='home' component={Home} />
      <Screen name='statistics' component={Statistics} />
      <Screen name='register-meal' component={RegisterMeal} />
      <Screen name='meal-details' component={MealDetails} />
      <Screen name='status-noticed' component={StatusNoticed} />
      <Screen name='meal-update' component={MealUpdate} />
    </Navigator>
  );
}
