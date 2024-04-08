import { useBackButtonViewModel, BackButtonProps } from './view-model';
import { BackButton } from './view';
import { fireEvent, render } from '@__tests__/utils/customRenderItem';

beforeEach(() => jest.clearAllMocks());

jest.mock('./view-model');
jest.mock('@expo/vector-icons');

const mockedGoback = jest.fn();
const createMockHeaderBackButtonViewModel = (): BackButtonProps => ({
  handleGoBack: mockedGoback,
});

function makeSut() {
  const mockHeaderBackButtonViewModel = createMockHeaderBackButtonViewModel();
  (useBackButtonViewModel as jest.Mock).mockReturnValueOnce(
    mockHeaderBackButtonViewModel
  );

  const sut = render(<BackButton />);

  return sut;
}

describe('Component:back-button view', () => {
  it('should be render correctly', () => {
    const { toJSON, getByTestId } = makeSut();

    const container = getByTestId('back-button');
    expect(container).toBeDefined();
    expect(toJSON()).toMatchSnapshot();
  });
  it('should call handleGoback function', () => {
    const { toJSON, getByTestId } = makeSut();

    const container = getByTestId('back-button');
    fireEvent.press(container);

    expect(mockedGoback).toHaveBeenCalledTimes(1);
    expect(toJSON()).toMatchSnapshot();
  });
});
