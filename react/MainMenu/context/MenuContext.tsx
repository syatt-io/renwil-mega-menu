/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import React, { createContext, useReducer } from 'react'

import { menuReducer } from './menuReducer'

// Definir cómo luce, qué información tendrá (tipado)
export interface MenuState {
  firstLevelId?: string
  secondLevelId?: string
  firstLevelIndex: number
  secondLevelLength: number
  secondLevelIndex: number
  firstLevelItemName: string
  firstLevelItemSlug: string
  secondLevelItemName: string
  secondLevelItemSlug: string
  setFirstLevelMenu: boolean
  setSecondLevelMenu: boolean
  setThirdLevelMenu: boolean
  thirdLevelLength: number
}

// Estado inicial
export const menuInitialState: MenuState = {
  firstLevelId: '',
  secondLevelId: '',
  firstLevelIndex: 0,
  secondLevelLength: 0,
  secondLevelIndex: 0,
  firstLevelItemName: '',
  firstLevelItemSlug: '',
  secondLevelItemName: '',
  secondLevelItemSlug: '',
  setFirstLevelMenu: true,
  setSecondLevelMenu: false,
  setThirdLevelMenu: false,
  thirdLevelLength: 0,
}

// Se usará para decirle a React cómo luce y qué expone el context
export interface MenuContextProps {
  menuState: MenuState
  changeItemsFirstLevelId: (firstLevelId: string) => void
  changeItemsSecondLevelId: (secondLevelId: string) => void
  changeItemsFirstLevelIndex: (firstLevelIndex: number) => void
  changeSecondLevelLength: (secondLevelLength: number) => void
  changeSecondLevelIndex: (secondLevelIndex: number) => void
  changeFirstLevelItemName: (firstLevelItemName: string) => void
  changeFirstLevelItemSlug: (firstLevelItemName: string) => void
  changeSecondLevelItemName: (firstLevelItemName: string) => void
  changeSecondLevelItemSlug: (firstLevelItemName: string) => void
  changeFirstLevelMenu: () => void
  changeSecondLevelMenu: () => void
  changeThirdLevelMenu: () => void
  changeThirdLevelLength: (thirdLevelLength: number) => void
}

// Crear el contexto
export const MenuContext = createContext({} as MenuContextProps)

// Componente proveedor del estado
export const MenuProvider = ({ children }: any) => {
  const [menuState, dispatch] = useReducer(menuReducer, menuInitialState)

  const changeItemsFirstLevelId = (firstLevelId: string) => {
    dispatch({ type: 'changeItemsFirstLevelId', payload: firstLevelId })
  }

  const changeItemsFirstLevelIndex = (firstLevelIndex: number) => {
    dispatch({ type: 'changeItemsFirstLevelIndex', payload: firstLevelIndex })
  }

  const changeSecondLevelLength = (secondLevelLength: number) => {
    dispatch({ type: 'changeSecondLevelLength', payload: secondLevelLength })
  }

  const changeSecondLevelIndex = (secondLevelIndex: number) => {
    dispatch({ type: 'changeSecondLevelIndex', payload: secondLevelIndex })
  }

  const changeFirstLevelItemName = (firstLevelItemName: string) => {
    dispatch({ type: 'changeFirstLevelItemName', payload: firstLevelItemName })
  }

  const changeFirstLevelItemSlug = (firstLevelItemSlug: string) => {
    dispatch({ type: 'changeFirstLevelItemSlug', payload: firstLevelItemSlug })
  }

  const changeSecondLevelItemName = (secondLevelItemName: string) => {
    dispatch({
      type: 'changeSecondLevelItemName',
      payload: secondLevelItemName,
    })
  }

  const changeSecondLevelItemSlug = (secondLevelItemSlug: string) => {
    dispatch({
      type: 'changeSecondLevelItemSlug',
      payload: secondLevelItemSlug,
    })
  }

  const changeItemsSecondLevelId = (secondLevelId: string) => {
    dispatch({ type: 'changeItemsSecondLevelId', payload: secondLevelId })
  }

  const changeFirstLevelMenu = () => {
    dispatch({ type: 'changeFirstLevelMenu' })
  }

  const changeSecondLevelMenu = () => {
    dispatch({ type: 'changeSecondLevelMenu' })
  }

  const changeThirdLevelMenu = () => {
    dispatch({ type: 'changeThirdLevelMenu' })
  }

  const changeThirdLevelLength = (thirdLevelLength: number) => {
    dispatch({ type: 'changeThirdLevelLength', payload: thirdLevelLength })
  }

  return (
    <MenuContext.Provider
      value={{
        menuState,
        changeItemsFirstLevelId,
        changeItemsSecondLevelId,
        changeItemsFirstLevelIndex,
        changeSecondLevelLength,
        changeSecondLevelIndex,
        changeFirstLevelItemName,
        changeFirstLevelItemSlug,
        changeSecondLevelItemName,
        changeSecondLevelItemSlug,
        changeFirstLevelMenu,
        changeSecondLevelMenu,
        changeThirdLevelMenu,
        changeThirdLevelLength,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}
