import React, { FC } from 'react';
import s from './nav-button.module.scss';
import { clsx } from 'clsx';

interface NavButtonProps {
	isHighlighted?: boolean;
	className?: string;
}

const NavButton: FC<React.PropsWithChildren<NavButtonProps>> = ({
	children,
	className,
}) => {
	return (
		<li
			className={clsx(
				'pl-5 pr-5 text text_type_main-default text_color_inactive',
				s.nav,
				className
			)}>
			{children}
		</li>
	);
};

export default NavButton;
