import { Button } from '@components/Button/view';
import styled, { css } from 'styled-components/native';

type MealTypeProps = {
  mealType: boolean | null;
};

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  align-items: center;
  justify-content: center;
`;
export const Title = styled.Text<MealTypeProps>`
  ${({ theme, mealType }) => css`
    font-size: ${theme.FONT_SIZE.XL}px;
    color: ${mealType ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`;

export const Noticed = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.M}px;
    margin: 8px 16px 40px 16px;
  `}
`;
export const FeaturedNoticed = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.M}px;
    margin-bottom: 40px;
    margin-top: 8px;
  `}
`;
export const Image = styled.Image`
  object-fit: contain;
  margin-bottom: 32px;
`;
export const ConfirmRegister = styled(Button)`
  padding-left: 24px;
  padding-right: 24px;
`;
