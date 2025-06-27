import { useEffect, useState } from "react"
import '../filter/filter.css'

const Filter = ({ title, searchQuery, selectedValue, onFilterChange }) => {
    const [options, setOptions] = useState([])

    useEffect(() => {
        const fetchAllPages = async () => {
            try {
                let allCharacters = []

                const baseUrl = searchQuery.trim() !== ''
                    ? `https://rickandmortyapi.com/api/character?name=${searchQuery}&page=1`
                    : `https://rickandmortyapi.com/api/character?page=1`

                const response = await fetch(baseUrl)
                const data = await response.json()

                allCharacters = [...data.results]
                const totalPages = data.info.pages

                if (totalPages > 1) {
                    const fetchPromises = []
                    for (let i = 2; i <= totalPages; i++) {
                        const pageUrl = searchQuery.trim() !== ''
                            ? `https://rickandmortyapi.com/api/character?name=${searchQuery}&page=${i}`
                            : `https://rickandmortyapi.com/api/character?page=${i}`

                        fetchPromises.push(
                            fetch(pageUrl)
                                .then(res => res.json())
                                .then(pageData => pageData.results)
                        )
                    }

                    const pagesData = await Promise.all(fetchPromises)
                    pagesData.forEach(results => {
                        allCharacters = allCharacters.concat(results)
                    })
                }

                const extractedValues = [...new Set(allCharacters.map(c => c[title.toLowerCase()]))]
                setOptions(extractedValues)
            } catch (error) {
                console.error("Error fetching filter options:", error)
                setOptions([])
            }
        }

        fetchAllPages()
    }, [searchQuery, title, selectedValue])

    return (
        <div className="filterBy">
            <p>Filter by {title}</p>
            <select
                id={title}
                value={selectedValue} //Usar prop en vez de estado interno
                onChange={(e) => onFilterChange(e.target.value)}
            >
                <option value="all">All</option>
                {options.map((opt, index) => (
                    <option key={index} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    )
}

export default Filter
