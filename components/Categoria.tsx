import Image from 'next/image'
import { Categoria as ICategoria } from '@/types/interfaces'
import useKiosko from '@/hooks/useKiosko'

const Categoria = ({ categoria }: { categoria: ICategoria }) => {
  const { id, nombre, icono } = categoria

  const { categoriaActual, obtenerCategoriaActual } = useKiosko()

  return (
    <div
      className={
        categoriaActual?.id === id
          ? 'flex items-center gap-5 w-full border p-5 font-bold transition-all bg-amber-400 hover:bg-amber-400 hover:cursor-pointer'
          : 'flex items-center gap-5 w-full border p-5 font-light hover:text-white transition-all hover:bg-amber-400 hover:scale-105 hover:cursor-pointer'
      }
    >
      <Image
        width={70}
        height={70}
        src={`/assets/img/icono_${ icono }.svg`}
        alt={`Imagen ícono ${ nombre }`}
        className="hover:cursor-pointer"
      />

      <button
        type="button"
        className="text-3xl hover:cursor-pointer hover:font-bold"
        onClick={() => obtenerCategoriaActual(id)}
      >
        {nombre}
      </button>
    </div>
  )
}

export default Categoria
