// Input.tsx
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { InputWrapper, InputContainer, InputField, IconWrapper } from './style';

interface InputWithIconProps {
    icon: React.ElementType;
    placeholder: string;
    type?: string;
    [key: string]: any;
}

const Input: React.FC<InputWithIconProps> = ({
    icon: Icon = FaUser,
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
