import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeleteMeal } from './delete-meal';
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

describe('Storage:Delete meal', () => {
  it('delete item from storage', async () => {
    AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(DATA));

    await DeleteMeal({
      id: '7',
      hour: '10:10',
      date: '12/12/2024',
      name: 'Banana',
      healthy: false,
      description: 'teste',
      createdAt: '20/09/2023',
      updatedAt: '',
    });

    const STORAGE = (await AsyncStorage.getItem(MEALS_COLLECTION)) as string;

    expect(JSON.parse(STORAGE)).toEqual([
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
    ]);
  });
});
