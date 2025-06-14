import { useEffect, useState } from "react"

const Reloj = () => {
    const [hora, setHora] = useState(new Date().toLocaleDateString())

    useEffect(() => {
        const intervalo = setInterval(() => {
            setHora(new Date().toLocaleTimeString())
        }, 1000)

        return () => clearInterval(intervalo)
    }, [])

    return <h1>Hora actual: {hora}</h1>
}

export default Reloj