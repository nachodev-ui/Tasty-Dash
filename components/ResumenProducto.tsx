import Image from 'next/image'
import EditIcon from './EditIcon'
import TrashIcon from './TrashIcon'
import useKiosko from '@/hooks/useKiosko'
import { ProductoConCantidad } from '@/types/types'
import { formatearDinero } from '@/helpers'

const ResumenProducto = ({ producto }: { producto: ProductoConCantidad }) => {
  const { handleEditarCantidades, handleEliminarProducto } = useKiosko()

  return (
    <div className="shadow p-4 mb-3 flex gap-10 items-center">
      <div className="relative md:w-1/6 hidden sm:block">
        <Image
          src={`/assets/img/${producto.imagen}.jpg`}
          alt={`Imagen del producto ${producto.nombre}`}
          width={300}
          height={400}
        />

        <div
          className="absolute top-4 right-3 bg-amber-500 text-white rounded-full px-3 py-1 text-sm font-bold"
          style={{
            transform: 'translate(50%, -50%)',
            marginRight: '-12px',
            marginTop: '-12px',
          }}
        >
          {producto.cantidad}
        </div>
      </div>

      <div className="w-6/6 md:w-5/6 relative">
        <div className="flex flex-row md:flex-row items-center md:items-start">
          <p className="text-2xl font-bold md:mr-4">{producto.nombre}</p>

          <button
            type="button"
            className="text-amber-500 hover:scale-110 mt-2 md:mt-1"
            onClick={() => handleEditarCantidades(producto.id)}
          >
            <EditIcon />
          </button>
        </div>

        <p
          className={`text-sm font-bold text-gray-500 mt-2 ${
            producto.cantidad === 0 ? 'hidden sm:block' : 'block sm:hidden'
          }`}
        >
          Cantidad: {producto.cantidad}
        </p>

        <p className="text-md font-bold text-gray-600 pt-6">
          Precio: {formatearDinero(producto.precio)}
        </p>

        <p className="text-xl font-black  text-amber-500 mt-2">
          Subtotal: {formatearDinero(producto.precio * producto.cantidad)}
        </p>
      </div>

      <div className="ml-auto">
        <button
          className="bg-red-500 hover:bg-transparent hover:text-gray-950 hover:border hover:border-gray-950 text-white font-bold py-1 px-2 md:py-2 md:px-4 rounded-full"
          onClick={() => handleEliminarProducto(producto.id)}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  )
}

export default ResumenProducto
