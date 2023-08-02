import { ReactNode } from 'react'
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify'
import Head from 'next/head'
import Pasos from '@/components/Pasos'
import Sidebar from '@/components/Sidebar'
import ModalProducto from '@/components/ModalProducto'
import useKiosko from '@/hooks/useKiosko'
import 'react-toastify/ReactToastify.css'

const pasos = [
  { paso: 1, nombre: 'Menú', url: '/' },
  { paso: 2, nombre: 'Resumen', url: '/resumen' },
  { paso: 3, nombre: 'Datos y Total', url: '/total' },
]

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#__next')

interface ILayout {
  children: ReactNode
  pagina: string
}

const Layout = ({ children, pagina }: ILayout) => {
  const { modal } = useKiosko()

  return (
    <>
      <Head>
        <title>Tasty Dash - {pagina}</title>
        <meta name="description" content="Kiosco, cafetería." />
      </Head>

      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
          <Sidebar />
        </aside>

        <main className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
          <div className="p-10">
            <Pasos pasos={pasos} />
            {children}
          </div>
        </main>
      </div>

      {
        <Modal
          isOpen={modal}
          style={customStyles}
          contentLabel="Modal producto"
        >
          <ModalProducto />
        </Modal>
      }

      <ToastContainer autoClose={3000} />
    </>
  )
}

export default Layout
