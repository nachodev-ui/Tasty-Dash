import { useContext } from 'react'
import KioskoContext from '@/context/KioskoProvider'

const useKiosko = () => {
  return useContext(KioskoContext)
}

export default useKiosko
