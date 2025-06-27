import { useEffect, useState, useRef } from 'react'
import React from 'react'
import Character from './characters.jsx'
import './character.css'
import '../nextPage/nextPage.css'
import NextPage from '../nextPage/nextPage.jsx'
import Footer from '../footer/footer.jsx'
import Header from '../header/header.jsx'
import Filter from '../filter/filter.jsx'

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
    // Keyboard cellphone
    const searchInputRef = useRef(null)


    // useEffect para cargar los personajes al iniciar la pagina
    // y cada vez que cambie la pagina o el status
    // Se usa async/await para manejar la peticion a la API
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            let url = `https://rickandmortyapi.com/api/character?page=${page}`
            if (status !== 'all') url += `&status=${status}`
            if (gender !== 'all') url += `&gender=${gender}`
            if (triggerSearch.trim() !== '') url += `&name=${search}`

            try {
                const response = await fetch(url)
                if (!response.ok) {
                    setproblem('error')
                    setCharacters([])
                    setInfo({ count: 0, pages: 1 })
                    setGenderOptions([])
                    return
                }

                const data = await response.json()

                // Obtener todos los personajes
                let allCharacters = [...data.results]
                setInfo(data.info)

                if (allCharacters.length === 0) {
                    setproblem('error')
                    setCharacters([])
                    setGenderOptions([])
                    return
                }

                setCharacters(allCharacters)

                setproblem('')
            } catch (e) {
                console.error('Error fetching data:', e)
                setproblem('error')
                setCharacters([])
                setGenderOptions([])
                setInfo({ count: 0, pages: 1 })
            } finally {
                setLoading(false)
            }

            window.scrollTo({ top: 0, behavior: 'smooth' })
        }

        fetchData()
        // Inicio al inicio de la ventana al actualizar la pagina
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [page, status, gender, triggerSearch])

    const handleClick = () => {
        setPage(1)
        setTriggerSearch(search)
        setGender('all')
        setStatus('all')
        if (searchInputRef.current) {
            searchInputRef.current.blur()
        }
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
                            Total Characters: {problem !== 'error' ? info.count : '0'}
                        </h1>
                        {/*Pages number*/}
                        {
                            problem !== 'error' ?
                                <p>Page: {page}/ <a onClick={() => setPage(info.pages)} >{info.pages}</a> </p> :
                                <p style={{ visibility: 'hidden' }}>''</p>

                        }
                        {/*Search Box*/}
                        <div className="searchBox">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleClick()
                                    if (searchInputRef.current) {
                                        searchInputRef.current.blur()
                                    }
                                }}
                                className="searchBox"
                            >
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search by name"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                                <button type="submit">🔍</button>
                            </form>
                        </div>
                        {/* Content Filter and btn next pages */}
                        <div className={`NextPageAndFilter ${problem}`}>
                            {/*--- Next Page ---*/}
                            <NextPage page={page} setPage={setPage} info={info} />
                            {/*Filter by status*/}
                            <div className="filter">
                                <Filter
                                    title="Status"
                                    searchQuery={search}
                                    selectedValue={status}
                                    onFilterChange={(value) => {
                                        setStatus(value)
                                        setPage(1)
                                    }}
                                />
                                <Filter
                                    title="Gender"
                                    searchQuery={search}
                                    selectedValue={gender}
                                    onFilterChange={(value) => {
                                        setGender(value)
                                        setPage(1)
                                    }}
                                />

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