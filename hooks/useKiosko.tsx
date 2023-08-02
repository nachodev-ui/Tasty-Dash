import { useContext } from 'react'
import { IKioskoContext } from '@/types/types'
import KioskoContext from '@/context/KioskoProvider'
import CategoriaConProductos from '@/customType'

/**
 * Interfaz personalizada que extiende la interfaz 'IKioskoContext' y reemplaza
 * la propiedad 'categoriaActual' con 'CategoriaConProductos'.
 */
interface IKioskoContextConProductos extends IKioskoContext {
  categoriaActual: CategoriaConProductos | undefined
}

const useKiosko = (): IKioskoContextConProductos => {
  const kioskoContext = useContext(KioskoContext) as IKioskoContextConProductos

  return kioskoContext
}

export default useKiosko
