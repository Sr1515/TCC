import React, { useEffect } from "react";
import { Overlay, PopupContainer } from "./style";

type PopupMessageProps = {
    message: string,
    onClose: () => void;
    duration: number
};

const PopupMessage: React.FC<PopupMessageProps> = ({ message, onClose, duration = 3000 }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <Overlay>
            <PopupContainer>{message}</PopupContainer>
        </Overlay>
    );

};

export default PopupMessage;