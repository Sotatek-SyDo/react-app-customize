import { useCallback, useState } from 'react';

import { Form } from 'antd';

import { AppButton } from '@/components/atoms/AppButton/AppButton';
import { AppInput } from '@/components/atoms/AppInput/AppInput';
import { AppFormItem } from '@/components/molecules/form-item';
import { useAppNotification } from '@/components/templates/notification';
import { ROUTE_PATH } from '@/constants/app';
import { HttpErrorCode, HttpErrorMessage } from '@/constants/http';
import { APIErrorResponse } from '@/types/api.type';
import { useNavigate } from 'react-router-dom';
import SuffixPass from './SuffixPass';

interface Props {
  disabled?: boolean;
}

const LoginForm = ({ disabled = false }: Props) => {
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(true);
  const { error: notifyError } = useAppNotification();
  const navigate = useNavigate();
  const setError = useCallback(
    (name: any, errors: string[] | string) => {
      const errorMessages = Array.isArray(errors) ? errors : [errors];
      form.setFields([
        {
          name,
          errors: errorMessages,
        },
      ]);
    },
    [form]
  );

  const onFinish = async (values: any) => {
    try {
      console.log(values);
      navigate(ROUTE_PATH.MY_PROFILE);
    } catch (error) {
      const errorCode: HttpErrorCode = (error as APIErrorResponse).data?.code;
      const errorMessage = HttpErrorMessage[errorCode];
      switch (errorCode) {
        case HttpErrorCode.USER_NOT_FOUND:
          setError('email', errorMessage);
          return;
        case HttpErrorCode.EMAIL_NOT_ASSOCIATED:
          setError('email', errorMessage);
          return;
        case HttpErrorCode.WRONG_PASSWORD:
          setError('password', errorMessage);
          return;
        default:
          notifyError({
            message: 'Error',
            description: errorMessage || HttpErrorMessage[HttpErrorCode.UNKNOWN_ERROR],
          });
          return;
      }
    }
  };

  return (
    <section id="login-form">
      <h5 className="form-heading">Login</h5>
      <Form disabled={disabled} className="form-main" onFinish={onFinish} form={form}>
        <AppFormItem
          name="email"
          rules={[
            { required: true, message: 'This field is required' },
            { type: 'email', message: 'Invalid email' },
          ]}
        >
          <AppInput
            prefix={'Email'}
            className="email"
            id="email"
            name="email"
            autoComplete="username"
            placeholder="Email"
          />
        </AppFormItem>
        <AppFormItem
          name="password"
          rules={[
            { required: true, message: 'This field is required' },
            { min: 8, max: 16, message: 'Invalid password' },
          ]}
        >
          <AppInput
            prefix={'Icon'}
            className="email"
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="Password"
            type={passwordVisible ? 'password' : 'text'}
            suffix={
              <div onClick={() => setPasswordVisible(!passwordVisible)} className="visible">
                <SuffixPass isVisible={passwordVisible} />
              </div>
            }
          />
        </AppFormItem>
        <div className="flex items-center justify-end my-[18px]">
          <div>Forgot Password?</div>
        </div>
        <AppButton loading={false} className="submit-btn" htmlType="submit" type="primary">
          Login
        </AppButton>
      </Form>
    </section>
  );
};
export default LoginForm;
