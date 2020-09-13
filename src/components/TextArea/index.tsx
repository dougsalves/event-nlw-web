import React, { TextareaHTMLAttributes } from 'react'

import './style.css'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    idTextarea: string;
    labelText: string;
}

const Textarea: React.FC<TextareaProps> = ({idTextarea, labelText, ...rest}) => {
    return (
        <div className="textarea-block">
            <label htmlFor={idTextarea}>{labelText}</label>
            <textarea id={idTextarea} {...rest} />
        </div>
    )
}

export default Textarea