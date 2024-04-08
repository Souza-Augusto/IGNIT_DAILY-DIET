import { useState, Dispatch } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { mealDTO } from '@dtos/meal-dtos';
import { DeleteMeal } from '@storage/delete-meal';

type RouteParams = {
  meal: mealDTO;
};

export interface MealDetailsProps {
  dialogVisible: boolean;
  dialogMessage: string;
  meal: mealDTO;
  alert: () => void;
  deleteMeal: () => void;
  setDialogVisible: Dispatch<React.SetStateAction<boolean>>;
  handleNavigationRegisterMeal: () => void;
  dialogPositiveButtonTitle: string | null;
}

function useMealDetailsViewModel(): MealDetailsProps {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogPositiveButtonTitle, setDialogdialogPositiveButtonTitle] =
    useState<string | null>('Sim, excluir');

  const navigation = useNavigation();

  const route = useRoute();
  const { meal } = route.params as RouteParams;

  function alert() {
    setDialogdialogPositiveButtonTitle('Sim, excluir');
    setDialogMessage('Deseja realmente excluir o registro da refeição?');
    setDialogVisible(true);
  }

  async function deleteMeal() {
    setDialogVisible(false);
    try {
      await DeleteMeal(meal);
      navigation.navigate('home');
    } catch (error) {
      console.log(error);
      setDialogMessage('Não foi possível excluir a refeição.');
      setDialogdialogPositiveButtonTitle(null);
      setDialogVisible(true);
    }
  }

  function handleNavigationRegisterMeal() {
    navigation.navigate('meal-update', { meal });
  }

  return {
    alert,
    deleteMeal,
    dialogVisible,
    meal,
    dialogMessage,
    setDialogVisible,
    handleNavigationRegisterMeal,
    dialogPositiveButtonTitle,
  };
}

export { useMealDetailsViewModel };
