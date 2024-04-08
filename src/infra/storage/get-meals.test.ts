import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetMeals } from './get-meals';
import { MEALS_COLLECTION } from './storage-config';

const DATA = [
  {
    id: '1',
    hour: '10:10',
    date: '12/12/2024',
    name: 'Banana',
    healthy: true,
    description: 'teste',
    createdAt: '20/09/2023',
    updatedAt: '',
  },

  {
    id: '7',
    hour: '10:10',
    date: '12/12/2024',
    name: 'Banana',
    healthy: false,
    description: 'teste',
    createdAt: '20/09/2023',
    updatedAt: '',
  },
];

describe('Storage Function:get-meals', () => {
  it('should be return storage Data', async () => {
    await AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(DATA));

    const result = await GetMeals();

    expect(result).toEqual(DATA);
  });
});
