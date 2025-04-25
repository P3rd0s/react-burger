import { FC, useCallback } from 'react';
import { clsx } from 'clsx';
import s from './profile.module.scss';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@services/hooks';
import { logout } from '@services/auth/requests/auth.requests';

const Profile: FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleLogout = useCallback(async () => {
		const resultAction = await dispatch(logout());
		if (logout.fulfilled.match(resultAction)) {
			navigate('/login');
		}
	}, [dispatch, navigate]);

	return (
		<div className={s.wrapper}>
			<nav className={clsx('mr-15', s.nav)}>
				<ul
					className={clsx(
						'text text_type_main-medium text_color_inactive mb-20',
						s.menu
					)}>
					<NavLink
						to=''
						className={({ isActive }) =>
							isActive ? 'text_color_primary' : ''
						}>
						<li>Профиль</li>
					</NavLink>
					<li>История заказов</li>
					<li onClick={handleLogout}>Выход</li>
				</ul>

				<p className='text text_type_main-small text_color_inactive'>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</nav>
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default Profile;
