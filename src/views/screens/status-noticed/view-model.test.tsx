import { useNavigation, useRoute } from '@react-navigation/native';
import { act, renderHook } from '@testing-library/react-native';
import { useStatusNoticedViewModel } from './view-model';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn(),
}));

const mockNavigation = jest.fn();

jest.mocked(useNavigation).mockReturnValue({
  navigate: mockNavigation,
});

jest.mocked(useRoute).mockReturnValue({
  params: { healthy: true },
  key: '',
  name: '',
});

describe('Screen:status-noticed', () => {
  const { result } = renderHook(() => useStatusNoticedViewModel());
  it('should be navigation to home', () => {
    act(() => result.current.handleNavigateHome());

    expect(mockNavigation).toHaveBeenCalledWith('home');
  });
});
