import { useEffect, useState } from "react"

const Character = ({ character }) => {
    const [person, setPerson] = useState({})
    const [firstEpisode, setFirstEpisode] = useState("")
    //first date
    const [date, setDate] = useState('')
    //first season
    const [season, setSeason] = useState('')

    const capitalze = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    useEffect(() => {
        //Datos de la lista de personaje
        const fetchData = async () => {
            const response = await fetch(`https://rickandmortyapi.com/api/character/${character.id}`);
            const data = await response.json();
            setPerson(data);

            // Obtener el primer episodio
            if (data.episode.length > 0) {
                const firstEpisodeUrl = data.episode[0];
                const epRes = await fetch(firstEpisodeUrl);
                const epData = await epRes.json();
                setFirstEpisode(epData.name);
                setDate(epData.air_date)
                setSeason(epData.episode)
            }
        };

        fetchData();
    }, [character.id]);

    return (
        <div className="tarjeta">
            {/*Contenedor de imagen*/}
            <div className="containerImage">
                <img src={character.image} alt={`Foto de ${character.name}`} />
            </div>
            {/*Contenedor info*/}
            <div className="containerBody">
                <div className="section">
                    {/* <a  href={/*`character/${character.id}`*/}
                    <a>
                        <h2>{character.name}</h2>
                    </a>
                    <span className="status">
                        <span className={
                            character.status === "Alive"
                                ? "status-icon alive"
                                : character.status === "Dead"
                                    ? "status-icon dead"
                                    : "status-icon gray"
                        }>
                        </span>
                        {character.status} - {character.species}
                    </span>
                </div>
                <div className="section">
                    <span>
                        Gender:
                    </span>
                    <a>{capitalze(character.gender)}</a>
                </div>
                <div className="section">
                    <span>Last known location:</span>
                    <a>
                        {character.location.name}
                    </a>
                </div>
                <div className="section">
                    <span>First seen in:</span>
                    <a href={person.episode?.[0]} target="_blank">
                        {firstEpisode || 'Loading...'}: {season ? season.slice(0, 3) + ' - ' + season.slice(3, 6) : 'Loading'}
                    </a>
                    <a>
                        {date || 'Loading'}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Character