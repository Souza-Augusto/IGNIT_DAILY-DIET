import { render } from '@__tests__/utils/customRenderItem';

import { Input } from '@components/Input/view';

beforeEach(() => jest.clearAllMocks());

function makeSut({ ...props }) {
  const sut = render(
    <Input value='teste' placeholder='Testando...' {...props} />
  );

  return sut;
}

describe('Component: Input', () => {
  it('should be render correctly', () => {
    const { getByPlaceholderText, toJSON } = makeSut({});

    const inputContainer = getByPlaceholderText('Testando...');
    expect(inputContainer).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  it('should be rendered correctly with value', () => {
    const { getByPlaceholderText, toJSON } = makeSut({});

    const inputContainer = getByPlaceholderText('Testando...');
    expect(inputContainer).toHaveProp('value', 'teste');

    expect(toJSON()).toMatchSnapshot();
  });
});
