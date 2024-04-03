import { ReactElement, ReactNode } from 'react';
import { RenderOptions, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from '@theme/index';
import { NavigationContainer } from '@react-navigation/native';

function Providers({ children }: { children: ReactNode }) {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>;
    </NavigationContainer>
  );
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react-native';
export { customRender as render, Providers };
