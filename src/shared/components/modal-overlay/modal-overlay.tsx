import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import s from './modal-overlay.module.scss';
import { createPortal } from 'react-dom';

const EVENT_NAME = 'keydown';

const ModalOverlay: FC<
	React.PropsWithChildren<{
		onClose: () => void;
	}>
> = ({ children, onClose }) => {
	const overlayRef = useRef(null);

	const modalRoot = useMemo(() => document.getElementById('modals'), []);

	const handleOverlayClick = useCallback(
		(event: unknown) =>
			(event as KeyboardEvent).target ===
				(event as KeyboardEvent).currentTarget && onClose(),
		[onClose]
	);

	const escapeListener = useMemo(
		() => (event: unknown) => {
			if ((event as KeyboardEvent).key === 'Escape') {
				onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		document.addEventListener(EVENT_NAME, escapeListener);

		return () => document.removeEventListener(EVENT_NAME, escapeListener);
	}, [escapeListener]);

	return (
		modalRoot &&
		createPortal(
			<div
				role='banner'
				ref={overlayRef}
				className={`${s.overlay}`}
				onClick={handleOverlayClick}>
				{children}
			</div>,
			modalRoot
		)
	);
};

export default ModalOverlay;
