import { fireEvent, render } from '@__tests__/utils/customRenderItem';
import { RegisterMealProps, useRegisterMealViewModel } from './view-model';
import { RegisterMeal } from './view';
import '@testing-library/react-native/extend-expect';

interface FactoryProps {
  healthy?: boolean;
  name?: string;
  description?: string;
  date?: string;
  isLoading?: boolean;
  dialogVisible?: boolean;
  dialogMessage?: string;
  hour?: string;
}

interface CreateMockViewModelProps {
  healthy: boolean;
  name: string;
  description: string;
  date: string;
  isLoading: boolean;
  dialogVisible: boolean;
  dialogMessage: string;
  hour: string;
}

jest.mock('./view-model');

const MOCK_HANDLE_REGISTER_MEAL = jest.fn();
const MOCK_SET_DATE = jest.fn();
const MOCK_SET_DESCRIPTION = jest.fn();
const MOCK_SET_DIALOG_VISIBLE = jest.fn();
const MOCK_SET_HEALTHY = jest.fn();
const MOCK_SET_HOUR = jest.fn();
const MOCK_SET_NAME = jest.fn();

const CREATE_MOCK_VIEW_MODEL = ({
  date,
  description,
  dialogMessage,
  dialogVisible,
  healthy,
  isLoading,
  name,
  hour,
}: CreateMockViewModelProps): RegisterMealProps => ({
  date,
  description,
  dialogMessage,
  dialogVisible,
  handleRegisterMeal: MOCK_HANDLE_REGISTER_MEAL,
  healthy,
  hour,
  isLoading,
  name,
  setDate: MOCK_SET_DATE,
  setDescription: MOCK_SET_DESCRIPTION,
  setDialogVisible: MOCK_SET_DIALOG_VISIBLE,
  setHealthy: MOCK_SET_HEALTHY,
  setHour: MOCK_SET_HOUR,
  setName: MOCK_SET_NAME,
});

function makeSUT({
  date = '',
  description = '',
  dialogMessage = '',
  dialogVisible = false,
  healthy = false,
  hour = '',
  isLoading = false,
  name = '',
}: FactoryProps) {
  const MOCK_VIEW_MODEL = CREATE_MOCK_VIEW_MODEL({
    date,
    description,
    dialogMessage,
    dialogVisible,
    healthy,
    hour,
    isLoading,
    name,
  });

  jest.mocked(useRegisterMealViewModel).mockReturnValue(MOCK_VIEW_MODEL);

  const SUT = render(<RegisterMeal />);

  return SUT;
}

describe('screen:register-meal view', () => {
  it('shuld be render correctly', () => {
    const { toJSON, getByTestId } = makeSUT({});

    const CONTAINER = getByTestId('container');

    expect(CONTAINER).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be dialog is not visible', () => {
    const { toJSON, queryByTestId } = makeSUT({});

    const DIALOG_CONTAINER = queryByTestId('dialog-container');

    expect(DIALOG_CONTAINER).toBeNull();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be dialog is visible', () => {
    const { toJSON, getByTestId } = makeSUT({ dialogVisible: true });

    const DIALOG_CONTAINER = getByTestId('dialog-container');

    expect(DIALOG_CONTAINER).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be dialog message is visible', () => {
    const { toJSON, getByText } = makeSUT({
      dialogVisible: true,
      dialogMessage: 'teste',
    });

    const DIALOG_CONTAINER = getByText('teste');

    expect(DIALOG_CONTAINER).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });

  it('should dialog negative function is called', () => {
    const { toJSON, getByTestId } = makeSUT({
      dialogVisible: true,
      dialogMessage: 'teste',
    });

    const BUTTON = getByTestId('header-transparent-button');
    fireEvent.press(BUTTON);

    expect(MOCK_SET_DIALOG_VISIBLE).toHaveBeenCalledWith(false);
    expect(toJSON).toMatchSnapshot();
  });

  it('should be header render correctly', () => {
    const { toJSON, getByTestId } = makeSUT({});

    const HEADER = getByTestId('back-button');

    expect(HEADER).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });

  it('should scrollview render correctly', () => {
    const { toJSON, getByTestId } = makeSUT({});

    const SCROLL_VIEW = getByTestId('scroll-view');

    expect(SCROLL_VIEW).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should input title render correctly', () => {
    const { toJSON, getByText } = makeSUT({});

    const TITLE = getByText('Nome');

    expect(TITLE).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });

  it('should name input render correctly', () => {
    const { toJSON, getByPlaceholderText } = makeSUT({});

    const PLACE_HOLDER = getByPlaceholderText('Ex: Saduíche');

    expect(PLACE_HOLDER).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });

  it('should name input is visible', () => {
    const { toJSON, getByPlaceholderText } = makeSUT({ name: 'Teste...' });

    const PLACE_HOLDER = getByPlaceholderText('Ex: Saduíche');

    expect(PLACE_HOLDER).toHaveProp('value', 'Teste...');
    expect(toJSON).toMatchSnapshot();
  });

  it('should setName is called', () => {
    const { toJSON, getByPlaceholderText } = makeSUT({ name: 'Teste...' });

    const PLACE_HOLDER = getByPlaceholderText('Ex: Saduíche');
    fireEvent.changeText(PLACE_HOLDER, 'Mudando texto...');

    expect(MOCK_SET_NAME).toHaveBeenCalledWith('Mudando texto...');
    expect(toJSON).toMatchSnapshot();
  });

  it('should input description render correctly', () => {
    const { toJSON, getByText } = makeSUT({});

    const TITLE = getByText('Descrição');

    expect(TITLE).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });

  it('should description input is visible', () => {
    const { toJSON, getByPlaceholderText } = makeSUT({
      description: 'Teste...',
    });

    const PLACE_HOLDER = getByPlaceholderText(
      'Ex: Sanduíche de pão integral com atum e salada de alface e tomate.'
    );

    expect(PLACE_HOLDER).toHaveProp('value', 'Teste...');
    expect(toJSON).toMatchSnapshot();
  });

  it('should setDescription is called', () => {
    const { toJSON, getByPlaceholderText } = makeSUT({
      description: 'Teste...',
    });

    const PLACE_HOLDER = getByPlaceholderText(
      'Ex: Sanduíche de pão integral com atum e salada de alface e tomate.'
    );
    fireEvent.changeText(PLACE_HOLDER, 'Mudando texto...');

    expect(MOCK_SET_DESCRIPTION).toHaveBeenCalledWith('Mudando texto...');
    expect(toJSON).toMatchSnapshot();
  });
  it('should date title render correctly', () => {
    const { toJSON, getByText } = makeSUT({});

    const TITLE = getByText('Data');

    expect(TITLE).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });

  it('should date input is visible', () => {
    const { toJSON, getByPlaceholderText } = makeSUT({
      date: '10/09/2024',
    });

    const PLACE_HOLDER = getByPlaceholderText('DD/MM/YYYY');

    expect(PLACE_HOLDER).toHaveProp('value', '10/09/2024');
    expect(toJSON).toMatchSnapshot();
  });

  it('should setDate is called', () => {
    const { toJSON, getByPlaceholderText } = makeSUT({
      date: '10/09/2024',
    });

    const PLACE_HOLDER = getByPlaceholderText('DD/MM/YYYY');
    fireEvent.changeText(PLACE_HOLDER, '11/10/2024');

    expect(MOCK_SET_DATE).toHaveBeenCalledWith('11/10/2024', undefined);
    expect(toJSON).toMatchSnapshot();
  });
  it('should date title render correctly', () => {
    const { toJSON, getByText } = makeSUT({});

    const TITLE = getByText('Hora');

    expect(TITLE).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should hour input is visible', () => {
    const { toJSON, getByPlaceholderText } = makeSUT({
      hour: '00:00',
    });

    const PLACE_HOLDER = getByPlaceholderText('00:00');

    expect(PLACE_HOLDER).toHaveProp('value', '00:00');
    expect(toJSON).toMatchSnapshot();
  });

  it('should setHour is called', () => {
    const { toJSON, getByPlaceholderText } = makeSUT({
      hour: '00:00',
    });

    const PLACE_HOLDER = getByPlaceholderText('00:00');
    fireEvent.changeText(PLACE_HOLDER, '00:01');

    expect(MOCK_SET_HOUR).toHaveBeenCalledWith('00:01', undefined);
    expect(toJSON).toMatchSnapshot();
  });
  it('should meal type question render correctly', () => {
    const { toJSON, getByText } = makeSUT({});

    const TITLE = getByText('Está dentro da dieta?');

    expect(TITLE).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should HealthyMealButton render correctly', () => {
    const { toJSON, getByText } = makeSUT({});

    const TITLE = getByText('SIM');

    expect(TITLE).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should should serHealthy was called with true', () => {
    const { toJSON, getByText } = makeSUT({});

    const TITLE = getByText('SIM');
    fireEvent.press(TITLE);

    expect(MOCK_SET_HEALTHY).toHaveBeenCalledWith(true);
    expect(toJSON).toMatchSnapshot();
  });
  it('should OffDietButton render correctly', () => {
    const { toJSON, getByText } = makeSUT({});

    const TITLE = getByText('NÃO');

    expect(TITLE).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should should serHealthy was called with false', () => {
    const { toJSON, getByText } = makeSUT({});

    const TITLE = getByText('NÃO');
    fireEvent.press(TITLE);

    expect(MOCK_SET_HEALTHY).toHaveBeenCalledWith(false);
    expect(toJSON).toMatchSnapshot();
  });
  it('should OffDietButton render correctly', () => {
    const { toJSON, getByText } = makeSUT({});

    const TITLE = getByText('Cadastrar refeição');

    expect(TITLE).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should should serHealthy was called with false', () => {
    const { toJSON, getByText } = makeSUT({});

    const TITLE = getByText('Cadastrar refeição');
    fireEvent.press(TITLE);

    expect(MOCK_HANDLE_REGISTER_MEAL).toHaveBeenCalledTimes(1);
    expect(toJSON).toMatchSnapshot();
  });
});
