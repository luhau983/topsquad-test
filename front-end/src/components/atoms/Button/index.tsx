import { Button as ButtonCore, Tooltip } from '@mantine/core';
import type { ButtonProps, ElementProps } from '@mantine/core';

interface IButton extends ButtonProps, ElementProps<'button', keyof ButtonProps> {
  size?: Size;
  classNames?: IClassName;
  tooltip?: string;
}

type Size = 'sm' | 'md';

interface IClassName {
  root?: string;
  section?: string;
  loader?: string;
  inner?: string;
  label?: string;
}

export const Button = ({ children, size = 'md', classNames, tooltip = '', ...rest }: IButton) => {
  const sizes = {
    sm: 'h-10 rounded-lg',
    md: 'h-12 rounded-xl',
  };

  const clsRoot = () => {
    const cls: IClassName = {
      ...classNames,
      root: `${sizes[size]} ` + classNames?.root,
    };
    return cls;
  };

  return (
    <>
      {tooltip ? (
        <Tooltip arrowOffset={30} arrowSize={7} label={tooltip} withArrow position="top" openDelay={100}>
          <ButtonCore {...rest} color={rest.color || '#FFBC37'} classNames={clsRoot}>
            {children}
          </ButtonCore>
        </Tooltip>
      ) : (
        <ButtonCore {...rest} color={rest.color || '#FFBC37'} classNames={clsRoot}>
          {children}
        </ButtonCore>
      )}
    </>
  );
};
