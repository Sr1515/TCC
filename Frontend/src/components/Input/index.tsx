import React from 'react';
import { FaUser } from 'react-icons/fa';
import { InputWrapper, InputField, IconWrapper } from './style';

interface InputWithIconProps {
    icon: React.ElementType;
    placeholder: string;
    [key: string]: any;
}

const Input: React.FC<InputWithIconProps> = ({ icon: Icon = FaUser, placeholder = 'Digite algo...', ...props }) => {
    return (
        <InputWrapper>
            <IconWrapper>
                <Icon size={43} />
            </IconWrapper>
            <InputField {...props} placeholder={placeholder} />
        </InputWrapper>
    );
};

export default Input;
