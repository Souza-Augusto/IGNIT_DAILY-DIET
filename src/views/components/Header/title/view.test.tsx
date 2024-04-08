import { render } from '@__tests__/utils/customRenderItem';
import { Title } from './view';

describe('component header title', () => {
  it('shoul render correctly', () => {
    const { toJSON, getByText } = render(<Title title='teste...' />);

    const TITLE = getByText('teste...');

    expect(TITLE).toBeDefined();
    expect(toJSON).toMatchSnapshot();
  });
});
