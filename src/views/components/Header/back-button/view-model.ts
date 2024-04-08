import { useNavigation } from '@react-navigation/native';

export interface BackButtonProps {
  handleGoBack: () => void;
}

function useBackButtonViewModel(): BackButtonProps {
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  return { handleGoBack };
}

export { useBackButtonViewModel };
