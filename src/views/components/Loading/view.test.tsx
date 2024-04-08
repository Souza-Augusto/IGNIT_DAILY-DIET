import { render } from 'src/__tests__/utils/customRenderItem';
import { Loading } from './view';

beforeEach(() => jest.clearAllMocks());
describe('componen:loading', () => {
  it('should render correctly', () => {
    const { toJSON, getByTestId } = render(<Loading />);

    const LOADING = getByTestId('component-loading');
    expect(LOADING).toBeDefined;
    expect(toJSON()).toMatchSnapshot();
  });
});
