import { useRouter } from 'next/router'
import { Paso } from '@/types/types'

const Pasos = ({ pasos }: { pasos: Paso[] }) => {
  const router = useRouter()

  const calcularProgreso = (): number => {
    if (router.pathname === '/') return 23
    if (router.pathname === '/resumen') return 52
    if (router.pathname === '/total') return 100
    return 0
  }

  return (
    <>
      <div className="flex justify-between mb-8 px-24">
        {pasos.map(({ paso, nombre, url }) => (
          <button
            key={paso}
            className="text-2xl font-bold"
            onClick={() => {
              router.push(url)
            }}
          >
            {nombre}
          </button>
        ))}
      </div>

      <div className="bg-gray-100 mb-10">
        <div
          className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white"
          style={{ width: `${calcularProgreso()}%` }}
        ></div>
      </div>
    </>
  )
}

export default Pasos
