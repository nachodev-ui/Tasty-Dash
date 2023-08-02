import { useState, useEffect, createContext, ReactNode, SyntheticEvent } from 'react'
import { useRouter } from 'next/router'
import { Categoria, Producto } from '@prisma/client'
import {
  IKioskoContext,
  ProductoConCantidad,
  ObtenerCategoriaActualFn,
  HandleSetProductoFn,
  HandleChangeModalFn,
  HandleAgregarPedidoFn,
  HandleEliminarProductoFn,
  HandleEditarCantidadesFn,
  HandleEnviarPedidoFn,
} from '@/types/types'
import axios from 'axios'
import { toast } from 'react-toastify'

// Obtener la fecha actual
const fecha = Date.now().toString()

// Tipo para la función obtenerCategorias
type ObtenerCategoriasFn = () => void

// Crear un contexto de React para el contexto de KioskoContext
const KioskoContext = createContext<IKioskoContext>({
  loading: true,
  modal: false,
  nombre: '',
  total: 0,
  pedido: [],
  producto: undefined,
  categorias: [],
  categoriaActual: undefined,
  setNombre: () => {},
  obtenerCategoriaActual: () => {},
  handleSetProducto: () => {},
  handleChangeModal: () => {},
  handleEditarCantidades: () => {},
  handleEliminarProducto: () => {},
  handleAgregarPedido: () => {},
  handleEnviarPedido: async () => {},
})

// Tipo para el componente KioskoProvider
interface KioskoProviderProps {
  children: ReactNode // Los hijos que serán envueltos por el proveedor de contexto
}

// Componente KioskoProvider que envuelve a los hijos con el contexto de Kiosko
const KioskoProvider = ({ children }: KioskoProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [modal, setModal] = useState<boolean>(false)
  const [nombre, setNombre] = useState<string>('')
  const [total, setTotal] = useState<number>(0)
  const [pedido, setPedido] = useState<ProductoConCantidad[]>([])
  const [producto, setProducto] = useState<Producto | undefined>()
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [categoriaActual, setCategoriaActual] = useState<Categoria | undefined>()

  const router = useRouter()

  // Ejecutar obtenerCategorias al cargar el componente
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000) // Simulación

    obtenerCategorias()
  }, [])

  useEffect(() => {
    setCategoriaActual(categorias[0])
  }, [categorias])

  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    )
    setTotal(nuevoTotal)
  }, [pedido])

  const obtenerCategorias: ObtenerCategoriasFn = async () => {
    const { data } = await axios.get('/api/categorias')
    setCategorias(data)
  }

  const obtenerCategoriaActual: ObtenerCategoriaActualFn = (id: number) => {
    const categoriaEncontrada = categorias.filter(
      categoria => categoria.id === id
    )
    setCategoriaActual(categoriaEncontrada[0] || undefined)
    router.push('/')
  }

  const handleSetProducto: HandleSetProductoFn = (producto: Producto) => {
    setProducto(producto)
  }

  const handleChangeModal: HandleChangeModalFn = () => {
    setModal(!modal)
  }

  const handleEditarCantidades: HandleEditarCantidadesFn = (id: number) => {
    const productoActualizar = pedido.filter(producto => producto.id === id)
    setProducto(productoActualizar[0])

    setModal(!modal)
  }

  const handleEliminarProducto: HandleEliminarProductoFn = (id: number) => {
    const pedidoActualizado = pedido.filter(producto => producto.id !== id)
    setPedido(pedidoActualizado)
  }

  const handleEnviarPedido: HandleEnviarPedidoFn = async (e: SyntheticEvent) => {
    e.preventDefault()

    try {
      await axios.post('/api/ordenes', {
        nombre,
        total,
        pedido,
        fecha,
      })

      // Resetear la app
      setNombre('')
      setPedido([])
      setCategoriaActual(categorias[0])
      setTotal(0)

      toast.success('Su pedido ha sido enviado')

      setTimeout(() => {
        router.push('/')
      }, 3000)
      
    } catch (error) {
      console.log(error)
    }
  }

  const handleAgregarPedido: HandleAgregarPedidoFn = (producto, cantidad) => {
    if (producto) {
      const productoConCantidad: ProductoConCantidad = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        categoriaId: producto.categoriaId,
        cantidad: cantidad,
      }

      if (pedido.some(productoState => productoState.id === producto.id)) {
        // Si el producto ya existe en el pedido, entonces actualizamos la cantidad
        const pedidoActualizado = pedido.map(productoState =>
          productoState.id === producto.id ? productoConCantidad : productoState
        )

        setPedido(pedidoActualizado)
        toast.success('Cambios guardados')
      } else {
        setPedido([...pedido, productoConCantidad])
        toast.success('Agregado al pedido')
      }
    }
    setModal(false)
  }

  return (
    <KioskoContext.Provider
      value={{
        loading,
        modal,
        nombre,
        setNombre,
        total,
        pedido,
        producto,
        categorias,
        categoriaActual,
        obtenerCategoriaActual,
        handleSetProducto,
        handleChangeModal,
        handleEditarCantidades,
        handleEliminarProducto,
        handleAgregarPedido,
        handleEnviarPedido,
      }}
    >
      {children}
    </KioskoContext.Provider>
  )
}

export { KioskoProvider }

export default KioskoContext
