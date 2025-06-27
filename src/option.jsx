import { useEffect, useState } from "react"

const Option = () => {
    const [allCharacters, setAllCharacters] = useState([])
    const [genderList, setGenderList] = useState([])
    const [selectedGender, setSelectedGender] = useState("")

    useEffect(() => {
        const fetchAllPages = async () => {
            let characters = []
            const nameQuery = 'all'

            // 1. Obtener la primera página para saber cuántas hay
            const response = await fetch(`https://rickandmortyapi.com/api/character?name=${nameQuery}&page=1`)
            const data = await response.json()
            characters = [...data.results]

            const totalPages = data.info.pages

            // 2. Obtener el resto de las páginas en paralelo
            const fetchPromises = []
            for (let i = 2; i <= totalPages; i++) {
                fetchPromises.push(
                    fetch(`https://rickandmortyapi.com/api/character?name=${nameQuery}&page=${i}`)
                        .then(res => res.json())
                        .then(pageData => pageData.results)
                )
            }

            const pagesData = await Promise.all(fetchPromises)
            pagesData.forEach(results => {
                characters = characters.concat(results)
            })

            // 3. Guardar personajes y géneros únicos
            setAllCharacters(characters)
            const uniqueGenders = [...new Set(characters.map(c => c.gender))]
            setGenderList(uniqueGenders)
        }

        fetchAllPages()
    }, [])

    // 4. Filtrar por género si uno está seleccionado
    const filteredCharacters = selectedGender
        ? allCharacters.filter(c => c.gender === selectedGender)
        : allCharacters

    const style = {
        select: {
            width: '150px',
            height: '40px',
            margin: '20px'
        },
        characterBox: {
            margin: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f5f5f5'
        }
    }

    return (
        <div>
            <select
                style={style.select}
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
            >
                <option value="">Todos los géneros</option>
                {genderList.map((g, index) => (
                    <option key={index} value={g}>{g}</option>
                ))}
            </select>

            <div>
                {filteredCharacters.map(c => (
                    <div key={c.id} style={style.characterBox}>
                        <strong>{c.name}</strong> — {c.gender}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Option
