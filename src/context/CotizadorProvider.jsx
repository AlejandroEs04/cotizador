import { createContext, useState } from 'react'
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from '../helpers'

export const CotizadorContext = createContext()

export default function CotizadorProvider({children}) {

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name] : e.target.value
        })
    }

    const cotizarSeguro = () => {
        // Una base
        let resultado = 2000

        // Obtener la diferencia de anos
        const diferencia = obtenerDiferenciaYear(datos.year)

        // Hay que restar el 3% por cada ano
        resultado -= ((diferencia * 3) * resultado) / 100

        // Americano 15%
        // Europeo 30%
        // Asiatico 5%
        resultado *= calcularMarca(datos.marca)

        console.log(resultado   )

        // Basico 20%
        // Completo 50%
        resultado *= calcularPlan(datos.plan)

        // Formatear Dinero
        resultado = formatearDinero(resultado)

        setCargando(true)
        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 2000)
    }

    return (
        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error, 
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}
