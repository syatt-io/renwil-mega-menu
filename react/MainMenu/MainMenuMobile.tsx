import React from 'react'
import type { ReactNode } from 'react'
import classNames from 'classnames'

import { MenuProvider } from './context/MenuContext'
import { Menus } from './Mobile/Menus'
import styles from './Mobile/mobile-nav.css'

type MenuStateProps = {
  children: ReactNode
}

const MenuState = ({ children }: MenuStateProps) => {
  return <MenuProvider>{children}</MenuProvider>
}

const MainMenuMobile = () => {
  return (
    <MenuState>
      <div className={classNames('bg-white', styles['mobile-nav'])}>
        <Menus />
      </div>
    </MenuState>
  )
}

export default MainMenuMobile
