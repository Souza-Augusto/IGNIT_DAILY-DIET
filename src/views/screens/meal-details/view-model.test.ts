import { act, renderHook } from '@testing-library/react-native';
import { useMealDetailsViewModel } from './view-model';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DeleteMeal } from '@storage/delete-meal';
import '@testing-library/react-native/extend-expect';
beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn(),
}));

jest.mock('@storage/delete-meal');

const mockNavigation = jest.fn();

jest.mocked(useNavigation).mockReturnValue({
  navigate: mockNavigation,
});

const FAKE_PARAMS = {
  meal: {
    id: '1',
    hour: '10:10',
    date: '10/09/2023',
    name: 'Banana',
    healthy: true,
    description: 'teste',
    createdAt: '20/09/2023',
    updatedAt: '',
  },
};

jest.mocked(useRoute).mockReturnValue({
  params: FAKE_PARAMS,
  key: '',
  name: '',
});

describe('Screen:meal-details', () => {
  it('should alert function is called correctly', () => {
    const { result } = renderHook(() => useMealDetailsViewModel());

    act(() => {
      result.current.alert();
    });

    expect(result.current.dialogVisible).toBeTruthy();
    expect(result.current.dialogPositiveButtonTitle).toBe('Sim, excluir');
    expect(result.current.dialogMessage).toBe(
      'Deseja realmente excluir o registro da refeição?'
    );
  });

  it('should handleNavigationRegisterMeal is called correctly', () => {
    const { result } = renderHook(() => useMealDetailsViewModel());

    act(() => {
      result.current.handleNavigationRegisterMeal();
    });

    expect(mockNavigation).toHaveBeenCalledWith('meal-update', FAKE_PARAMS);
  });

  it('should deleteMeal is called correctly', async () => {
    const { result } = renderHook(() => useMealDetailsViewModel());

    await act(() => {
      result.current.deleteMeal();
    });

    expect(DeleteMeal).toHaveBeenCalledTimes(1);
    expect(mockNavigation).toHaveBeenCalledWith('home');
    expect(result.current.dialogVisible).toBe(false);
  });

  it('should deleteMeal function in error case', async () => {
    const { result } = renderHook(() => useMealDetailsViewModel());

    jest
      .spyOn({ DeleteMeal }, 'DeleteMeal')
      .mockRejectedValue(new Error('Erro ao deletar refeiçao'));

    await act(() => {
      result.current.deleteMeal();
    });

    expect(result.current.dialogVisible).toBeTruthy();
    expect(result.current.dialogPositiveButtonTitle).toBeNull();
    expect(result.current.dialogMessage).toBe(
      'Não foi possível excluir a refeição.'
    );
  });
});
