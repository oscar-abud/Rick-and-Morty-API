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
    // Filter by gender
    const [gender, setGender] = useState('all')
    //Button of search
    const [search, setSearch] = useState('')
    // Trigger of search
    const [triggerSearch, setTriggerSearch] = useState('')
    // Error by search
    const [problem, setproblem] = useState('')

    // useEffect para cargar los personajes al iniciar la pagina
    // y cada vez que cambie la pagina o el status
    // Se usa async/await para manejar la peticion a la API
    useEffect(() => {
        const fetchData = async () => {
            // let = var dinamico
            let url = `https://rickandmortyapi.com/api/character?page=${page}`

            if (status !== 'all') url += `&status=${status}`
            if (gender !== 'all') url += `&gender=${gender}`
            if (triggerSearch.trim() !== '') url += `&name=${search}`

            try {
                const response = await fetch(url)
                if (!response.ok) {
                    setproblem('error')
                    return
                } else {
                    setproblem('')
                }

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
    }, [page, status, gender, triggerSearch])

    const handleClick = () => {
        setPage(1)
        setTriggerSearch(search)
    }

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
                        {/*Pages number*/}
                        {
                            problem !== 'error' ?
                                <p>Page: {page}/ <a onClick={() => setPage(info.pages)} >{info.pages}</a> </p> :
                                <p style={{ visibility: 'hidden' }}>''</p>

                        }
                        {/*Search Box*/}
                        <div className="searchBox">
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') handleClick()
                                }}
                            />
                            <button onClick={handleClick}>🔍</button>
                        </div>
                        {/* Content Filter and btn next pages */}
                        <div className={`NextPageAndFilter ${problem}`}>
                            {/*--- Next Page ---*/}
                            <NextPage page={page} setPage={setPage} info={info} />
                            {/*Filter by status*/}
                            <div className="filter">
                                <div className="filterByStatus">
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
                                <div className="filterByGender">
                                    <p>Filter by gender</p>
                                    <select
                                        id="gender"
                                        value={gender}
                                        onChange={(e) => {
                                            //Seteamos la pagina a 1 al cambiar el filtro
                                            // Esto es para que al cambiar el filtro, se muestre la primera pagina
                                            setPage(1)
                                            setGender(e.target.value)
                                        }}
                                    >
                                        <option value="all">All</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="unknown">Unknown</option>

                                    </select>
                                </div>
                            </div>
                        </div>

                        {/*Card of characters*/}
                        {
                            problem !== 'error' ?
                                <div className='container'>
                                    {
                                        //Iteracion de los personajes
                                        characters.map(c => (
                                            <Character key={c.id} character={c} />
                                        ))
                                    }
                                </div> :
                                <div className="containerError">
                                    <h2>No results found for character: '{triggerSearch}'</h2>
                                </div>
                        }
                        <div className={problem} style={{ padding: '0px 20px' }} >
                            {/*--- Next Page ---*/}
                            <NextPage page={page} setPage={setPage} info={info} />
                        </div>
                    </div>
            }
            <Footer />
        </div >
    )
}

export default CharacterList