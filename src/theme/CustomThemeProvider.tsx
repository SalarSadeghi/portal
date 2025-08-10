
import lightTheme from './light';
import type { FC, ReactNode } from "react";
import { ThemeProvider } from './ThemeProvider';

const CustomThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = lightTheme;

  return (
    <ThemeProvider theme={theme} direction='rtl'>
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
