import { render } from '@__tests__/utils/customRenderItem';
import { MealCard } from './view';

const PROPS = {
  hour: '11:00',
  meal: 'batata',
  healthy: true,
};

describe('component:meal-card', () => {
  it('should be meal render correctly', () => {
    const { toJSON, getByText } = render(
      <MealCard healthy={PROPS.healthy} hour={PROPS.hour} meal={PROPS.meal} />
    );

    const MEAL = getByText(PROPS.meal);

    expect(MEAL).toBeDefined();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be hour render correctly', () => {
    const { toJSON, getByText } = render(
      <MealCard healthy={PROPS.healthy} hour={PROPS.hour} meal={PROPS.meal} />
    );

    const HOUR = getByText(PROPS.hour);

    expect(HOUR).toBeDefined();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be mealStatus render correctly', () => {
    const { toJSON, getByTestId } = render(
      <MealCard healthy={PROPS.healthy} hour={PROPS.hour} meal={PROPS.meal} />
    );

    const STATUS = getByTestId('meal-status');

    expect(STATUS).toBeDefined();
    expect(toJSON).toMatchSnapshot();
  });
});
