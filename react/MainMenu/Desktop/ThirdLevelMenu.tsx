import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { useQuery } from 'react-apollo'
import { Link } from 'vtex.render-runtime'

import GET_MENUS from '../../graphql/queries/getMenus.graphql'
import { MenuContext } from '../context/MenuContext'
import styles from './main-menu.css'

interface IThirdLevelMenu {
  secondLevel?: number
}

type MenuItem = {
  index: number
  id: string
  name: string
  slug: string
  menu: string
}

export const ThirdLevelMenu = ({ secondLevel = 0 }: IThirdLevelMenu) => {
  const [thirdLevelItems, setThirdLevelItems] = useState<MenuItem[]>([])

  const { data, loading } = useQuery(GET_MENUS)

  const { menuState } = useContext(MenuContext)

  const ItemsThirdLevelMenu = () => {
    const categories = data?.menus[menuState.firstLevelIndex]?.menu?.find(
      (x: any) => x.id === secondLevel
    )

    if (loading) return <span> </span>
    setThirdLevelItems(categories?.menu)

    return (
      <>
        {thirdLevelItems?.map((thirdLevelItem: any) => {
          return (
            <li
              className={styles['main-menu__list-item']}
              key={thirdLevelItem.id}
            >
              <Link
                to={thirdLevelItem?.slug}
                className={classNames(
                  'pa3 c-on-base',
                  styles['main-menu__list-item-link']
                )}
              >
                {thirdLevelItem?.name}
              </Link>
            </li>
          )
        })}
      </>
    )
  }

  return (
    <>
      <ul
        className={classNames(
          'list ma0 pa0',
          styles['main-menu__list-level-3']
        )}
      >
        <ItemsThirdLevelMenu />
      </ul>
    </>
  )
}
