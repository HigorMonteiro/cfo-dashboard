import { ReactNode } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export interface FormFieldProps {
  control: any;
  name: string;
  render: (props: { field: any }) => ReactNode;
}

export interface FormProps {
  children: ReactNode;
  [key: string]: any;
}

export interface FormItemProps {
  children: ReactNode;
}

export interface FormLabelProps {
  children: ReactNode;
}

export interface FormControlProps {
  children: ReactNode;
}

export interface FormMessageProps {
  children?: ReactNode;
}

export interface CardProps {
  children: ReactNode;
  className?: string;
}

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: ReactNode;
}

export interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: string;
  size?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface InputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
} 