import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
	const [modalContent, setModalContent] = useState(null);

	const close = () => {
		setModalContent(null);
	};

	const contextValue = {
		close,
		modalContent,
		setModalContent,
	};

	return (
		<ModalContext.Provider value={contextValue}>
			{children}
		</ModalContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => useContext(ModalContext);
