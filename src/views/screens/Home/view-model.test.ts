import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { useHomeViewModel } from './view-model';
import '@testing-library/react-native/extend-expect';
import { act, renderHook, waitFor } from '@__tests__/utils/customRenderItem';
import { GetMeals } from '@storage/get-meals';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('src/infra/storage/get-meals.ts');

jest.mock('@react-navigation/native', () => ({
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

const FAKE_DATA = [
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
    id: '3',
    hour: '10:10',
    date: '12/05/2024',
    name: 'Banana',
    healthy: false,
    description: 'teste',
    createdAt: '20/09/2023',
    updatedAt: '',
  },
];

const EXPECTED_DATA = [
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
        healthy: false,
        description: 'teste',
        createdAt: '20/09/2023',
        updatedAt: '',
      },
    ],
  },
];

const FAKE_DATA_HEALTHY = [
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
    id: '3',
    hour: '10:10',
    date: '12/05/2024',
    name: 'Banana',
    healthy: true,
    description: 'teste',
    createdAt: '20/09/2023',
    updatedAt: '',
  },

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
];

const FAKE_DATA_OFF_DIET = [
  {
    id: '1',
    hour: '10:10',
    date: '12/12/2024',
    name: 'Banana',
    healthy: false,
    description: 'teste',
    createdAt: '20/09/2023',
    updatedAt: '',
  },

  {
    id: '3',
    hour: '10:10',
    date: '12/05/2024',
    name: 'Banana',
    healthy: false,
    description: 'teste',
    createdAt: '20/09/2023',
    updatedAt: '',
  },

  {
    id: '2',
    hour: '10:10',
    date: '12/01/2024',
    name: 'Banana',
    healthy: false,
    description: 'teste',
    createdAt: '20/09/2023',
    updatedAt: '',
  },
];

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

const EXPECTED_DATA_OFF_DIET = [
  {
    title: '12.12.24',
    data: [
      {
        id: '1',
        hour: '10:10',
        date: '12/12/2024',
        name: 'Banana',
        healthy: false,
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
        healthy: false,
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
        healthy: false,
        description: 'teste',
        createdAt: '20/09/2023',
        updatedAt: '',
      },
    ],
  },
];

describe('screen: home view model', () => {
  it('should be fetchMeals function called in sucess when offDiet < onDiet', async () => {
    jest.mocked(GetMeals).mockResolvedValue(FAKE_DATA_HEALTHY);

    const { result } = renderHook(() => useHomeViewModel());

    await act(async () => {
      result.current.fetchMeals();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(EXPECTED_DATA_HEALTHY);
      expect(result.current.cardColor).toBe(theme.COLORS.GREEN_LIGHT);
      expect(result.current.arrowIcon).toBe(theme.COLORS.GREEN_DARK);
    });
  });
  it('should be fetchMeals function called in sucess when offDiet > onDiet', async () => {
    jest.mocked(GetMeals).mockResolvedValue(FAKE_DATA_OFF_DIET);

    const { result } = renderHook(() => useHomeViewModel());

    await act(async () => {
      result.current.fetchMeals();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(EXPECTED_DATA_OFF_DIET);
      expect(result.current.cardColor).toBe(theme.COLORS.RED_LIGHT);
      expect(result.current.arrowIcon).toBe(theme.COLORS.RED_DARK);
    });
  });

  it('should be fetchMeals function called in sucess when offDiet = onDiet', async () => {
    jest.mocked(GetMeals).mockResolvedValue(FAKE_DATA);

    const { result } = renderHook(() => useHomeViewModel());

    await act(async () => {
      result.current.fetchMeals();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(EXPECTED_DATA);
      expect(result.current.cardColor).toBe(theme.COLORS.GRAY_600);
      expect(result.current.arrowIcon).toBe(theme.COLORS.GRAY_200);
    });
  });

  it('should be fetchMeals function called in sucess when meals = 0', async () => {
    jest.mocked(GetMeals).mockResolvedValue([]);

    const { result } = renderHook(() => useHomeViewModel());

    await act(async () => {
      result.current.fetchMeals();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual([]);
      expect(result.current.percentage).toBe('0,00%');
      expect(result.current.cardColor).toBe(theme.COLORS.GRAY_600);
      expect(result.current.arrowIcon).toBe(theme.COLORS.GRAY_200);
    });
  });
  it('should be fetchMeals function called in sucess when meals > 0', async () => {
    jest.mocked(GetMeals).mockResolvedValue(FAKE_DATA_HEALTHY);

    const { result } = renderHook(() => useHomeViewModel());

    await act(async () => {
      result.current.fetchMeals();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(EXPECTED_DATA_HEALTHY);
      expect(result.current.percentage).toBe('100,00%');
      expect(result.current.cardColor).toBe(theme.COLORS.GREEN_LIGHT);
      expect(result.current.arrowIcon).toBe(theme.COLORS.GREEN_DARK);
    });
  });

  it('should navigate NavigateStatistcs screen', async () => {
    jest.mocked(GetMeals).mockResolvedValue(FAKE_DATA_HEALTHY);

    const { result } = renderHook(() => useHomeViewModel());

    await act(async () => {
      result.current.fetchMeals();
    });
    result.current.handleNavigateStatistcs();

    await waitFor(() => {
      expect(mockNavigation).toHaveBeenCalledWith('statistics', {
        meals: EXPECTED_DATA_HEALTHY,
      });
    });
  });
  it('should navigate NavigateMealDetails screen', async () => {
    jest.mocked(GetMeals).mockResolvedValue(FAKE_DATA_HEALTHY);

    const { result } = renderHook(() => useHomeViewModel());

    await act(async () => {
      result.current.fetchMeals();
    });
    result.current.handleNavigateMealDetails(FAKE_DATA_HEALTHY[1]);

    await waitFor(() => {
      expect(mockNavigation).toHaveBeenCalledWith('meal-details', {
        meal: FAKE_DATA_HEALTHY[1],
      });
    });
  });
  it('should navigate ResgisterMeal screen', async () => {
    jest.mocked(GetMeals).mockResolvedValue(FAKE_DATA_HEALTHY);

    const { result } = renderHook(() => useHomeViewModel());

    await act(async () => {
      result.current.fetchMeals();
    });
    result.current.handleNavigateResgisterMeal();

    await waitFor(() => {
      expect(mockNavigation).toHaveBeenCalledWith('register-meal');
    });
  });
});
