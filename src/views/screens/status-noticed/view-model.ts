import { useRoute, useNavigation } from '@react-navigation/native';

type RouteParams = {
  healthy: boolean;
};

export interface StatusNoticeProps {
  healthy: boolean;
  handleNavigateHome: () => void;
}

function useStatusNoticedViewModel(): StatusNoticeProps {
  const route = useRoute();
  const { healthy } = route.params as RouteParams;
  const { navigate } = useNavigation();

  function handleNavigateHome() {
    navigate('home');
  }

  return { healthy, handleNavigateHome };
}
export { useStatusNoticedViewModel };
