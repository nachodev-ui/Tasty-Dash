export interface Producto {
  id: number
  nombre: string
  precio: number
  imagen: string
  categoria: Categoria
  categoriaId: number
}

export interface Categoria {
  id: number
  icono: string
  nombre: string
}
