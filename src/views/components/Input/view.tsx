import { Container } from './styles';
import { TextInputProps } from 'react-native';
import theme from '@theme/index';

export function Input({ ...rest }: TextInputProps) {
  return (
    <Container
      selectionColor={theme.COLORS.GRAY_500}
      placeholderTextColor={theme.COLORS.GRAY_400}
      {...rest}
    />
  );
}
