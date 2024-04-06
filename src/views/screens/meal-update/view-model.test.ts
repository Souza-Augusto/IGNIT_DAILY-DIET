import { useMealUpdateViewModel } from './view-model';
import { useNavigation, useRoute } from '@react-navigation/native';
import { act, renderHook } from '@testing-library/react-native';
import { updateMeal } from '@storage/update-meal';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

jest.mock('@storage/update-meal');

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

jest.mocked(useRoute).mockReturnValue({
  params: { meal: FAKE_MEAL },
  key: '',
  name: '',
});

describe('Screen:meal-update view-model', () => {
  it('shpuld call handleMealUpdate in case any of the fields are empty', async () => {
    const { result } = renderHook(() => useMealUpdateViewModel());

    await act(() => result.current.handleMealUpdate());

    expect(result.current.dialogVisible).toBeTruthy();
    expect(result.current.dialogMessage).toBe('Preencha todos os campos.');
  });
  it('should call handleMealUpdate in case of invalid date', async () => {
    const { result } = renderHook(() => useMealUpdateViewModel());
    act(() => {
      result.current.setDescription(FAKE_MEAL.description);
      result.current.setHealthy(FAKE_MEAL.healthy);
      result.current.setHour(FAKE_MEAL.hour);
      result.current.setName(FAKE_MEAL.name);

      result.current.setDate('12/21/2024');
    });

    await act(() => result.current.handleMealUpdate());

    expect(result.current.dialogVisible).toBeTruthy();
    expect(result.current.dialogMessage).toBe('Formato de data inválido.');
  });
  it('should call handleMealUpdate in case of invalid hour', async () => {
    const { result } = renderHook(() => useMealUpdateViewModel());
    act(() => {
      result.current.setDescription(FAKE_MEAL.description);
      result.current.setHealthy(FAKE_MEAL.healthy);
      result.current.setHour('33:33');
      result.current.setName(FAKE_MEAL.name);
      result.current.setDate(FAKE_MEAL.date);
    });

    await act(() => result.current.handleMealUpdate());

    expect(result.current.dialogVisible).toBeTruthy();
    expect(result.current.dialogMessage).toBe('Hora inválida.');
  });
  it('should call handleMealUpdate in case of health is not defined', async () => {
    const { result } = renderHook(() => useMealUpdateViewModel());
    act(() => {
      result.current.setDescription(FAKE_MEAL.description);
      result.current.setHour(FAKE_MEAL.hour);
      result.current.setName(FAKE_MEAL.name);
      result.current.setDate(FAKE_MEAL.date);
    });

    await act(() => result.current.handleMealUpdate());

    expect(result.current.dialogVisible).toBeTruthy();
    expect(result.current.dialogMessage).toBe(
      'Por favor informe se a refeição que você deseja está dentro da dieta.'
    );
  });
  it('should handleMealUpdate was called correctly with description is Amended', async () => {
    const { result } = renderHook(() => useMealUpdateViewModel());

    jest.mocked(updateMeal);

    act(() => {
      result.current.setDescription('Descrição alterada');
      result.current.setHour(FAKE_MEAL.hour);
      result.current.setName(FAKE_MEAL.name);
      result.current.setDate(FAKE_MEAL.date);
      result.current.setHealthy(FAKE_MEAL.healthy);
    });

    await act(() => result.current.handleMealUpdate());

    expect(updateMeal).toHaveBeenCalledWith({
      ...FAKE_MEAL,
      description: 'Descrição alterada',
      updatedAt: String(new Date()),
    });
  });
  it('should handleMealUpdate was called correctly with hour is Amended', async () => {
    const { result } = renderHook(() => useMealUpdateViewModel());

    jest.mocked(updateMeal);

    act(() => {
      result.current.setDescription(FAKE_MEAL.description);
      result.current.setHour('12:12');
      result.current.setName(FAKE_MEAL.name);
      result.current.setDate(FAKE_MEAL.date);
      result.current.setHealthy(FAKE_MEAL.healthy);
    });

    await act(() => result.current.handleMealUpdate());

    expect(updateMeal).toHaveBeenCalledWith({
      ...FAKE_MEAL,
      hour: '12:12',
      updatedAt: String(new Date()),
    });
  });
  it('should handleMealUpdate was called correctly with name is Amended', async () => {
    const { result } = renderHook(() => useMealUpdateViewModel());

    jest.mocked(updateMeal);

    act(() => {
      result.current.setDescription(FAKE_MEAL.description);
      result.current.setHour(FAKE_MEAL.hour);
      result.current.setName('Nome alterado');
      result.current.setDate(FAKE_MEAL.date);
      result.current.setHealthy(FAKE_MEAL.healthy);
    });

    await act(() => result.current.handleMealUpdate());

    expect(updateMeal).toHaveBeenCalledWith({
      ...FAKE_MEAL,
      name: 'Nome alterado',
      updatedAt: String(new Date()),
    });
  });
  it('should handleMealUpdate was called correctly with date is Amended', async () => {
    const { result } = renderHook(() => useMealUpdateViewModel());

    jest.mocked(updateMeal);

    act(() => {
      result.current.setDescription(FAKE_MEAL.description);
      result.current.setHour(FAKE_MEAL.hour);
      result.current.setName(FAKE_MEAL.name);
      result.current.setDate('25/12/2024');
      result.current.setHealthy(FAKE_MEAL.healthy);
    });

    await act(() => result.current.handleMealUpdate());

    expect(updateMeal).toHaveBeenCalledWith({
      ...FAKE_MEAL,
      date: '25/12/2024',
      updatedAt: String(new Date()),
    });
  });
  it('should handleMealUpdate was called correctly with healthy is Amended', async () => {
    const { result } = renderHook(() => useMealUpdateViewModel());

    jest.mocked(updateMeal);

    act(() => {
      result.current.setDescription(FAKE_MEAL.description);
      result.current.setHour(FAKE_MEAL.hour);
      result.current.setName(FAKE_MEAL.name);
      result.current.setDate(FAKE_MEAL.date);
      result.current.setHealthy(false);
    });

    await act(() => result.current.handleMealUpdate());

    expect(updateMeal).toHaveBeenCalledWith({
      ...FAKE_MEAL,
      healthy: false,
      updatedAt: String(new Date()),
    });
  });
  it('should navigate to status-noticed', async () => {
    const { result } = renderHook(() => useMealUpdateViewModel());

    act(() => {
      result.current.setDescription(FAKE_MEAL.description);
      result.current.setHour(FAKE_MEAL.hour);
      result.current.setName(FAKE_MEAL.name);
      result.current.setDate(FAKE_MEAL.date);
      result.current.setHealthy(FAKE_MEAL.healthy);
    });

    await act(() => result.current.handleMealUpdate());

    expect(mockNavigation).toHaveBeenCalledWith('status-noticed', {
      healthy: result.current.healthy,
    });
  });

  it('should call handleMealUpdate in error case', async () => {
    const { result } = renderHook(() => useMealUpdateViewModel());

    jest
      .spyOn({ updateMeal }, 'updateMeal')
      .mockRejectedValue(new Error('Erro na resgistro da refeiçao'));

    act(() => {
      result.current.setDescription(FAKE_MEAL.description);
      result.current.setHour(FAKE_MEAL.hour);
      result.current.setName(FAKE_MEAL.name);
      result.current.setDate(FAKE_MEAL.date);
      result.current.setHealthy(FAKE_MEAL.healthy);
    });

    await act(() => result.current.handleMealUpdate());

    expect(result.current.dialogVisible).toBeTruthy();
    expect(result.current.dialogMessage).toBe(
      'Não foi possível alterar a refeição'
    );
  });
});
