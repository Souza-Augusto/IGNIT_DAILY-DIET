import { useRegisterMealViewModel } from './view-model';
import { useNavigation } from '@react-navigation/native';
import { NewMealRegister } from '@storage/new-meal-register';
import { act, renderHook } from '@testing-library/react-native';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@storage/new-meal-register');

const mockNavigation = jest.fn();

jest.mocked(useNavigation).mockReturnValue({
  navigate: mockNavigation,
});

const FAKE_MEAL = {
  id: '1',
  hour: '10:10',
  date: '12/12/2024',
  name: 'Banana',
  healthy: true,
  description: 'teste',
  createdAt: '20/09/2023',
  updatedAt: '',
};

describe('Screen:register-meals view-model', () => {
  it('shpuld call handleRegisterMeal in case any of the fields are empty', async () => {
    const { result } = renderHook(() => useRegisterMealViewModel());

    await act(() => result.current.handleRegisterMeal());

    expect(result.current.dialogVisible).toBeTruthy();
    expect(result.current.dialogMessage).toBe('Preencha todos os campos.');
  });
  it('should call handleRegisterMeal in case of invalid date', async () => {
    const { result } = renderHook(() => useRegisterMealViewModel());
    act(() => {
      result.current.setDescription(FAKE_MEAL.description);
      result.current.setHealthy(FAKE_MEAL.healthy);
      result.current.setHour(FAKE_MEAL.hour);
      result.current.setName(FAKE_MEAL.name);

      result.current.setDate('12/21/2024');
    });

    await act(() => result.current.handleRegisterMeal());

    expect(result.current.dialogVisible).toBeTruthy();
    expect(result.current.dialogMessage).toBe('Formato de data inválido.');
  });
  it('should call handleRegisterMeal in case of invalid hour', async () => {
    const { result } = renderHook(() => useRegisterMealViewModel());
    act(() => {
      result.current.setDescription(FAKE_MEAL.description);
      result.current.setHealthy(FAKE_MEAL.healthy);
      result.current.setHour('33:33');
      result.current.setName(FAKE_MEAL.name);
      result.current.setDate(FAKE_MEAL.date);
    });

    await act(() => result.current.handleRegisterMeal());

    expect(result.current.dialogVisible).toBeTruthy();
    expect(result.current.dialogMessage).toBe('Hora inválida.');
  });
  it('should call handleRegisterMeal in case of health is not defined', async () => {
    const { result } = renderHook(() => useRegisterMealViewModel());
    act(() => {
      result.current.setDescription(FAKE_MEAL.description);
      result.current.setHour(FAKE_MEAL.hour);
      result.current.setName(FAKE_MEAL.name);
      result.current.setDate(FAKE_MEAL.date);
    });

    await act(() => result.current.handleRegisterMeal());

    expect(result.current.dialogVisible).toBeTruthy();
    expect(result.current.dialogMessage).toBe(
      'Por favor informe se a refeição que você deseja está dentro da dieta.'
    );
  });
  it('should NewMealRegister was called correctly', async () => {
    const { result } = renderHook(() => useRegisterMealViewModel());

    jest.mocked(NewMealRegister);

    act(() => {
      result.current.setDescription(FAKE_MEAL.description);
      result.current.setHour(FAKE_MEAL.hour);
      result.current.setName(FAKE_MEAL.name);
      result.current.setDate(FAKE_MEAL.date);
      result.current.setHealthy(FAKE_MEAL.healthy);
    });

    await act(() => result.current.handleRegisterMeal());

    expect(NewMealRegister).toHaveBeenCalledWith({
      ...FAKE_MEAL,
      id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: '',
    });
  });
  it('should navigate to status-noticed', async () => {
    const { result } = renderHook(() => useRegisterMealViewModel());

    act(() => {
      result.current.setDescription(FAKE_MEAL.description);
      result.current.setHour(FAKE_MEAL.hour);
      result.current.setName(FAKE_MEAL.name);
      result.current.setDate(FAKE_MEAL.date);
      result.current.setHealthy(FAKE_MEAL.healthy);
    });

    await act(() => result.current.handleRegisterMeal());

    expect(mockNavigation).toHaveBeenCalledWith('status-noticed', {
      healthy: result.current.healthy,
    });
  });

  it('should call handleRegisterMeal in error case', async () => {
    const { result } = renderHook(() => useRegisterMealViewModel());

    jest
      .spyOn({ NewMealRegister }, 'NewMealRegister')
      .mockRejectedValue(new Error('Erro na resgistro da refeiçao'));

    act(() => {
      result.current.setDescription(FAKE_MEAL.description);
      result.current.setHour(FAKE_MEAL.hour);
      result.current.setName(FAKE_MEAL.name);
      result.current.setDate(FAKE_MEAL.date);
      result.current.setHealthy(FAKE_MEAL.healthy);
    });

    await act(() => result.current.handleRegisterMeal());

    expect(result.current.dialogVisible).toBeTruthy();
    expect(result.current.dialogMessage).toBe(
      'Não foi possível Cadastrar a refeição'
    );
  });
});
