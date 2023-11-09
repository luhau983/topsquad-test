import { FC } from 'react';

import { TextInput, TextInputProps } from '@mantine/core';

import './style.scss';
import Icon from '../Icon';

type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof TextInputProps>;

interface IProps extends TextInputProps, HTMLInputProps {
  error?: boolean;
  classNames?: IClassName;
  size?: Size;
}

type Size = 'sm' | 'md';

interface IClassName {
  root?: string;
  input?: string;
  section?: string;
  error?: string;
  wrapper?: string;
  label?: string;
  required?: string;
  description?: string;
}

const Input: FC<IProps> = ({ leftSection, rightSection, error, classNames, size = 'md', ...rest }: IProps) => {
  const sizes = {
    sm: 'h-10',
    md: 'h-12',
  };

  const clsRoot = () => {
    const cls: IClassName = {
      ...classNames,
      wrapper: `${sizes[size]} ` + classNames?.root,
      error: 'text-right ' + classNames?.error,
    };
    if (leftSection) {
      cls.input = cls.input + ' !pl-12';
      cls.section = cls.section + ' !m-3 !w-auto';
    }

    if (error || rightSection) {
      cls.input = cls.input + ' !pr-12';
      cls.section = cls.section + ' !m-3 !w-auto';
    }
    return cls;
  };

  return (
    <TextInput
      {...rest}
      error={error}
      className={'a-input ' + rest.className}
      classNames={clsRoot}
      leftSection={leftSection}
      rightSection={error ? <Icon iconName="ic_error" /> : rightSection}
    />
  );
};

export default Input;
