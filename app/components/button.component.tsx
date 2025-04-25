import type { IconType } from 'react-icons';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { Button as HButton } from '@headlessui/react';
import { FaSpinner } from 'react-icons/fa6';

interface ButtonProps {
  onClick?: () => void;
  icon?: IconType;
  value?: string;
  variant?: 'list' | 'accent' | 'secondary' | 'listActive' | 'submit' | 'primary';
  linkTo?: string;
  active?: boolean;
  loading?: boolean;
  center?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

const buttonVariants = tv({
  base: 'flex items-center gap-2 bg-btn-primary hover:bg-btn-primary-hover text-white rounded-lg transition cursor-pointer px-3 py-2',
  variants: {
    variant: {
      listActive: 'bg-[#FF1801]/10 border-[#FF1801]/20 text-white',
      list: 'hover:bg-[#262931] bg-transparent text-gray-400 w-full',
      accent: 'hover:bg-accent-hover bg-accent text-white',
      primary:
        'bg-gradient-to-r from-red-600 to-red-700 text-white rounded-md shadow-sm shadow-red-500/20 transition-all duration-500 hover:shadow-red-500/30 hover:from-red-700 hover:to-red-800',
      submit:
        'bg-gradient-to-r from-red-600 to-red-700 text-white rounded-md shadow-sm shadow-red-500/20 transition-all duration-500 hover:shadow-red-500/30 hover:from-red-700 hover:to-red-800',
      secondary: 'bg-[#262931] hover:bg-[#2D3039] text-white',
    },
    state: {
      active: 'bg-accent hover:bg-accent-hover text-white',
      disabled: 'bg-gray-400 text-gray-600 cursor-not-allowed',
    },
    alignment: {
      center: 'justify-center',
    },
  },
});

const iconVariants = tv({
  base: 'text-white',
  variants: {
    variant: {
      listActive: 'text-[#FF1801]',
    },
  },
});

export const Button = (props: ButtonProps) => {
  const buttonClassName = buttonVariants({
    state: props.active ? 'active' : undefined,
    alignment: props.center ? 'center' : undefined,
    variant: props.variant,
  });

  const iconClassName = iconVariants({
    variant: props.variant === 'listActive' ? 'listActive' : undefined,
  });

  const btnClass = twMerge(buttonClassName, props.className);
  const iconClass = twMerge(iconClassName);

  const contentOpacity = props.loading ? 'opacity-0' : 'opacity-100';

  const button = (
    <HButton onClick={props.onClick} className={btnClass} type={props.type || 'button'}>
      <div className="grid grid-cols-1">
        <div className={`flex items-center gap-2 ${contentOpacity}`} style={{ gridArea: '1/1' }}>
          {props.icon && <props.icon className={iconClass} />}
          <span>{props.value}</span>
        </div>
        {props.loading && (
          <div className="w-full justify-center align-middle" style={{ gridArea: '1/1' }}>
            <FaSpinner className="animate-spin h-full justify-self-center text-xl" />
          </div>
        )}
      </div>
    </HButton>
  );

  if (props.linkTo) {
    return <Link to={props.linkTo}>{button}</Link>;
  }

  return button;
};
