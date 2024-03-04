import { useState } from 'react';
import { GetMeals } from '@storage/getMeals';

import { CountMeals } from '@utils/meals/countMeals';
import { CountHealthyMeals } from '@utils/meals/countHealthyMeals';
import { SeparateByDate } from '@utils/meals/separateByDate';
import { mealDTO } from '@dtos/mealDTO';

type sectionListDataProps = {
  title: string;
  data: mealDTO[];
};

interface HomeViewModelProps {
  data: sectionListDataProps[];
  countMeals: number;
  healthyMeals: number;
  loading: boolean;
  fetchMeals: () => void;
  dialogVisible: boolean;
  setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>;
  dialogTitle: string;
  setDialogTitle: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function useHomeViewModel(): HomeViewModelProps {
  const [data, setData] = useState<sectionListDataProps[]>([]);
  const [countMeals, setCountMeals] = useState(0);
  const [healthyMeals, setHealthyMeals] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');

  async function fetchMeals() {
    const meals = await GetMeals();

    const separateByDates = SeparateByDate(meals);

    setCountMeals(CountMeals(separateByDates));

    setHealthyMeals(CountHealthyMeals(separateByDates));

    setData(separateByDates);

    setLoading(false);
  }
  return {
    countMeals,
    data,
    fetchMeals,
    healthyMeals,
    loading,
    dialogTitle,
    dialogVisible,
    setDialogTitle,
    setDialogVisible,
    setLoading,
  };
}
export { useHomeViewModel };
