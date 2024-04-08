import { BackIconContainer, BackIcon } from './styles';
import { useBackButtonViewModel } from './view-model';

interface Props {
  color?: string;
}

export function BackButton({ color }: Props) {
  const { handleGoBack } = useBackButtonViewModel();

  return (
    <BackIconContainer testID='back-button' onPress={handleGoBack}>
      <BackIcon name='arrowleft' color={color} />
    </BackIconContainer>
  );
}
