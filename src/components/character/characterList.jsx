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
    // Filter by status
    const [status, setStatus] = useState('all')

    // useEffect para cargar los personajes al iniciar la pagina
    // y cada vez que cambie la pagina o el status
    // Se usa async/await para manejar la peticion a la API
    useEffect(() => {
        const fetchData = async () => {
            // let = var dinamico
            let url = `https://rickandmortyapi.com/api/character?page=${page}`
            // Si el status es diferente de all, se agrega a la url
            // Esto es para filtrar los personajes por status
            if (status !== 'all') {
                url += `&status=${status}`
            }

            try {
                const response = await fetch(url)
                const data = await response.json()
                setCharacters(data.results)
                setInfo(data.info)
            } catch (e) {
                console.error('Error fetching data:', e)
                setCharacters([])
                setInfo({ count: 0, pages: 1 })
            } finally {
                setLoading(false)
            }
        }

        fetchData()
        // Inicio al inicio de la ventana al actualizar la pagina
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [page, status])

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
                        <div className="filter">
                            <p>Filter by status</p>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => {
                                    //Seteamos la pagina a 1 al cambiar el filtro
                                    // Esto es para que al cambiar el filtro, se muestre la primera pagina
                                    setPage(1)
                                    setStatus(e.target.value)
                                }}
                            >
                                <option value="all">All</option>
                                <option value="Alive">Alive</option>
                                <option value="Dead">Dead</option>
                                <option value="unknown">Unknown</option>
                            </select>
                        </div>
                        <div className="container">
                            {
                                //Iteracion de los personajes
                                characters.map(c => (
                                    <Character key={c.id} character={c} />
                                ))
                            }
                        </div>
                        {/*--- Next Page ---*/}
                        <NextPage page={page} setPage={setPage} info={info} />
                        <Footer />
                    </div>
            }
        </div >
    )
}

export default CharacterList