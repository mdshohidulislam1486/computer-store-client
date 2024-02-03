import { ReactNode } from 'react';

export type TSidebarItem = {
  key: string;
  label: ReactNode;
  children?: TSidebarItem[];
};

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TuserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TuserPath[];
};
