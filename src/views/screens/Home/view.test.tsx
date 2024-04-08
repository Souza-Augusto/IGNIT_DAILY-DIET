import { listMealDTO } from '@dtos/meal-dtos';
import { HomeViewModelProps, useHomeViewModel } from './view-model';
import { fireEvent, render } from '@__tests__/utils/customRenderItem';
import { Home } from './view';

interface FactoryProps {
  data?: listMealDTO[];
  loading?: boolean;
  dialogVisible?: boolean;
  dialogTitle?: string;
  cardColor?: string;
  arrowIcon?: string;
  percentage?: string;
}

interface CreateMockViewModelProps {
  data: listMealDTO[];
  loading: boolean;
  dialogVisible: boolean;
  dialogTitle: string;
  cardColor: string;
  arrowIcon: string;
  percentage: string;
}

beforeEach(() => jest.clearAllMocks());

jest.mock('./view-model');

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

const MOCK_FETCH_MEALS = jest.fn();
const MOCK_HANDLE_NAVIGATE_MEAL_DETAILS = jest.fn();
const MOCK_HANDLE_NAVIGATE_RESGISTER_MEAL = jest.fn();
const MOCK_HANDLE_NAVIGATE_STATISTICS = jest.fn();
const MOCK_SET_DIALOG_TITLE = jest.fn();
const MOCK_SET_DIALOG_VISIBLE = jest.fn();
const MOCK_SET_LOADING = jest.fn();

const CREATE_MOCK_VIEW_MODEL = ({
  arrowIcon,
  cardColor,
  data,
  dialogTitle,
  dialogVisible,
  loading,
  percentage,
}: CreateMockViewModelProps): HomeViewModelProps => ({
  arrowIcon,
  cardColor,
  data,
  dialogTitle,
  dialogVisible,
  loading,
  percentage,
  fetchMeals: MOCK_FETCH_MEALS,
  handleNavigateMealDetails: MOCK_HANDLE_NAVIGATE_MEAL_DETAILS,
  handleNavigateResgisterMeal: MOCK_HANDLE_NAVIGATE_RESGISTER_MEAL,
  handleNavigateStatistcs: MOCK_HANDLE_NAVIGATE_STATISTICS,
  setDialogTitle: MOCK_SET_DIALOG_TITLE,
  setDialogVisible: MOCK_SET_DIALOG_VISIBLE,
  setLoading: MOCK_SET_LOADING,
});

function makeSUT({
  arrowIcon = '',
  cardColor = '',
  data = [],
  dialogTitle = '',
  dialogVisible = false,
  loading = false,
  percentage = '',
}: FactoryProps) {
  const MOCK_VIEW_MODEL = CREATE_MOCK_VIEW_MODEL({
    arrowIcon,
    cardColor,
    data,
    dialogTitle,
    dialogVisible,
    loading,
    percentage,
  });

  jest.mocked(useHomeViewModel).mockReturnValueOnce(MOCK_VIEW_MODEL);

  const SUT = render(<Home />);

  return SUT;
}

describe('screen:home view model', () => {
  it('shuld be render correctly', () => {
    const { toJSON, getByTestId } = makeSUT({});

    const CONTAINER = getByTestId('home-container');

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
      dialogTitle: 'teste',
    });

    const DIALOG_CONTAINER = getByText('teste');

    expect(DIALOG_CONTAINER).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });

  it('should dialog negative function is called', () => {
    const { toJSON, getByTestId } = makeSUT({
      dialogVisible: true,
      dialogTitle: 'teste',
    });

    const BUTTON = getByTestId('header-transparent-button');
    fireEvent.press(BUTTON);

    expect(MOCK_SET_DIALOG_VISIBLE).toHaveBeenCalledWith(false);
    expect(toJSON).toMatchSnapshot();
  });
  it('should be header render correctly', () => {
    const { toJSON, getByTestId } = makeSUT({});

    const IMAGE1 = getByTestId('header-profile');
    const IMAGE2 = getByTestId('header-logo');

    expect(IMAGE1).toBeVisible();
    expect(IMAGE2).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });

  it('should be card render correctly', () => {
    const { toJSON, getByTestId } = makeSUT({});

    const CARD = getByTestId('card');

    expect(CARD).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });

  it('should handleNavigateStatistcs is called', () => {
    const { toJSON, getByTestId } = makeSUT({});

    const CARD = getByTestId('card');
    fireEvent.press(CARD);

    expect(MOCK_HANDLE_NAVIGATE_STATISTICS).toHaveBeenCalledTimes(1);
    expect(toJSON).toMatchSnapshot();
  });
  it('should be card title render correctly', () => {
    const { toJSON, getByText } = makeSUT({
      percentage: '0,00%',
    });

    const TITLE = getByText('0,00%');

    expect(TITLE).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be card description render correctly', () => {
    const { toJSON, getByText } = makeSUT({});

    const DESCRIPTION = getByText('das refeições dentro da sua dieta');

    expect(DESCRIPTION).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be meals title render correctly', () => {
    const { toJSON, getByText } = makeSUT({});

    const TITLE = getByText('Refeições');

    expect(TITLE).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be meal-details navigation buttOn render correctly', () => {
    const { toJSON, getByText } = makeSUT({});

    const BUTTON = getByText('Nova refeição');

    expect(BUTTON).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should handleNavigateResgisterMeal is called', () => {
    const { toJSON, getByText } = makeSUT({});

    const BUTTON = getByText('Nova refeição');
    fireEvent.press(BUTTON);

    expect(MOCK_HANDLE_NAVIGATE_RESGISTER_MEAL).toHaveBeenCalledTimes(1);
    expect(toJSON).toMatchSnapshot();
  });
  it('should be meals list render correctly', () => {
    const { toJSON, getByTestId } = makeSUT({});

    const SECTION_LIST = getByTestId('meals-list');

    expect(SECTION_LIST).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be ListEmpty Component render correctly', () => {
    const { toJSON, getByText } = makeSUT({});

    const LIST_EMPTY = getByText(
      'Sua lista de refeições está vazia, que tal cadastrar uma nova refeição?'
    );

    expect(LIST_EMPTY).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be list items render correctly', () => {
    const { toJSON, getAllByText } = makeSUT({ data: EXPECTED_DATA });

    EXPECTED_DATA.forEach((item) => {
      item.data.forEach((item, index) => {
        const NAME = getAllByText(item.name);
        const HOUR = getAllByText(item.hour);

        expect(NAME[index]).toBeVisible();
        expect(HOUR[index]).toBeVisible();
      });
    });

    expect(toJSON).toMatchSnapshot();
  });

  it('should be list title render correctly', () => {
    const { toJSON, getAllByTestId } = makeSUT({ data: EXPECTED_DATA });

    EXPECTED_DATA.forEach((item, index) => {
      const TITLE = getAllByTestId('list-title');

      expect(TITLE[index]).toHaveProp('children', item.title);
    });

    expect(toJSON).toMatchSnapshot();
  });
  it('should handleNavigateMealDetails is called', () => {
    const { toJSON, getAllByTestId } = makeSUT({ data: EXPECTED_DATA });

    const CARD = getAllByTestId('meal-card-container');
    fireEvent.press(CARD[0]);

    expect(MOCK_HANDLE_NAVIGATE_MEAL_DETAILS).toHaveBeenCalledWith({
      id: '1',
      hour: '10:10',
      date: '12/12/2024',
      name: 'Banana',
      healthy: true,
      description: 'teste',
      createdAt: '20/09/2023',
      updatedAt: '',
    });
    expect(toJSON).toMatchSnapshot();
  });
});
