import { useEffect, useState } from 'react'
import React from 'react'
import Character from './characters.jsx'
import './character.css'
import '../boton/nextPage.css'
import NextPage from '../boton/nextPage.jsx'
import Footer from '../footer/footer.jsx'
import Header from '../header/header.jsx'

const CharacterList = () => {
    const [characters, setCharacters] = useState([])
    const [info, setInfo] = useState({})
    //Load page
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            const reponse = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
            const data = await reponse.json()
            setLoading(false)
            setCharacters(data.results)
            setInfo(data.info)
        }

        fetchData()

        // Inicio al inicio de la ventana al actualizar la pagina
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [page])

    return (
        <div className='body'>
            <Header />
            {
                loading ?
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                        <h1 style={{ color: 'white', textAlign: 'center', fontSize: '5rem' }}>Loading...</h1>

                    </div> :
                    <div className="info">

                        <h1
                            style={{ color: 'white', textAlign: 'center', fontSize: '1.5rem', margin: '10px 0px' }}
                        >
                            Total Characters: {info.count}
                        </h1>
                        {/*--- Next Page ---*/}
                        <NextPage page={page} setPage={setPage} info={info} />
                        <div className="container">
                            {
                                characters.map(c => (
                                    <Character key={c.id} character={c} />
                                )
                                )
                            }
                        </div>
                        {/*--- Next Page ---*/}
                        <NextPage page={page} setPage={setPage} info={info} />
                        <Footer />
                    </div>
            }
        </div>
    )
}

export default CharacterList