import { useState } from 'react';
import { GetMeals } from '@storage/get-meals';
import { useTheme } from 'styled-components/native';
import { CountMeals } from '@utils/meals/count-meals';
import { CountHealthyMeals } from '@utils/meals/count-healthy-meals';
import { SeparateByDate } from '@utils/meals/separate-by-date';
import { mealDTO, listMealDTO } from '@dtos/meal-dtos';
import { useNavigation } from '@react-navigation/native';
import { CountOffDietMeals } from '@utils/meals/count-off-diet-meals';

export interface HomeViewModelProps {
  data: listMealDTO[];
  loading: boolean;
  fetchMeals: () => void;
  dialogVisible: boolean;
  setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
  dialogTitle: string;
  setDialogTitle: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleNavigateStatistcs: () => void;
  handleNavigateMealDetails: (item: mealDTO) => void;
  handleNavigateResgisterMeal: () => void;
  cardColor: string;
  arrowIcon: string;
  percentage: string;
}

function useHomeViewModel(): HomeViewModelProps {
  const { COLORS } = useTheme();

  const [data, setData] = useState<listMealDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [percentage, setPercentage] = useState('');
  const [cardColor, setCardColor] = useState<string>(COLORS.GRAY_200);
  const [arrowIcon, setArrowIcon] = useState<string>(COLORS.GRAY_200);

  const { navigate } = useNavigation();

  function calculatePercentage(data: listMealDTO[]) {
    const meals = CountMeals(data);
    const healthy = CountHealthyMeals(data);
    const offDiet = CountOffDietMeals(data);

    const healthypercentage = (healthy / meals) * 100;

    if (meals === 0) {
      setPercentage('0,00%');
    } else {
      setPercentage(
        String(healthypercentage.toFixed(2) + '%').replace('.', ',')
      );
    }

    if (offDiet < healthy) {
      setCardColor(COLORS.GREEN_LIGHT);
      setArrowIcon(COLORS.GREEN_DARK);
      return;
    }
    if (offDiet > healthy) {
      setCardColor(COLORS.RED_LIGHT);
      setArrowIcon(COLORS.RED_DARK);
      return;
    }
    setCardColor(COLORS.GRAY_600);
    setArrowIcon(COLORS.GRAY_200);
  }

  async function fetchMeals() {
    try {
      setLoading(true);
      const meals = await GetMeals();

      const separateByDates = SeparateByDate(meals);

      calculatePercentage(separateByDates);

      setData(separateByDates);
    } catch (error) {
      setDialogTitle('Não foi possível carregar as refeições.');
      setDialogVisible(true);
    } finally {
      setLoading(false);
    }
  }

  function handleNavigateStatistcs() {
    navigate('statistics', { meals: data });
  }

  function handleNavigateMealDetails(item: mealDTO) {
    navigate('meal-details', { meal: item });
  }

  function handleNavigateResgisterMeal() {
    navigate('register-meal');
  }

  return {
    data,
    fetchMeals,
    loading,
    dialogTitle,
    dialogVisible,
    setDialogTitle,
    setDialogVisible,
    setLoading,
    handleNavigateMealDetails,
    handleNavigateResgisterMeal,
    handleNavigateStatistcs,
    arrowIcon,
    cardColor,
    percentage,
  };
}
export { useHomeViewModel };
