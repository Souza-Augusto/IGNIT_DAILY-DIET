import {
  Container,
  DetaisMealContainer,
  Meal,
  Description,
  DateTimeTitle,
  DateTime,
  MealTypeContainer,
  MealType,
  MealTypeDescription,
  ButtonContainer,
  Button,
  PencilIcon,
} from './styles';
import Trash from '@assets/images/svg/Trash.svg';
import { Dialog } from '@components/dialog/view';
import { useMealDetailsViewModel } from './view-model';
import { Header } from '@components/Header';

export function MealDetails() {
  const {
    alert,
    deleteMeal,
    dialogMessage,
    dialogVisible,
    meal,
    handleNavigationRegisterMeal,
    setDialogVisible,
    dialogPositiveButtonTitle,
  } = useMealDetailsViewModel();

  return (
    <Container mealType={meal.healthy} testID='container'>
      <Dialog
        dialogVisible={dialogVisible}
        dialogMessage={dialogMessage}
        positiveFunction={deleteMeal}
        negativeFunction={() => setDialogVisible(false)}
        positiveButtonTitle={dialogPositiveButtonTitle}
        negativeButtonTitle='Não'
      />

      <Header.Root>
        <Header.BackButton />
        <Header.Title title={'Refeição'} />
      </Header.Root>
      <DetaisMealContainer testID='detais-meal-container'>
        <Meal>{meal.name}</Meal>
        <Description>{meal.description}</Description>
        <DateTimeTitle>Data e Hora</DateTimeTitle>
        <DateTime testID='date-time'>
          {meal.date} às {meal.hour}
        </DateTime>
        <MealTypeContainer>
          <MealType mealType={meal.healthy} />
          <MealTypeDescription numberOfLines={1}>
            {meal.healthy ? 'dentro da dieta' : 'fora da dieta'}
          </MealTypeDescription>
        </MealTypeContainer>
        <ButtonContainer>
          <Button
            onPress={handleNavigationRegisterMeal}
            before={<PencilIcon />}
            title='Editar Refeição'
          />
          <Button
            before={<Trash />}
            onPress={alert}
            type='SECONDARY'
            title='Excluir Refeição'
          />
        </ButtonContainer>
      </DetaisMealContainer>
    </Container>
  );
}
