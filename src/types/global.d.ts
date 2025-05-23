import { ReactNode } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  render: (props: { field: { onChange: (value: unknown) => void; value: unknown } }) => ReactNode;
}

export interface FormProps {
  children: ReactNode;
  onSubmit?: (data: unknown) => void;
  className?: string;
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
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  title?: string;
} 