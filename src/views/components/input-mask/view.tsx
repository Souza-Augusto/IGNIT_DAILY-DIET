import { Container } from './styles';
import { TextInputMaskProps } from 'react-native-masked-text';
import theme from '@theme/index';

export function InputMask({ type, ...rest }: TextInputMaskProps) {
  return (
    <Container
      selectionColor={theme.COLORS.GRAY_500}
      placeholderTextColor={theme.COLORS.GRAY_400}
      type={type}
      {...rest}
    ></Container>
  );
}
