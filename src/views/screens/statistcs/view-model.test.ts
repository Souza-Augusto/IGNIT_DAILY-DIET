import { useNavigation, useRoute } from '@react-navigation/native';
import { act, renderHook } from '@testing-library/react-native';
import { useTheme } from 'styled-components/native';
import { useStatiticsViewModel } from './view-model';
import { CountOffDietMeals } from '@utils/meals/count-off-diet-meals';
import { CountHealthyMeals } from '@utils/meals/count-healthy-meals';
import { CountMeals } from '@utils/meals/count-meals';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('@utils/meals/count-off-diet-meals');
jest.mock('@utils/meals/count-healthy-meals');
jest.mock('@utils/meals/count-meals');

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn(),
}));

const theme = {
  COLORS: {
    RED_DARK: '#BF3B44',
    RED_MID: '#F3BABD',
    RED_LIGHT: '#F4E6E7',

    GREEN_DARK: '#639339',
    GREEN_MID: '#CBE4B4',
    GREEN_LIGHT: '#E5F0DB',

    GRAY_100: '#1B1D1E',
    GRAY_200: '#333638',
    GRAY_300: '#5C6265',
    GRAY_400: '#B9BBBC',
    GRAY_500: '#DDDEDF',
    GRAY_600: '#EFF0F0',
    GRAY_700: '#FAFAFA',

    WHITE: '#FFFFFF',
  },
  FONT_FAMILY: {
    REGULAR: 'NunitoSans_400Regular',
    BOLD: 'NunitoSans_700Bold',
  },
  FONT_SIZE: {
    XS: 12,
    S: 14,
    M: 16,
    L: 18,
    XL: 24,
    XXL: 32,
  },
};

const EXPECTED_DATA_HEALTHY = [
  {
    title: '12.12.24',
    data: [
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
    ],
  },
  {
    title: '12.05.24',
    data: [
      {
        id: '3',
        hour: '10:10',
        date: '12/05/2024',
        name: 'Banana',
        healthy: true,
        description: 'teste',
        createdAt: '20/09/2023',
        updatedAt: '',
      },
    ],
  },
  {
    title: '12.01.24',
    data: [
      {
        id: '2',
        hour: '10:10',
        date: '12/01/2024',
        name: 'Banana',
        healthy: true,
        description: 'teste',
        createdAt: '20/09/2023',
        updatedAt: '',
      },
    ],
  },
];

jest.mock('styled-components/native', () => ({
  useTheme: jest.fn(() => theme),
}));

const mockNavigation = jest.fn();

jest.mocked(useNavigation).mockReturnValue({
  navigate: mockNavigation,
});

jest.mocked(useTheme).mockReturnValueOnce({
  COLORS: theme.COLORS,
  FONT_FAMILY: theme.FONT_FAMILY,
  FONT_SIZE: theme.FONT_SIZE,
});

jest.mocked(useRoute).mockReturnValue({
  params: { meals: EXPECTED_DATA_HEALTHY },
  key: '',
  name: '',
});

describe('screen:statistcs view-model', () => {
  it('should chooseBackButtonColor is called correctly when offDiet > healthy diet', async () => {
    jest.mocked(CountHealthyMeals).mockReturnValue(0);
    jest.mocked(CountOffDietMeals).mockReturnValue(2);

    const { result } = renderHook(() => useStatiticsViewModel());

    await act(async () => result.current.calculateStatistcs());

    expect(result.current.backButtonColor).toBe(theme.COLORS.RED_DARK);
    expect(result.current.backgroundColor).toBe(theme.COLORS.RED_LIGHT);
  });
  it('should chooseBackButtonColor is called correctly when offDiet < healthy diet', async () => {
    jest.mocked(CountHealthyMeals).mockReturnValue(2);
    jest.mocked(CountOffDietMeals).mockReturnValue(0);

    const { result } = renderHook(() => useStatiticsViewModel());

    await act(async () => result.current.calculateStatistcs());

    expect(result.current.backButtonColor).toBe(theme.COLORS.GREEN_DARK);
    expect(result.current.backgroundColor).toBe(theme.COLORS.GREEN_LIGHT);
  });
  it('should chooseBackButtonColor is called correctly when offDiet = healthy diet', async () => {
    jest.mocked(CountHealthyMeals).mockReturnValue(2);
    jest.mocked(CountOffDietMeals).mockReturnValue(2);

    const { result } = renderHook(() => useStatiticsViewModel());

    await act(async () => result.current.calculateStatistcs());

    expect(result.current.backButtonColor).toBe(theme.COLORS.GRAY_200);
    expect(result.current.backgroundColor).toBe(theme.COLORS.GRAY_600);
  });
  it('should findLongestSequence is called correctly', async () => {
    const { result } = renderHook(() => useStatiticsViewModel());

    await act(async () => result.current.calculateStatistcs());

    expect(result.current.bestSequence).toBe(3);
  });
  it('should setPercentage is called correctly with when healthy meals > 0', async () => {
    const { result } = renderHook(() => useStatiticsViewModel());

    jest.mocked(CountMeals).mockReturnValue(10);
    jest.mocked(CountHealthyMeals).mockReturnValue(5);

    await act(async () => result.current.calculateStatistcs());

    expect(result.current.percentage).toBe('50,00%');
  });
  it('should setPercentage is called correctly with when healthy meals = 0', async () => {
    const { result } = renderHook(() => useStatiticsViewModel());

    jest.mocked(CountMeals).mockReturnValue(10);
    jest.mocked(CountHealthyMeals).mockReturnValue(0);

    await act(async () => result.current.calculateStatistcs());

    expect(result.current.percentage).toBe('0,00%');
  });
  it('should setMealsMade, setMealsOffDiet, setMealsOnDiet is called correctly', async () => {
    const { result } = renderHook(() => useStatiticsViewModel());

    jest.mocked(CountMeals).mockReturnValue(10);
    jest.mocked(CountHealthyMeals).mockReturnValue(5);
    jest.mocked(CountOffDietMeals).mockReturnValue(5);

    await act(async () => result.current.calculateStatistcs());

    expect(result.current.mealsMade).toBe(10);
    expect(result.current.mealsOffDiet).toBe(5);
    expect(result.current.mealsOnDiet).toBe(5);
  });
});
