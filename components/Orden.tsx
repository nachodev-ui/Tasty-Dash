import Image from 'next/image'
import axios from 'axios'
import { ProductoConCantidad } from '@/types/types'
import { toast } from 'react-toastify'
import { formatearDinero } from '@/helpers'

export interface IOrden {
  id: number
  nombre: string
  fecha: string
  total: number
  pedido: ProductoConCantidad[] // Defino que 'pedido' es un array de ProductoConCantidad
  estado: boolean
}

const Orden = ({ orden }: { orden: IOrden }) => {
  const { id, nombre, total, pedido } = orden

  const completarOrden = async (): Promise<void> => {
    try {

      await axios.post(`/api/ordenes/${id}`)

      toast.success('Orden completada')

    } catch (error) {
        toast.error('Hubo un error al completar la orden')
    }
  }

  return (
    <div className="border p-8 space-y-3">
      <h3 className="text-lg uppercase mb-4 font-black text-amber-500">
        Orden: #{id}
      </h3>
      <p className="text-lg font-semibold">Cliente: {nombre}</p>

      <div>
        {pedido.map((producto: ProductoConCantidad) => (
          <div
            key={producto.id}
            className="flex py-4 border-b last-of-type:border-0 items-center"
          >
            <div className="w-36">
              <Image
                width={400}
                height={500}
                src={`/assets/img/${producto.imagen}.jpg`}
                alt={`Imagen del producto ${producto.nombre}`}
                className="shadow-md rounded-sm"
              />
            </div>

            <div className="p-5 space-y-2">
              <h4 className="text-xl font-bold text-amber-500">
                {producto.nombre}
              </h4>
              <p className="text-lg font-semibold">
                Cantidad: {producto.cantidad}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="md:flex md:items-center md:justify-between my-10">
        <p className="text-lg font-semibold">
          Total a pagar:{' '}
          <span className="font-bold text-xl text-amber-500">
            {formatearDinero(total)}
          </span>
        </p>

        <button
          type="button"
          className="bg-amber-600 hover:bg-amber-700 px-10 mt-5 py-3 md:mt-0 rounded-md text-white font-semibold uppercase"
          onClick={completarOrden}
        >
          Completar orden
        </button>
      </div>
    </div>
  )
}

export default Orden
