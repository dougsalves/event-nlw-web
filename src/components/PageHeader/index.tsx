import React from 'react'
import { Link } from 'react-router-dom'
import Switch from 'react-switch'

import logoIcon from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'

import './style.css'

interface PageHeaderProps {
    title: string;
    description?: string;
    toggleTheme?: void;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>

                <Switch 
                    onChange={() => {}}
                    checked={false}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    height={10}
                    width={40}
                    handleDiameter={20}
                    offColor="#6842C2"
                    onColor="#333"
                />

                <img src={logoIcon} alt="Proffy" />
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>

                {props.description && <p>{props.description}</p>}

                {props.children}
            </div>
        </header>
    )
}

export default PageHeader