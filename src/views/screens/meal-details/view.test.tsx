import { mealDTO } from '@dtos/meal-dtos';
import { MealDetailsProps, useMealDetailsViewModel } from './view-model';
import { fireEvent, render } from '@__tests__/utils/customRenderItem';
import { MealDetails } from './view';
import '@testing-library/react-native/extend-expect';

interface factoryProps {
  dialogMessage?: string;
  dialogVisible?: boolean;
  dialogPositiveButtonTitle?: string;
  meal: mealDTO;
}

interface CreateMockViewModelProps {
  dialogMessage: string;
  dialogVisible: boolean;
  dialogPositiveButtonTitle: string;
  meal: mealDTO;
}

beforeEach(() => jest.clearAllMocks());

const FAKE_PARAMS = {
  id: '1',
  hour: '10:10',
  date: '10/09/2023',
  name: 'Banana',
  healthy: true,
  description: 'teste',
  createdAt: '20/09/2023',
  updatedAt: '',
};

jest.mock('./view-model');

const MOCK_ALERT = jest.fn();
const MOCK_DELETE_MEAL = jest.fn();
const MOCK_HANDLE_NAVIGATION_REGISTER_MEAL = jest.fn();
const MOCK_HANDLE_SET_DIALOG_VISIBLE = jest.fn();

const CREATE_MOCK_VIEW_MODEL = ({
  dialogMessage,
  dialogPositiveButtonTitle,
  dialogVisible,
  meal,
}: CreateMockViewModelProps): MealDetailsProps => ({
  alert: MOCK_ALERT,
  deleteMeal: MOCK_DELETE_MEAL,
  dialogMessage,
  dialogPositiveButtonTitle,
  dialogVisible,
  handleNavigationRegisterMeal: MOCK_HANDLE_NAVIGATION_REGISTER_MEAL,
  meal,
  setDialogVisible: MOCK_HANDLE_SET_DIALOG_VISIBLE,
});

function makeSut({
  dialogMessage = '',
  dialogPositiveButtonTitle = '',
  dialogVisible = false,
  meal,
}: factoryProps) {
  const MOCK_VIEW_MODEL = CREATE_MOCK_VIEW_MODEL({
    dialogMessage,
    dialogPositiveButtonTitle,
    dialogVisible,
    meal,
  });

  jest.mocked(useMealDetailsViewModel).mockReturnValueOnce(MOCK_VIEW_MODEL);

  const SUT = render(<MealDetails />);

  return SUT;
}

describe('Screen:meal-details', () => {
  it('should render correctly', () => {
    const { toJSON, getByTestId } = makeSut({ meal: FAKE_PARAMS });

    const CONTAINER = getByTestId('container');

    expect(CONTAINER).toBeDefined();
    expect(toJSON).toMatchSnapshot();
  });

  it('should be Dialog is not visible', () => {
    const { toJSON, queryByTestId } = makeSut({
      meal: FAKE_PARAMS,
    });

    const DIALOG = queryByTestId('dialog-container');

    expect(DIALOG).toBeNull();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be Dialog is  visible', () => {
    const { toJSON, getByTestId } = makeSut({
      meal: FAKE_PARAMS,

      dialogVisible: true,
    });

    const DIALOG = getByTestId('dialog-container');

    expect(DIALOG).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });
  it('should be Dialog positiveButton is  visible', () => {
    const { toJSON, getByText } = makeSut({
      meal: FAKE_PARAMS,
      dialogPositiveButtonTitle: 'Teste',
      dialogVisible: true,
    });

    const DIALOG = getByText('Teste');

    expect(DIALOG).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });
  it('should be positive function is called', () => {
    const { toJSON, getByText } = makeSut({
      meal: FAKE_PARAMS,
      dialogPositiveButtonTitle: 'Teste',
      dialogVisible: true,
    });

    const POSITIVE_BUTTON = getByText('Teste');
    fireEvent.press(POSITIVE_BUTTON);

    expect(MOCK_DELETE_MEAL).toHaveBeenCalled();

    expect(toJSON).toMatchSnapshot();
  });
  it('should be negative function is called', () => {
    const { toJSON, getByText } = makeSut({
      meal: FAKE_PARAMS,
      dialogVisible: true,
    });

    const NEGATIVE_BUTTON = getByText('Não');
    fireEvent.press(NEGATIVE_BUTTON);

    expect(MOCK_HANDLE_SET_DIALOG_VISIBLE).toHaveBeenCalledWith(false);

    expect(toJSON).toMatchSnapshot();
  });

  it('should header render correctly', () => {
    const { toJSON, getByText } = makeSut({ meal: FAKE_PARAMS });

    const HEADER = getByText('Refeição');

    expect(HEADER).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });
  it('should meal-details-container render correctly', () => {
    const { toJSON, getByTestId } = makeSut({ meal: FAKE_PARAMS });

    const CONTAINER = getByTestId('detais-meal-container');

    expect(CONTAINER).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });
  it('should meal name is visible', () => {
    const { toJSON, getByText } = makeSut({ meal: FAKE_PARAMS });

    const NAME = getByText('Banana');

    expect(NAME).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });
  it('should meal description is visible', () => {
    const { toJSON, getByText } = makeSut({ meal: FAKE_PARAMS });

    const DESCRIPTION = getByText('teste');

    expect(DESCRIPTION).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });
  it('should meal DateTimeTitle is visible', () => {
    const { toJSON, getByText } = makeSut({ meal: FAKE_PARAMS });

    const DATE_TIME_TITLE = getByText('Data e Hora');

    expect(DATE_TIME_TITLE).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });

  it('should meal date and hour is visible', () => {
    const { toJSON, getByTestId } = makeSut({ meal: FAKE_PARAMS });

    const DATE_TIME = getByTestId('date-time');

    expect(DATE_TIME).toHaveTextContent(
      `${FAKE_PARAMS.date} às ${FAKE_PARAMS.hour}`
    );

    expect(toJSON).toMatchSnapshot();
  });

  it('should meal MealTypeDescription is visible with healthy is false', () => {
    const FAKE_PARAMS_OFF_DIET = {
      id: '1',
      hour: '10:10',
      date: '10/09/2023',
      name: 'Banana',
      healthy: false,
      description: 'teste',
      createdAt: '20/09/2023',
      updatedAt: '',
    };

    const { toJSON, getByText } = makeSut({ meal: FAKE_PARAMS_OFF_DIET });

    const TITLE = getByText('fora da dieta');

    expect(TITLE).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });
  it('should meal MealTypeDescription is visible with healthy is true', () => {
    const { toJSON, getByText } = makeSut({ meal: FAKE_PARAMS });

    const TITLE = getByText('dentro da dieta');

    expect(TITLE).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });
  it('should edit button render correctly', () => {
    const { toJSON, getByText } = makeSut({ meal: FAKE_PARAMS });

    const BUTTON = getByText('Editar Refeição');

    expect(BUTTON).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });
  it('should handleNavigationRegisterMeal is called', () => {
    const { toJSON, getByText } = makeSut({ meal: FAKE_PARAMS });

    const BUTTON = getByText('Editar Refeição');
    fireEvent.press(BUTTON);

    expect(MOCK_HANDLE_NAVIGATION_REGISTER_MEAL).toHaveBeenCalledTimes(1);
    expect(toJSON).toMatchSnapshot();
  });
  it('should delete button render correctly', () => {
    const { toJSON, getByText } = makeSut({ meal: FAKE_PARAMS });

    const BUTTON = getByText('Excluir Refeição');

    expect(BUTTON).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });

  it('should alert fuction is called', () => {
    const { toJSON, getByText } = makeSut({ meal: FAKE_PARAMS });

    const BUTTON = getByText('Excluir Refeição');
    fireEvent.press(BUTTON);

    expect(MOCK_ALERT).toHaveBeenCalledTimes(1);
    expect(toJSON).toMatchSnapshot();
  });
});
