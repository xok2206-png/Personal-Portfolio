import { createContext, useContext } from 'react'

export const PortfolioUIContext = createContext({
  reduced: false,
  tone: () => {},
})

export function usePortfolioUI() {
  return useContext(PortfolioUIContext)
}
