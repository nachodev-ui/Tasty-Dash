import Image from 'next/image'
import Categoria from './Categoria'
import Loader from './Loader'
import useKiosko from '@/hooks/useKiosko'

const Sidebar = () => {
  const { categorias, loading } = useKiosko()

  return (
    <>
      <Image
        width={160}
        height={100}
        src="/assets/img/logo.svg"
        alt="Imagen logotipo"
        className='mx-auto my-4'
      />

      <nav className="mt-5">
        <ul>
          {loading ? (
            <Loader />
          ) : (
            categorias.map(categoria => (
              <Categoria key={categoria.id} categoria={categoria} />
            ))
          )}
        </ul>
      </nav>
    </>
  )
}

export default Sidebar
