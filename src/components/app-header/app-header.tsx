import {
	BurgerIcon,
	ListIcon,
	Logo,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './app-header.module.scss';
import React from 'react';
import { clsx } from 'clsx';
import NavButton from '@components/app-header/components/nav-button/nav-button';

const AppHeader = () => {
	return (
		<header className={clsx('`pt-4 pb-4', s.header)}>
			<nav className={s.list}>
				<ul className={s.group}>
					<NavButton>
						<BurgerIcon type='secondary' />
						Конструктор
					</NavButton>

					<NavButton>
						<ListIcon type='secondary' />
						Лента заказов
					</NavButton>

					<NavButton className={s.user} to='/profile'>
						<ProfileIcon type='secondary' />
						Личный кабинет
					</NavButton>
				</ul>
			</nav>
			<Logo className={s.logo} />
		</header>
	);
};

export default AppHeader;
