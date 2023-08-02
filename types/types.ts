/* eslint-disable no-unused-vars */

// Types for interfaces
import { SyntheticEvent } from 'react'
import { Categoria, Producto } from '@prisma/client'

interface ProductoSinCategoria extends Producto {}

// Definir una nueva interfaz ProductoConCantidad que extienda ProductoSinImagenCategoria
export interface ProductoConCantidad extends ProductoSinCategoria {
  cantidad: number;
}

export interface IKioskoContext {
  loading: boolean
  modal: boolean
  nombre: string
  total: number | 0
  setNombre: SetNombreFn
  pedido: ProductoConCantidad[]
  producto: Producto | undefined
  categorias: Categoria[]
  categoriaActual: Categoria | undefined
  obtenerCategoriaActual: ObtenerCategoriaActualFn
  handleSetProducto: HandleSetProductoFn
  handleChangeModal: HandleChangeModalFn
  handleEditarCantidades: HandleEditarCantidadesFn
  handleEliminarProducto: HandleEliminarProductoFn
  handleAgregarPedido: HandleAgregarPedidoFn
  handleEnviarPedido: HandleEnviarPedidoFn
}

export interface Paso {
  paso: number
  nombre: string
  url: string
}

export type ObtenerCategoriaActualFn = (id: number) => void

export type HandleSetProductoFn = (producto: Producto) => void

export type HandleChangeModalFn = () => void

export type SetNombreFn = (nombre: string) => void

export type HandleEditarCantidadesFn = (id: number) => void

export type HandleEliminarProductoFn = (id: number) => void

export type HandleEnviarPedidoFn = (e: SyntheticEvent) => Promise<void>

export type HandleAgregarPedidoFn = (producto: ProductoConCantidad, cantidad: number) => void
