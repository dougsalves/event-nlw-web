import React, { InputHTMLAttributes } from 'react'

import './style.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    idInput: string;
    labelText: string;
}

const Input: React.FC<InputProps> = ({idInput, labelText, ...rest}) => {
    return (
        <div className="input-block">
            <label htmlFor={idInput}>{labelText}</label>
            <input type="text" id={idInput} {...rest} />
        </div>
    )
}

export default Input