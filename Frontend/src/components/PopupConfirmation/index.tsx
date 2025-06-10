import React from "react";
import { Button, ButtonGroup, Overlay, PopupContainer } from "./style";

type PopupConfirmationProps = {
    message: string,
    onConfirm: () => void,
    onCancel: () => void
};

const PopupConfirmation: React.FC<PopupConfirmationProps> = ({
    message,
    onConfirm,
    onCancel,

}) => {

    return (

        <Overlay>

            <PopupContainer>
                <p>{message}</p>

                <ButtonGroup>

                    <Button tipo="confirmar" onClick={onConfirm}>
                        Confirmar
                    </Button>

                    <Button tipo="cancelar" onClick={onCancel}>
                        Cancelar
                    </Button>

                </ButtonGroup>

            </PopupContainer>

        </Overlay>

    );
};

export default PopupConfirmation;