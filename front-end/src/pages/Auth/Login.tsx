import React, { useCallback, useState } from 'react';

import { Button } from '@components/atoms/Button';
import Icon from '@components/atoms/Icon';
import Input from '@components/atoms/Input';
import Text from '@components/atoms/Text';
import LoginLayout from '@components/layouts/Login';
import { authInstance } from '@infrastructure/instances';
import { notifications } from '@mantine/notifications';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import GlobalService from '@/core/domain/services/Global.service';

const Login = () => {
  /**
   * Define
   */
  const navigate = useNavigate();
  const { t: trans } = useTranslation();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const [isLogin, setIsLogin] = useState(false);

  /**
   * Function
   */
  const handleChangeInputForm = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLogin(true);
      const res = await authInstance.login({ ...formValues, username: formValues.username.toLowerCase() });
      console.log(res);
      if (res?.data.token) {
        navigate('/dashboard');
        notifications.show({
          color: 'green',
          title: 'Đăng nhập thành công!',
          message: undefined,
        });
      }
    } catch (error) {
      const errData = GlobalService.handleErrorAPI(error);
      notifications.show({
        color: 'red',
        title: 'Lỗi đăng nhập',
        message: JSON.stringify(errData),
        autoClose: 4000,
      });
    } finally {
      setTimeout(() => setIsLogin(false), 500);
    }
  };

  return (
    <LoginLayout>
      <div className="w-fit flex flex-col gap-8 justify-center px-10 absolute inset-0 m-auto">
        <Text typeClass="base-h-2" className="text-neutral-7">
          {trans('auth.title_login')}
        </Text>
        <div>
          <Text typeClass="caption-1" className="text-neutral-7">
            Đăng nhập với Username của bạn
          </Text>

          <form className="form max-w-[300px] flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
            <Input
              className="w-[296px] h-12"
              value={formValues.username}
              name="username"
              onChange={handleChangeInputForm}
              placeholder="Nhập Username"
              leftSection={<Icon iconName="ic_mail" svgProps={{ className: 'text-gray-400' }} />}
            />

            <Input
              className="w-[296px] h-12"
              value={formValues.password}
              name="password"
              type="password"
              onChange={handleChangeInputForm}
              placeholder="Mật khẩu"
              leftSection={
                <Icon
                  iconName="ic_lock"
                  svgProps={{
                    className: 'text-gray-400',
                  }}
                />
              }
            />

            <Button
              disabled={isLogin}
              type="submit"
              loading={isLogin}
              className={clsx('!bg-primary-1', {
                'opacity-70 pointer-events-none ': !(formValues.password && formValues.username),
              })}
            >
              <Text typeClass="button-1" className="text-white">
                Đăng nhập
              </Text>
            </Button>
          </form>
        </div>

        <div className="flex gap-1">
          <Text typeClass="body-2-semibold">Bạn chưa có tài khoản? </Text>
          <Link to={'/register'}>
            <Text typeClass="body-2-semibold" className="cursor-pointer text-neutral-7">
              Đăng ký ngay
            </Text>
          </Link>
        </div>
      </div>
    </LoginLayout>
  );
};
export default Login;
