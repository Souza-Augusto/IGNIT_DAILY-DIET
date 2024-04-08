import { render } from '@__tests__/utils/customRenderItem';
import { ListEmpty } from './view';

describe('component:list-empty', () => {
  it('should render correctly', () => {
    const { toJSON, getByText } = render(<ListEmpty message='teste...' />);

    const LIST_EMPTY = getByText('teste...');

    expect(LIST_EMPTY).toBeDefined();
    expect(toJSON()).toMatchSnapshot();
  });
});
