import { fireEvent, render } from '@__tests__/utils/customRenderItem';
import { StatusNoticeProps, useStatusNoticedViewModel } from './view-model';
import { StatusNoticed } from './view';
import '@testing-library/react-native/extend-expect';

interface CreateMockProps {
  healthy: boolean;
}

interface factoryProps {
  healthy: boolean;
}

jest.mock('./view-model');
jest.mock('@assets/images/png/Illustration(1).png', () => 1);
jest.mock('@assets/images/png/Illustration(2).png', () => 2);

beforeEach(() => jest.clearAllMocks());

const mockHandleNavigateHome = jest.fn();
const createMockViewmodel = ({
  healthy,
}: CreateMockProps): StatusNoticeProps => ({
  healthy,
  handleNavigateHome: mockHandleNavigateHome,
});

function makeSut({ healthy }: factoryProps) {
  const MOCK_VIEW_MODEL = createMockViewmodel({
    healthy,
  });

  jest.mocked(useStatusNoticedViewModel).mockReturnValueOnce(MOCK_VIEW_MODEL);

  const CONTAINER = render(<StatusNoticed />);

  return CONTAINER;
}

describe('Screen:status-noticed view-model', () => {
  it('Should be render correctly', () => {
    const { toJSON, getByTestId } = makeSut({ healthy: true });

    const CONTAINER = getByTestId('status-noticed-container');

    expect(CONTAINER).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });
  it('Should be title render correctly when healthy is true', () => {
    const { toJSON, getByText } = makeSut({ healthy: true });

    const TITLE = getByText('Continue assim!');

    expect(TITLE).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });

  it('Should be title render correctly when healthy is false', () => {
    const { toJSON, getByText } = makeSut({ healthy: false });

    const TITLE = getByText('Que pena!');

    expect(TITLE).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });
  it('Should be Noticed render correctly when healthy is true', () => {
    const { toJSON, getByText } = makeSut({ healthy: true });

    const TITLE = getByText('Você continua dentro da dieta. Muito bem!');

    expect(TITLE).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });
  it('Should be Noticed render correctly when healthy is false', () => {
    const { toJSON, getByText } = makeSut({ healthy: false });

    const TITLE = getByText(
      'Você saiu da dieta dessa vez, mas continue se esforçando e não desista!'
    );

    expect(TITLE).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });
  it('Should be Image render correctly when healthy is false', () => {
    const { toJSON, getByTestId } = makeSut({ healthy: false });

    const IMAGE = getByTestId('image');

    expect(IMAGE).toHaveProp('source', 2);

    expect(toJSON).toMatchSnapshot();
  });
  it('Should be Image render correctly when healthy is true', () => {
    const { toJSON, getByTestId } = makeSut({ healthy: true });

    const IMAGE = getByTestId('image');

    expect(IMAGE).toHaveProp('source', 1);

    expect(toJSON).toMatchSnapshot();
  });
  it('Should be ConfirmRegister button render correctly', () => {
    const { toJSON, getByText } = makeSut({ healthy: true });

    const BUTTON = getByText('Ir para a tela inicial');

    expect(BUTTON).toBeVisible();

    expect(toJSON).toMatchSnapshot();
  });

  it('Should handleNavigateHome is called', () => {
    const { toJSON, getByText } = makeSut({ healthy: true });

    const BUTTON = getByText('Ir para a tela inicial');
    fireEvent.press(BUTTON);

    expect(mockHandleNavigateHome).toHaveBeenCalledTimes(1);

    expect(toJSON).toMatchSnapshot();
  });
});
