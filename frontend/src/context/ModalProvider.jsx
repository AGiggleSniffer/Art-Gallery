import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
	const [modalOpen, setModalOpen] = useState(false);

	const close = () => setModalOpen(false);
	const open = () => setModalOpen(true);
	
	const contextValue = {
		modalOpen,
		close,
		open,
	};

	return (
		<ModalContext.Provider value={contextValue}>
			{children}
		</ModalContext.Provider>
	);
};

export const useModal = () => useContext(ModalContext);
