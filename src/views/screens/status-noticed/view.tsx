import {
  ConfirmRegister,
  FeaturedNoticed,
  Image,
  Container,
  Title,
  Noticed,
} from './styles';

import { useStatusNoticedViewModel } from './view-model';

export function StatusNoticed() {
  const { handleNavigateHome, healthy } = useStatusNoticedViewModel();

  return (
    <Container testID='status-noticed-container'>
      <Title mealType={healthy}>
        {healthy ? 'Continue assim!' : 'Que pena!'}
      </Title>
      <Noticed>
        {healthy ? (
          <>
            Você continua <FeaturedNoticed>dentro da dieta.</FeaturedNoticed>{' '}
            Muito bem!
          </>
        ) : (
          <>
            Você <FeaturedNoticed>saiu da dieta</FeaturedNoticed> dessa vez, mas
            continue se esforçando e não desista!
          </>
        )}
      </Noticed>
      <Image
        testID='image'
        source={
          healthy
            ? require('@assets/images/png/Illustration(1).png')
            : require('@assets/images/png/Illustration(2).png')
        }
      />
      <ConfirmRegister
        onPress={handleNavigateHome}
        title='Ir para a tela inicial'
      />
    </Container>
  );
}
