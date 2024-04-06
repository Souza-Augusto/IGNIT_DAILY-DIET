import { useEffect } from 'react';
import { Header } from '@components/Header';
import {
  Container,
  InputTitle,
  RegisterMealContainer,
  InputDescription,
  DateTimeInputContainer,
  InputMaskContainer,
  DateTime,
  Question,
  MealsTypeButtonContainer,
  MealsType,
  DateTimeInput,
  OffDietButton,
  HealthyMealButton,
} from './styles';
import { Button } from '@components/Button/view';
import { Input } from '@components/Input/view';
import { ScrollView } from 'react-native';

import { Loading } from '@components/Loading/view';
import { useMealUpdateViewModel } from './view-model';
import { Dialog } from '@components/dialog/view';

export function MealUpdate() {
  const {
    date,
    description,
    dialogMessage,
    dialogVisible,
    setDialogVisible,
    healthy,
    hour,
    isLoading,
    name,
    setDate,
    setDescription,
    setHealthy,
    setHour,
    setName,
    handleMealUpdate,
    fetchData,
  } = useMealUpdateViewModel();

  useEffect(() => {
    fetchData();
  }, []);
  if (isLoading) {
    <Loading />;
  }
  return (
    <Container testID='container'>
      <Dialog
        negativeButtonTitle='Fechar'
        negativeFunction={() => setDialogVisible(false)}
        dialogMessage={dialogMessage}
        dialogVisible={dialogVisible}
      />
      <Header.Root>
        <Header.BackButton />
        <Header.Title title='Alterar Refeição' />
      </Header.Root>

      <RegisterMealContainer>
        <ScrollView testID='scroll-view' showsVerticalScrollIndicator={false}>
          <InputTitle>Nome</InputTitle>

          <Input
            placeholder='Ex: Saduíche'
            value={name}
            onChangeText={setName}
          />

          <InputTitle>Descrição</InputTitle>

          <InputDescription
            placeholder='Ex: Sanduíche de pão integral com atum e salada de alface e tomate.'
            value={description}
            multiline
            onChangeText={setDescription}
          />

          <DateTimeInputContainer>
            <InputMaskContainer>
              <DateTime>Data</DateTime>

              <DateTimeInput
                placeholder='DD/MM/YYYY'
                value={date}
                onChangeText={setDate}
                type='datetime'
                options={{
                  format: 'DD/MM/YYYY',
                }}
              />
            </InputMaskContainer>
            <InputMaskContainer>
              <DateTime>Hora</DateTime>

              <DateTimeInput
                placeholder='00:00'
                value={hour}
                onChangeText={setHour}
                type='datetime'
                options={{
                  format: 'HH:mm',
                }}
              />
            </InputMaskContainer>
          </DateTimeInputContainer>
          <Question>Está dentro da dieta?</Question>
          <MealsTypeButtonContainer>
            <HealthyMealButton
              onPress={() => setHealthy(true)}
              mealType={healthy}
              type='SECONDARY'
              title='SIM'
              before={<MealsType mealType />}
            />
            <OffDietButton
              type='SECONDARY'
              mealType={healthy}
              onPress={() => setHealthy(false)}
              title='NÃO'
              before={<MealsType mealType={false} />}
            />
          </MealsTypeButtonContainer>
        </ScrollView>

        <Button
          style={{ marginBottom: 10 }}
          onPress={handleMealUpdate}
          title='Salvar alterações'
        />
      </RegisterMealContainer>
    </Container>
  );
}
