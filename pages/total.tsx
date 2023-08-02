import { useEffect, useCallback } from 'react'
import Layout from '@/layout/Layout'
import useKiosko from '@/hooks/useKiosko'
import { formatearDinero } from '@/helpers'
import styles from '@/styles/Total.module.css'

export default function Total() {
  const { pedido, nombre, total, setNombre, handleEnviarPedido } = useKiosko()

  const comprobarPedido = useCallback((): boolean => {
    return pedido.length === 0 || nombre.trim() === '' || nombre.length < 3
  }, [pedido, nombre])

  useEffect(() => {
    comprobarPedido()
  }, [comprobarPedido])

  return (
    <Layout pagina="Confirmación y total">
      <h1 className="text-4xl font-black text-[#1F1F29]">
        Confirmación del pedido
      </h1>

      <form onSubmit={handleEnviarPedido} className="mt-16">
        <div>
          <label
            htmlFor="nombre"
            className="block text-[#1F1F29] font-bold text-xl"
          >
            Nombre
          </label>

          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className="w-full border border-gray-300 bg-gray-100 lg:w-1/3 p-2 rounded-lg my-3"
          />
        </div>

        <div className="mt-10">
          <p className="text-2xl text-[#1F1F29]">
            Total a pagar: {''} <span className="font-bold">{formatearDinero(total)}</span>
          </p>
        </div>

        <div className="w-full">
          <input
            type="submit"
            value="Confirmar pedido"
            disabled={comprobarPedido()}
            className={`${styles.button} ${
              comprobarPedido() ? `${styles.buttonDisabled}` : ''
            }`}
          />
        </div>
      </form>
    </Layout>
  )
}
