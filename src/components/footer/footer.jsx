import React from 'react'
import IconoGithub from './github.jsx'
import './footer.css'

const footer = () => {
    // volver arriba
    const up = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (
        <footer>
            <button onClick={up}>⬆</button>
            <div className="containerFooter">
                <a href="https://github.com/oscar-abud" target='_blank'>
                    <IconoGithub /> by <strong>Oscar Palma</strong> 2025.
                </a>
            </div>
        </footer>

    )
}

export default footer
