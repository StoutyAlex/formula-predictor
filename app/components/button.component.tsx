import type { IconType } from 'react-icons';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

interface ButtonProps {
  onClick?: () => void;
  icon?: IconType;
  value?: string;
  variant?: 'list' | 'accent' | 'secondary' | 'listActive' | 'submit'
  linkTo?: string;
  active?: boolean;
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
      submit: 'hover:bg-accent-hover bg-accent text-white font-medium',
      secondary: 'bg-[#262931] hover:bg-[#2D3039] text-white',
    },
    state: {
      active: 'bg-accent hover:bg-accent-hover text-white',
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

  const button = (
    <button onClick={props.onClick} className={btnClass} type={props.type || 'button'}>
      {props.icon && <props.icon className={iconClass} />}
      <span>{props.value}</span>
    </button>
  );

  if (props.linkTo) {
    return <Link to={props.linkTo}>{button}</Link>;
  }

  return button;
};
