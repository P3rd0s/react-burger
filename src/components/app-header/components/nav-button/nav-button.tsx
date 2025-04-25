import React, { FC } from 'react';
import s from './nav-button.module.scss';
import { clsx } from 'clsx';
import { NavLink } from 'react-router-dom';

interface NavButtonProps {
	isHighlighted?: boolean;
	className?: string;
	to?: string;
}

const NavButton: FC<React.PropsWithChildren<NavButtonProps>> = ({
	children,
	className,
	to,
}) => {
	return (
		<NavLink
			to={to || '/'}
			className={({ isActive }) =>
				clsx(
					'pl-5 pr-5 text text_type_main-default',
					className,
					isActive ? 'text_color_primary' : 'text_color_inactive'
				)
			}>
			<li className={s.nav}>{children}</li>
		</NavLink>
	);
};

export default NavButton;
