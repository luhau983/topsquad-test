import React, { useCallback, useState } from 'react';

import { Button } from '@components/atoms/Button';
import Input from '@components/atoms/Input';
import Text from '@components/atoms/Text';
import LoginLayout from '@components/layouts/Login';
import { authInstance } from '@infrastructure/instances';
import { notifications } from '@mantine/notifications';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import GlobalService from '@/core/domain/services/Global.service';
import { TRegisterDTO } from '@/core/infrastructure/dto/AuthDTO';

const Register = () => {
  /**
   * Define
   */
  const { t: trans } = useTranslation();
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    rePassword: '',
  });

  const [register, setIsRegister] = useState(false);

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
      setIsRegister(true);
      const registerParams: TRegisterDTO = {
        username: formValues.username,
        password: formValues.password,
        email: formValues.email,
        phone: formValues.phone,
        role: ['USER'],
      };
      const res = await authInstance.register(registerParams);
      if (res?.data) {
        notifications.show({
          color: 'green',
          title: 'Đăng ký thành công!',
          message: undefined,
        });
      }
    } catch (error) {
      const errData = GlobalService.handleErrorAPI(error);
      notifications.show({
        color: 'red',
        title: 'Lỗi đăng ký',
        message: JSON.stringify(errData),
        autoClose: 4000,
      });
    } finally {
      setTimeout(() => setIsRegister(false), 500);
    }
  };
  return (
    <LoginLayout>
      <div className="w-fit flex flex-col gap-8 justify-center px-10 absolute inset-0 m-auto">
        <Text typeClass="base-h-2" className="text-neutral-7">
          {trans('auth.title_register')}
        </Text>
        <div>
          <form className="form max-w-[300px] flex flex-col gap-3 mt-2" onSubmit={handleSubmit}>
            <Input
              className="w-[296px] h-12"
              value={formValues.username}
              name="username"
              onChange={handleChangeInputForm}
              placeholder="Nhập Username"
            />
            <Input
              className="w-[296px] h-12"
              value={formValues.email}
              name="email"
              onChange={handleChangeInputForm}
              placeholder="Nhập Email"
            />
            <Input
              className="w-[296px] h-12"
              value={formValues.phone}
              name="phone"
              onChange={handleChangeInputForm}
              placeholder="Nhập SĐT"
            />

            <Input
              className="w-[296px] h-12"
              value={formValues.password}
              name="password"
              type="password"
              onChange={handleChangeInputForm}
              placeholder="Mật khẩu"
            />
            <Input
              className="w-[296px] h-12"
              value={formValues.rePassword}
              name="rePassword"
              type="password"
              onChange={handleChangeInputForm}
              placeholder="Nhập lại mật khẩu"
            />

            <Button
              disabled={register}
              type="submit"
              loading={register}
              className={clsx('!bg-primary-1', {
                'opacity-70 pointer-events-none ':
                  !(formValues.password && formValues.username && formValues.rePassword) ||
                  formValues.password !== formValues.rePassword,
              })}
            >
              <Text typeClass="button-1" className="text-white">
                Đăng ký
              </Text>
            </Button>
          </form>
        </div>

        <div className="flex gap-1">
          <Text typeClass="body-2-semibold">Bạn đã có tài khoản? </Text>
          <Link to={'/login'}>
            <Text typeClass="body-2-semibold" className="cursor-pointer text-neutral-7">
              Đăng nhập ngay
            </Text>
          </Link>
        </div>
      </div>
    </LoginLayout>
  );
};
export default Register;
