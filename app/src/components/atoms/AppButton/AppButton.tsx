import { Button, ButtonProps } from 'antd';
import { forwardRef } from 'react';
import { AppButtonColor } from './types';

export interface AppButtonProps extends Omit<ButtonProps, 'color'> {
  color?: AppButtonColor;
}

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    { color: _color, type = 'primary', size = 'middle', className, ...props }: AppButtonProps,
    ref
  ) => {
    return <Button ref={ref} type={type} size={size} className={className} {...props} />;
  }
);

AppButton.displayName = 'AppButton';
