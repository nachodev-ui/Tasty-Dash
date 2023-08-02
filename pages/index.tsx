import Layout from '@/layout/Layout'
import Producto from '@/components/Producto'
import useKiosko from '@/hooks/useKiosko'

export default function Home() {
  const { categoriaActual } = useKiosko()

  return (
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className="text-5xl font-black">{categoriaActual?.nombre}</h1>

      <p className="text-xl mt-8 mb-6">Personaliza tu pedido a continuación</p>

      <div className="grid gap-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {categoriaActual?.productos?.map(producto => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
    </Layout>
  )
}
