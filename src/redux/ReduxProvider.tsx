'use client'

import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'

// Define the types for the props
interface ReduxProviderProps {
  children: ReactNode
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
