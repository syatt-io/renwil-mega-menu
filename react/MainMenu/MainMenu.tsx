import React from 'react'
import type { ReactNode } from 'react'
import classNames from 'classnames'

import { FirstLevelMenu } from './Desktop/FirstLevelMenu'
import { MenuProvider } from './context/MenuContext'
import styles from './Desktop/main-menu.css'

// update to prop type for children
type MenuStateProps = {
  children: ReactNode
}

const MenuState = ({ children }: MenuStateProps) => {
  return <MenuProvider>{children}</MenuProvider>
}

const MainMenu = () => {
  return (
    <MenuState>
      <div className={classNames(styles['main-menu'])}>
        <div className={classNames(styles['main-menu__primary-nav'])}>
          <FirstLevelMenu />
        </div>
      </div>
    </MenuState>
  )
}

export default MainMenu
