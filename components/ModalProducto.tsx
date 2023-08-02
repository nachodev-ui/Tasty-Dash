import { useState, useEffect } from 'react'
import Image from 'next/image'
import CloseIcon from './CloseIcon'
import PlusIcon from './PlusIcon'
import MinusIcon from './MinusIcon'
import useKiosko from '@/hooks/useKiosko'
import { Producto } from '@prisma/client'
import { ProductoConCantidad } from '@/types/types'
import { formatearDinero } from '@/helpers'
import styles from '@/styles/Cantidad.module.css'


const ModalProducto = () => {
  const [cantidad, setCantidad] = useState<number>(1)
  const [animate, setAnimate] = useState<boolean>(false)
  const [edicion, setEdicion] = useState<boolean>(false)

  const { producto, pedido, handleChangeModal, handleAgregarPedido } =useKiosko()
  const { nombre, precio, imagen } = (producto as Producto) || {}

  useEffect(() => {
    // Comprobar si el modal está en el pedido
    if (pedido.some(pedidoState => pedidoState.id === producto?.id)) {
      const productoEdicion = pedido.find(
        pedidoState => pedidoState.id === producto?.id
      )
      setEdicion(true)
      setCantidad(productoEdicion?.cantidad || 1)
    }
  }, [producto, pedido])

  const handleIncrement = (): void => {
    if (cantidad >= 10) return

    setCantidad(cantidad + 1)
    setAnimate(true)
    setTimeout(() => setAnimate(false), 300)
  }

  const handleDecrement = (): void => {
    if (cantidad <= 1) return

    setCantidad(cantidad - 1)
    setAnimate(true)
    setTimeout(() => setAnimate(false), 300)
  }

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image
          width={300}
          height={400}
          alt={`Imagen de producto ${nombre}`}
          src={`/assets/img/${imagen}.jpg`}
          className="rounded-md"
        />
      </div>

      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button type="button" onClick={() => handleChangeModal()}>
            <CloseIcon />
          </button>
        </div>

        <h1 className="text-3xl font-bold mt-5 pr-8">{nombre}</h1>

        <p className="text-4xl font-black mt-5 text-amber-500">
          {formatearDinero(precio)}
        </p>

        <div className="flex gap-5 mt-5">
          <button type="button" onClick={handleDecrement}>
            <MinusIcon />
          </button>

          <p
            className={`text-2xl ${styles.cantidad_transition} ${
              animate ? styles.cantidad_animate : ''
            }`}
          >
            {cantidad}
          </p>

          <button type="button" onClick={handleIncrement}>
            <PlusIcon />
          </button>
        </div>

        <button
          type="button"
          className="bg-amber-500 hover:bg-amber-600 px-5 py-2 mt-5 text-white font-bold undercase rounded 
          shadow-sm transition duration-300 ease-in-out"
          onClick={() =>
            handleAgregarPedido(
              producto as unknown as ProductoConCantidad,
              cantidad
            )
          }
        >
          {edicion ? 'Guardar cambios' : 'Agregar al Pedido'}
        </button>
      </div>
    </div>
  )
}

export default ModalProducto
