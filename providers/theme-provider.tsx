'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

type ColorTheme = 'orange' | 'green' | 'blue' | 'purple';

interface AppThemeContextType {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  colorTheme: ColorTheme;
  setColorTheme: (colorTheme: ColorTheme) => void;
}

const AppThemeContext = createContext<
  AppThemeContextType | undefined
>(undefined);

const COLOR_THEME_STORAGE_KEY = 'data-color-theme';

function useColorThemeManager() {
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(
    () => {
      if (typeof window === 'undefined') {
        return 'orange';
      }
      try {
        const storedItem = localStorage.getItem(
          COLOR_THEME_STORAGE_KEY
        ) as ColorTheme | null;
        return storedItem ? storedItem : 'orange';
      } catch (error) {
        console.warn('Error reading localStorage:', error);
        return 'orange';
      }
    }
  );

  useEffect(() => {
    document.body.setAttribute('data-color-theme', colorTheme);
    localStorage.setItem(COLOR_THEME_STORAGE_KEY, colorTheme);
  }, [colorTheme]);

  return { colorTheme, setColorTheme: setColorThemeState };
}

function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useNextTheme();
  const { colorTheme, setColorTheme } = useColorThemeManager();

  return (
    <AppThemeContext.Provider
      value={{ theme, setTheme, colorTheme, setColorTheme }}
    >
      {children}
    </AppThemeContext.Provider>
  );
}

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      storageKey="theme"
      defaultTheme="system"
      {...props}
    >
      <AppThemeProvider>{children}</AppThemeProvider>
    </NextThemesProvider>
  );
}

export const useTheme = () => {
  const context = useContext(AppThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
