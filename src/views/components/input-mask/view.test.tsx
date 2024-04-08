import { render } from '@__tests__/utils/customRenderItem';

import { InputMask } from './view';

beforeEach(() => jest.clearAllMocks());

describe('Component: Input', () => {
  it('should be render correctly', () => {
    const { getByPlaceholderText, toJSON } = render(
      <InputMask placeholder={'Testando...'} type='datetime' />
    );

    const inputContainer = getByPlaceholderText('Testando...');
    expect(inputContainer).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });

  it('should be rendered correctly with value', () => {
    const { getByPlaceholderText, toJSON } = render(
      <InputMask
        value='10/09/2024'
        placeholder={'Testando...'}
        type='datetime'
      />
    );

    const inputContainer = getByPlaceholderText('Testando...');
    expect(inputContainer).toHaveProp('value', '10/09/2024');

    expect(toJSON()).toMatchSnapshot();
  });
});
