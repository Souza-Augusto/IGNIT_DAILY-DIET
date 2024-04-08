import { render } from '@__tests__/utils/customRenderItem';
import { Root } from './view';

describe('component header root', () => {
  it('should render correcttly', () => {
    const { toJSON, getByTestId } = render(<Root />);

    const CONTAINER = getByTestId('header-root');

    expect(CONTAINER).toBeDefined();
    expect(toJSON).toMatchSnapshot();
  });
});
