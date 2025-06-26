'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

type HeaderStyle = 'light' | 'dark';

interface HeaderStyleContextProps {
  style: HeaderStyle;
  setStyle: (style: HeaderStyle) => void;
}

const HeaderStyleContext = createContext<
  HeaderStyleContextProps | undefined
>(undefined);
export function HeaderStyleProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [style, setStyle] = useState<HeaderStyle>('dark');

  return (
    <HeaderStyleContext.Provider value={{ style, setStyle }}>
      {children}
    </HeaderStyleContext.Provider>
  );
}

export function useHeaderStyle() {
  const context = useContext(HeaderStyleContext);
  if (context === undefined) {
    throw new Error(
      'useHeaderStyle must be used within a HeaderStyleProvider'
    );
  }
  return context;
}
