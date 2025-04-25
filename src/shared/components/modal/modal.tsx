import React, { FC, useCallback, useEffect, useMemo } from 'react';
import s from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '@shared/components/modal-overlay/modal-overlay';
import { clsx } from 'clsx';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';

const EVENT_NAME = 'keydown';

const Modal: FC<
	React.PropsWithChildren<{
		onClose?: () => void;
		className?: string;
		header?: string;
	}>
> = ({ children, onClose, className, header }) => {
	const modalRoot = useMemo(() => document.getElementById('modals'), []);
	const location = useLocation();
	const navigate = useNavigate();

	const modalClose = useCallback(
		() => navigate(location?.state?.background || ''),
		[location?.state?.background, navigate]
	);

	const handleClose = useCallback(() => {
		if (onClose) {
			onClose();
		}
		modalClose();
	}, [modalClose, onClose]);

	const escapeListener = useMemo(
		() => (event: unknown) => {
			if ((event as KeyboardEvent).key === 'Escape') {
				handleClose();
			}
		},
		[handleClose]
	);

	useEffect(() => {
		document.addEventListener(EVENT_NAME, escapeListener);

		return () => document.removeEventListener(EVENT_NAME, escapeListener);
	}, [escapeListener]);

	return (
		modalRoot &&
		createPortal(
			<ModalOverlay onClose={handleClose}>
				<div className={clsx(s.modal, className)}>
					<CloseIcon className={s.close} type='primary' onClick={handleClose} />
					{header && (
						<h1 className={clsx('text text_type_main-large', s.header)}>
							{header}
						</h1>
					)}

					{children}
				</div>
			</ModalOverlay>,
			modalRoot
		)
	);
};

export default Modal;
