import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

import { Tooltip } from '@mantine/core';
import clsx from 'clsx';
import './style.scss';

type TypeClass =
  | 'base-h-1'
  | 'base-h-2'
  | 'base-h-3'
  | 'base-h-4'
  | 'base-h-5'
  | 'title-1-semibold'
  | 'title-1-medium'
  | 'title-1-mobile'
  | 'base-1-semibold'
  | 'base-1-bold'
  | 'base-2'
  | 'body-1-semibold'
  | 'body-1-medium'
  | 'body-2-semibold'
  | 'caption-1'
  | 'caption-1-medium'
  | 'caption-2-bold'
  | 'caption-2-medium'
  | 'button-1'
  | 'button-2'
  | 'title-2';

export interface TextProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  children: React.ReactNode;
  typeClass?: TypeClass;
  tooltip?: boolean;
}

const Text = ({ children, className = '', typeClass = 'body-1-medium', tooltip = false, ...rest }: TextProps) => {
  return (
    <>
      {tooltip ? (
        <Tooltip arrowOffset={30} arrowSize={7} label={children} withArrow position="top" openDelay={100}>
          <p {...rest} id="a-text" className={clsx('text-neutral-4 break-words', typeClass, className)}>
            {children}
          </p>
        </Tooltip>
      ) : (
        <p {...rest} id="a-text" className={clsx('text-neutral-4 break-words', typeClass, className)}>
          {children}
        </p>
      )}
    </>
  );
};
export default Text;
