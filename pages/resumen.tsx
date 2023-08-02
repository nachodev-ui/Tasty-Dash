import Layout from '@/layout/Layout'
import ResumenProducto from '@/components/ResumenProducto'
import useKiosko from '@/hooks/useKiosko'

export default function Resumen() {
  const { pedido } = useKiosko()

  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-xl mt-4 mb-10 text-gray-500">Aquí podrás ver el resumen actual de tu pedido</p>

      {pedido.length === 0 ? (
        <p className="text-2xl">No hay productos</p>
      ) : (
        pedido.map(producto => (
          <ResumenProducto key={producto.id} producto={producto} />
        ))
      )}
    </Layout>
  )
}
