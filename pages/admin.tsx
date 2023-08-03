import useSWR from 'swr'
import axios from 'axios'
import AdminLayout from '@/layout/AdminLayout'
import Orden from '@/components/Orden'
import { IOrden } from '@/components/Orden'

export default function Admin() {
  const fetcher = () => axios('/api/ordenes').then(res => res.data)

  const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {refreshInterval: 1000})

  if (isLoading) return <p>Cargando...</p>

  if (error) return <p>Hubo un error</p>

  return (
    <AdminLayout pagina="Administración">
      <section className="flex justify-center items-center">
        <h1 className="text-4xl text-gray-800 font-bold">
          Panel de administración
        </h1>
      </section>

      {data && data.length ? (
        <section className="mt-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10">Ordenes disponibles: </h2>

          <div className="sm:flex sm:flex-col -mx-3">
            {data.map((orden: IOrden) => (
              <Orden 
                key={orden.id} 
                orden={orden} 
              />
            ))}
          </div>
        </section>
      ) : (
        <p className="mt-5 text-center text-2xl">No hay ordenes aún</p>
      )}
    </AdminLayout>
  )
}
