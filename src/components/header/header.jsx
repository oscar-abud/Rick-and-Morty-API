import './header.css'
import image from '../../assets/rickMorty.png'

const Header = () => {

    const down = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }

    return (
        <header className='headerMenu'>
            <nav>
                <div className="logo">
                    <img src={image} alt="Rick n Morty Logo" />
                </div>
                <div className="containerNav">
                    <a href="/">Home</a>
                    <a href="https://rickandmortyapi.com/documentation">Api</a>
                    <a onClick={down}>Footer</a>
                </div>
            </nav>
            <aside>
                <h1 className='title'>The Rick and Morty API</h1>
            </aside>
        </header>
    )
}

export default Header