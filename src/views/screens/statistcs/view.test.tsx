import { render } from '@__tests__/utils/customRenderItem';
import { Statistics } from './view';
import { useStatiticsViewModel, StatistcsProps } from './view-model';

interface FactoryProps {
  mealsMade?: number;
  mealsOnDiet?: number;
  mealsOffDiet?: number;
  bestSequence?: number;
  percentage?: string;
  backButtonColor?: string;
  backgroundColor?: string;
}

interface CreateMockViewModelProps {
  mealsMade: number;
  mealsOnDiet: number;
  mealsOffDiet: number;
  bestSequence: number;
  percentage: string;
  backButtonColor: string;
  backgroundColor: string;
}

jest.mock('./view-model');

const MOCK_CALCULATE_STATISTICS = jest.fn();

const CREATE_MOCK_VIEW_MODEL = ({
  backButtonColor,
  backgroundColor,
  bestSequence,
  mealsMade,
  mealsOffDiet,
  mealsOnDiet,
  percentage,
}: CreateMockViewModelProps): StatistcsProps => ({
  backButtonColor,
  backgroundColor,
  bestSequence,
  calculateStatistcs: MOCK_CALCULATE_STATISTICS,
  mealsMade,
  mealsOffDiet,
  mealsOnDiet,
  percentage,
});

function makeSUT({
  backButtonColor = '',
  backgroundColor = '',
  bestSequence = 0,
  mealsMade = 0,
  mealsOffDiet = 0,
  mealsOnDiet = 0,
  percentage = '0,00%',
}: FactoryProps) {
  const MOCK_VIEW_MODEL = CREATE_MOCK_VIEW_MODEL({
    backButtonColor,
    backgroundColor,
    bestSequence,
    mealsMade,
    mealsOffDiet,
    mealsOnDiet,
    percentage,
  });

  jest.mocked(useStatiticsViewModel).mockReturnValue(MOCK_VIEW_MODEL);

  const SUT = render(<Statistics />);

  return SUT;
}

describe('Screen:statiscs view', () => {
  it('should be render correctly', () => {
    const { toJSON, getByTestId } = makeSUT({});

    const CONTAINER = getByTestId('container');

    expect(CONTAINER).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be header render correctly', () => {
    const { toJSON, getByTestId } = makeSUT({});

    const HEADER = getByTestId('back-button');

    expect(HEADER).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be percentage render correctly', () => {
    const { toJSON, getByText } = makeSUT({ percentage: '10,00%' });

    const PERCENTAGE = getByText('10,00%');

    expect(PERCENTAGE).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be description render correctly', () => {
    const { toJSON, getByText } = makeSUT({});

    const DESCRIPTION = getByText('das refeições dentro da sua dieta');

    expect(DESCRIPTION).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be StatistcsTitle render correctly', () => {
    const { toJSON, getByText } = makeSUT({});

    const STATISTCS_TITLE = getByText('Estatísticas gerais');

    expect(STATISTCS_TITLE).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be bestSequence render correctly', () => {
    const { toJSON, getByText } = makeSUT({ bestSequence: 10 });

    const BEST_SEQUENCE = getByText('10');

    expect(BEST_SEQUENCE).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be mealsMade render correctly', () => {
    const { toJSON, getByText } = makeSUT({ mealsMade: 10 });

    const MEALS_MADE = getByText('10');

    expect(MEALS_MADE).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should mealsOnDiet is visible', () => {
    const { toJSON, getByText } = makeSUT({ mealsOnDiet: 10 });

    const MEALS_ON_DIET = getByText('10');
    const CARD_DESCRIPTION = getByText('refeições dentro da dieta');

    expect(MEALS_ON_DIET).toBeVisible();
    expect(CARD_DESCRIPTION).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
  it('should mealsOffDiet is visible', () => {
    const { toJSON, getByText } = makeSUT({ mealsOffDiet: 10 });

    const MEALS_OFF_DIET = getByText('10');
    const CARD_DESCRIPTION = getByText('refeições fora da dieta');

    expect(MEALS_OFF_DIET).toBeVisible();
    expect(CARD_DESCRIPTION).toBeVisible();
    expect(toJSON).toMatchSnapshot();
  });
});
