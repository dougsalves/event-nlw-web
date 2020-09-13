import React, { SelectHTMLAttributes } from 'react'

import './style.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    idSelect: string;
    labelText: string;
    options: Array<{
        value: string;
        label: string;
    }>;
}

const Select: React.FC<SelectProps> = ({idSelect, labelText, options, ...rest}) => {
    return (
        <div className="select-block">
            <label htmlFor={idSelect}>{labelText}</label>
            <select value="" id={idSelect} {...rest}>
                <option value="" disabled hidden>Selecione uma opção...</option>

                {options.map( option => {
                    return <option key={option.value} value={option.value}>{option.label}</option>
                })}
            </select>
        </div>
    )
}

export default Select