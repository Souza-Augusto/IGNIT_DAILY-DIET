import {
  Description,
  Container,
  Percentage,
  StatisticsContainer,
  StatistcsTitle,
  Card,
  Amount,
  CardDescription,
  MealsTypeContainer,
  MealsTypeCard,
} from './styles';
import { useFocusEffect } from '@react-navigation/native';

import { Header } from '@components/Header';
import { useCallback } from 'react';
import { useStatiticsViewModel } from './view-model';

export function Statistics() {
  const {
    bestSequence,
    calculateStatistcs,
    mealsMade,
    mealsOffDiet,
    mealsOnDiet,
    percentage,
    backButtonColor,
    backgroundColor,
  } = useStatiticsViewModel();

  useFocusEffect(
    useCallback(() => {
      calculateStatistcs();
    }, [])
  );

  return (
    <Container testID='container' background={backgroundColor}>
      <Header.Root>
        <Header.BackButton color={backButtonColor} />
      </Header.Root>
      <Percentage>{percentage}</Percentage>
      <Description>das refeições dentro da sua dieta</Description>
      <StatisticsContainer>
        <StatistcsTitle>Estatísticas gerais</StatistcsTitle>
        <Card>
          <Amount>{bestSequence}</Amount>
          <CardDescription>
            Melhor sequência de pratos dentro da dieta
          </CardDescription>
        </Card>
        <Card>
          <Amount>{mealsMade}</Amount>
          <CardDescription>Refeições Registradas</CardDescription>
        </Card>
        <MealsTypeContainer>
          <MealsTypeCard type={'GREEN'}>
            <Amount>{mealsOnDiet}</Amount>
            <CardDescription numberOfLines={2}>
              refeições dentro da dieta
            </CardDescription>
          </MealsTypeCard>
          <MealsTypeCard>
            <Amount>{mealsOffDiet}</Amount>
            <CardDescription numberOfLines={2}>
              {' '}
              refeições fora da dieta
            </CardDescription>
          </MealsTypeCard>
        </MealsTypeContainer>
      </StatisticsContainer>
    </Container>
  );
}
