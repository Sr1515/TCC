import React from 'react';
import { FaRegUser } from 'react-icons/fa';
import { InputWrapper, InputContainer, InputField, IconWrapper } from './style';

interface InputProps {
    icon?: React.ElementType;
    placeholder?: string;
    type?: string;
    [key: string]: any;
}

const Input: React.FC<InputProps> = ({
    icon: Icon = FaRegUser,
    placeholder = 'Digite algo...',
    type = 'text',
    ...props
}) => {
    return (

        <InputWrapper>

            <InputContainer>

                <IconWrapper>
                    <Icon size={20} />
                </IconWrapper>

                <InputField
                    type={type}
                    placeholder={placeholder}
                    {...props}
                />

            </InputContainer>

        </InputWrapper>
    );

};

export default Input;
