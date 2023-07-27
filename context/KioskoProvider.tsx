import { useState, useEffect, createContext, ReactNode } from 'react'
import { Categoria } from '@/types/interfaces'
import axios from 'axios'

// Tipo para la interfaz de contexto de KioskoContext
interface IKioskoContext {
  categorias: Categoria[]                           // Lista de categorías disponibles
  categoriaActual: Categoria | undefined            // Categoría actual seleccionada (o undefined si no hay ninguna)
  obtenerCategoriaActual: ObtenerCategoriaActualFn  // Función para obtener y actualizar la categoría actual
}

// Tipo para la función obtenerCategorias
type ObtenerCategoriasFn = () => void

// Tipo para la función obtenerCategoriaActual
type ObtenerCategoriaActualFn = (id: number) => void

// Crear un contexto de React para el contexto de KioskoContext
const KioskoContext = createContext<IKioskoContext>({
  categorias: [],                   // Inicializar con una lista de categorías vacía
  categoriaActual: undefined,       // Inicializar sin ninguna categoría seleccionada
  obtenerCategoriaActual: () => {}, // Inicializar la función para obtener y actualizar la categoría actual
})

// Tipo para el componente KioskoProvider
interface KioskoProviderProps {
  children: ReactNode // Los hijos que serán envueltos por el proveedor de contexto
}

// Componente KioskoProvider que envuelve a los hijos con el contexto de Kiosko
const KioskoProvider = ({ children }: KioskoProviderProps) => {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [categoriaActual, setCategoriaActual] = useState<
    Categoria | undefined
  >()

  // Función para obtener la lista de categorías desde la API
  const obtenerCategorias: ObtenerCategoriasFn = async () => {
    const { data } = await axios.get('/api/categorias')
    setCategorias(data)
  }

  // Ejecutar obtenerCategorias al cargar el componente
  useEffect(() => {
    obtenerCategorias()
  }, [])

  // Función para obtener y actualizar la categoría actual basada en su id
  const obtenerCategoriaActual: ObtenerCategoriaActualFn = (id: number) => {
    const categoriaEncontrada = categorias.filter(
      categoria => categoria.id === id
    )
    setCategoriaActual(categoriaEncontrada[0] || undefined)
  }

  return (
    <KioskoContext.Provider
      value={{
        categorias,
        categoriaActual,
        obtenerCategoriaActual,
      }}
    >
      {children}
    </KioskoContext.Provider>
  )
}

export { KioskoProvider }

export default KioskoContext
