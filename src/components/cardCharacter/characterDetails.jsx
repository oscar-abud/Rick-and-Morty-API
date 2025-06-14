import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer.jsx";
import './cardCharacter.css';

const CharacterDetails = () => {
    //Nos traeremos el id del personaje desde la URL
    const { id } = useParams()

    const [character, setCharacter] = useState(null)
    const [firstEpisode, setFirstEpisode] = useState('')
    const [date, setDate] = useState('')
    const [season, setSeason] = useState('')

    const capitalze = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
            const data = await response.json()
            setCharacter(data)

            if (data.episode?.[0]) {
                const epResponse = await fetch(data.episode[0])
                const epData = await epResponse.json()
                setFirstEpisode(epData.name)
                setDate(epData.air_date)
                setSeason(epData.episode)
            }

        }

        fetchData()
    }, [id])

    if (!character) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <h1 style={{ color: 'white', textAlign: 'center', fontSize: '5rem' }}>Loading...</h1>
            </div>
        )
    }

    return (
        <div className="body">
            <Header />
            <div className="containerCharacter">
                <div className="containerLeft">
                    <div className="containerImageCharacter">
                        <img src={character.image} alt={`Image of ${character.name}`} />
                        <h1 className="Name">
                            {character.name}
                        </h1>

                        <span className="status">
                            <span className={
                                character.status === "Alive"
                                    ? "status-icon alive"
                                    : character.status === "Dead"
                                        ? "status-icon dead"
                                        : "status-icon gray"
                            }>
                            </span>
                            {capitalze(character.status)} - {character.species}
                        </span>
                    </div>
                    <div className="bodyCharacter">
                    </div>
                </div>
                <div className="containerRight">
                    <div className="containerInfoCharacter">
                        <h2>
                            Gender:
                        </h2>
                        <a>{capitalze(character.gender)}</a>
                    </div>
                    <div className="containerInfoCharacter">
                        <h2>Origin place:</h2>
                        <a href={character.origin.url} target="_blank" rel="noopener noreferrer">
                            {capitalze(character.origin.name)}
                        </a>
                    </div>
                    <div className="containerInfoCharacter">
                        <h2>{character.gender === 'Male' ? 'Him location:' : character.gender === 'Female' ? 'Her location:' : 'It location:'}</h2>
                        <a href={character.origin.url} target="_blank" rel="noopener noreferrer">
                            {character.location.name}
                        </a>
                    </div>
                    <div className="containerInfoCharacter">
                        <h2>First seen in:</h2>
                        <a href={character.episode?.[0]} target="_blank" rel="noopener noreferrer">
                            {firstEpisode || 'Loading...'}: {season ? season.slice(0, 3) + ' - ' + season.slice(3, 6) : 'Loading...'}
                        </a>
                        <a href={character.episode?.[0]} target="_blank" rel="noopener noreferrer">
                            {date || 'Loading...'}
                        </a>
                    </div>
                    <div className="containerInfoCharacter">
                        <h2>Episode envolved:</h2>
                        <a target="_blank" rel="noopener noreferrer">
                            {character.episode.length || 'Loading...'} episodes
                        </a>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};


export default CharacterDetails