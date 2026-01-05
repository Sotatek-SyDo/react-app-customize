import { Input, InputProps } from 'antd';
import { forwardRef } from 'react';

export interface AppInputProps extends InputProps { }

export const AppInput = forwardRef<any, AppInputProps>((props, ref) => {
    return <Input ref={ref} {...props} />;
});

AppInput.displayName = 'AppInput';
