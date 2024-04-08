import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewMealRegister } from './new-meal-register';
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
describe('Storage Function:new-meal-register', () => {
  it('RegisterRating set AsyncStorage data', async () => {
    const VALUE = {
      id: '8',
      hour: '10:10',
      date: '12/12/2024',
      name: 'Chocolate',
      healthy: false,
      description: 'teste',
      createdAt: '20/09/2023',
      updatedAt: '',
    };

    AsyncStorage.setItem(MEALS_COLLECTION, JSON.stringify(DATA));

    await NewMealRegister(VALUE);

    const STORAGE = (await AsyncStorage.getItem(MEALS_COLLECTION)) as string;

    const RESULT = JSON.parse(STORAGE);

    expect(RESULT).toEqual([...DATA, VALUE]);
  });
});
