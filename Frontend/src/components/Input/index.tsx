import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { InputWrapper, InputContainer, InputField, IconWrapper } from './style';

interface InputProps {
    icon: React.ElementType;
    placeholder: string;
    type?: string;
    [key: string]: any;
}

const Input: React.FC<InputProps> = ({
    icon: Icon = FaRegUser,
    placeholder = 'Digite algo...',
    ...props
}) => {

    return (
        <InputWrapper>

            <InputContainer>

                <IconWrapper>
                    <Icon size={30} />
                </IconWrapper>

                <InputField {...props} placeholder={placeholder} />

            </InputContainer>

        </InputWrapper>
    );
};

export default Input;
