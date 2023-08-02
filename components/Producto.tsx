import Image from 'next/image'
import useKiosko from '@/hooks/useKiosko'
import { Producto } from '@prisma/client'
import { formatearDinero } from '@/helpers'

const Producto = ({ producto }: { producto: Producto }) => {
  const { handleSetProducto, handleChangeModal } = useKiosko()

  const { nombre, imagen, precio } = producto as Producto

  return (
    <div className="flex flex-col border p-3 h-100">
      <Image
        src={`/assets/img/${imagen}.jpg`}
        width={500}
        height={500}
        alt={`Imagen del producto: ${nombre}`}
        className="object-cover"
        loading='lazy'
      />

      <h3 className="text-xl md:text-2xl font-bold mt-2">{nombre}</h3>

      <div className="flex flex-col justify-center mt-auto">
        <p className="text-3xl md:text-4xl font-black text-amber-500 mt-5">
          {formatearDinero(precio)}
        </p>

        <button
          type="button"
          className="mt-5 bg-amber-500 hover:bg-amber-600 hover:scale-105 transition-all text-white font-bold py-2 rounded w-[96%] mx-auto"
          onClick={() => {
            handleChangeModal()
            handleSetProducto(producto)
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  )
}

export default Producto
