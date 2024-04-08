import { fireEvent, render } from '@__tests__/utils/customRenderItem';
import { Dialog } from './view';

beforeEach(() => jest.clearAllMocks());

const mockNegativeFunction = jest.fn();
const mockPositiveFunction = jest.fn();

const PROPS = {
  dialogVisible: true,
  dialogMessage: 'teste',
  negativeTitle: 'negative-title',
  positiveTitle: 'positive-title',
  negativeFunction: mockNegativeFunction,
  positiveFunction: mockPositiveFunction,
};

describe('component dialog', () => {
  it('should render correctly', () => {
    const { toJSON, queryByText } = render(
      <Dialog
        dialogMessage={PROPS.dialogMessage}
        dialogVisible={PROPS.dialogVisible}
      />
    );
    const MESSAGE = queryByText(PROPS.dialogMessage);

    expect(MESSAGE).toBeDefined();
    expect(toJSON).toMatchSnapshot();
  });
  it('should dialog is not visible', () => {
    const { toJSON, queryByText } = render(
      <Dialog dialogMessage={PROPS.dialogMessage} dialogVisible={false} />
    );
    const MESSAGE = queryByText(PROPS.dialogMessage);

    expect(MESSAGE).toBeNull();
    expect(toJSON).toMatchSnapshot();
  });

  it('should negative button is not visible', () => {
    const { toJSON, queryByTestId } = render(
      <Dialog
        dialogMessage={PROPS.dialogMessage}
        dialogVisible={PROPS.dialogVisible}
      />
    );
    const BUTTON = queryByTestId('dialog-negative-button');

    expect(BUTTON).toBeNull();
    expect(toJSON).toMatchSnapshot();
  });
  it('should negative button is visible', () => {
    const { toJSON, getByText } = render(
      <Dialog
        dialogMessage={PROPS.dialogMessage}
        dialogVisible={PROPS.dialogVisible}
        negativeButtonTitle={PROPS.negativeTitle}
      />
    );
    const BUTTON = getByText(PROPS.negativeTitle);

    expect(BUTTON).toBeDefined();
    expect(toJSON).toMatchSnapshot();
  });
  it('should negative function is called', () => {
    const { toJSON, getByTestId } = render(
      <Dialog
        dialogMessage={PROPS.dialogMessage}
        dialogVisible={PROPS.dialogVisible}
        negativeButtonTitle={PROPS.negativeTitle}
        negativeFunction={PROPS.negativeFunction}
      />
    );
    const BUTTON = getByTestId('dialog-negative-button');
    fireEvent.press(BUTTON);

    expect(mockNegativeFunction).toHaveBeenCalledTimes(1);
    expect(toJSON).toMatchSnapshot();
  });

  it('should positive button is not visible', () => {
    const { toJSON, queryByTestId } = render(
      <Dialog
        dialogMessage={PROPS.dialogMessage}
        dialogVisible={PROPS.dialogVisible}
      />
    );
    const BUTTON = queryByTestId('dialog-positive-button');

    expect(BUTTON).toBeNull();
    expect(toJSON).toMatchSnapshot();
  });
  it('should positive button is visible', () => {
    const { toJSON, getByText } = render(
      <Dialog
        dialogMessage={PROPS.dialogMessage}
        dialogVisible={PROPS.dialogVisible}
        positiveButtonTitle={PROPS.positiveTitle}
      />
    );
    const BUTTON = getByText(PROPS.positiveTitle);

    expect(BUTTON).toBeDefined();
    expect(toJSON).toMatchSnapshot();
  });
  it('should positive function is called', () => {
    const { toJSON, getByTestId } = render(
      <Dialog
        dialogMessage={PROPS.dialogMessage}
        dialogVisible={PROPS.dialogVisible}
        positiveButtonTitle={PROPS.positiveTitle}
        positiveFunction={PROPS.positiveFunction}
      />
    );
    const BUTTON = getByTestId('dialog-positive-button');
    fireEvent.press(BUTTON);

    expect(mockPositiveFunction).toHaveBeenCalledTimes(1);
    expect(toJSON).toMatchSnapshot();
  });

  it('should be header header-transparent-button render correctly', () => {
    const { toJSON, getByTestId } = render(
      <Dialog
        dialogMessage={PROPS.dialogMessage}
        dialogVisible={PROPS.dialogVisible}
        negativeFunction={PROPS.negativeFunction}
      />
    );

    const BUTTON = getByTestId('header-transparent-button');

    expect(BUTTON).toBeDefined();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be header header-transparent-button render correctly', () => {
    const { toJSON, getByTestId } = render(
      <Dialog
        dialogMessage={PROPS.dialogMessage}
        dialogVisible={PROPS.dialogVisible}
        negativeFunction={PROPS.negativeFunction}
      />
    );

    const BUTTON = getByTestId('header-transparent-button');
    fireEvent.press(BUTTON);

    expect(mockNegativeFunction).toHaveBeenCalledTimes(1);
    expect(toJSON).toMatchSnapshot();
  });
  it('should be header footer-transparent-button render correctly', () => {
    const { toJSON, getByTestId } = render(
      <Dialog
        dialogMessage={PROPS.dialogMessage}
        dialogVisible={PROPS.dialogVisible}
        negativeFunction={PROPS.negativeFunction}
      />
    );

    const BUTTON = getByTestId('footer-transparent-button');

    expect(BUTTON).toBeDefined();
    expect(toJSON).toMatchSnapshot();
  });
  it('should be header footer-transparent-button render correctly', () => {
    const { toJSON, getByTestId } = render(
      <Dialog
        dialogMessage={PROPS.dialogMessage}
        dialogVisible={PROPS.dialogVisible}
        negativeFunction={PROPS.negativeFunction}
      />
    );

    const BUTTON = getByTestId('footer-transparent-button');
    fireEvent.press(BUTTON);

    expect(mockNegativeFunction).toHaveBeenCalledTimes(1);
    expect(toJSON).toMatchSnapshot();
  });
});
