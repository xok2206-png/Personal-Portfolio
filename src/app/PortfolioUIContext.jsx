import { createContext, useContext } from 'react'

export const PortfolioUIContext = createContext({
  reduced: false,
  systemReduced: false,
  paused: false,
  setPaused: () => {},
  sound: false,
  setSound: () => {},
  tone: () => {},
})

export function usePortfolioUI() {
  return useContext(PortfolioUIContext)
}
