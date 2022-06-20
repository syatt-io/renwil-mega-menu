import classNames from 'classnames'
import React, { useContext } from 'react'

import { MenuContext } from '../context/MenuContext'
import { FirstLevelMenuMobile } from './FirstLevelMenuMobile'
import { SecondLevelMenuMobile } from './SecondLevelMenuMobile'
import { ThirdLevelMenuMobile } from './ThirdLevelMenuMobile'
import styles from './mobile-nav.css'

export const Menus = () => {
  const { menuState } = useContext(MenuContext)

  return (
    <nav className={classNames(styles['mobile-nav__nav'])}>
      {menuState.setSecondLevelMenu ? (
        <SecondLevelMenuMobile />
      ) : menuState.setThirdLevelMenu ? (
        <ThirdLevelMenuMobile />
      ) : (
        <FirstLevelMenuMobile />
      )}
    </nav>
  )
}
