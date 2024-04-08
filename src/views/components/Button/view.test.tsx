import { fireEvent, render } from '@__tests__/utils/customRenderItem';
import { Button } from './view';

beforeEach(() => jest.clearAllMocks());

const mockFunction = jest.fn();

const BUTTON_PROPS = {
  title: 'teste',
  onPress: mockFunction,
};

describe('component:button', () => {
  it('should be render correctly', () => {
    const { getByText } = render(<Button title={BUTTON_PROPS.title} />);

    const BUTTON = getByText(BUTTON_PROPS.title);

    expect(BUTTON).toBeDefined();
  });
  it('should button function is called', () => {
    const { getByText, toJSON } = render(
      <Button title={BUTTON_PROPS.title} onPress={BUTTON_PROPS.onPress} />
    );

    const BUTTON = getByText(BUTTON_PROPS.title);
    fireEvent.press(BUTTON);

    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(toJSON()).toMatchSnapshot();
  });
});
