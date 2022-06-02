import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { useQuery } from 'react-apollo'
import { Link } from 'vtex.render-runtime'
import { IconCaret } from 'vtex.store-icons'

import GET_MENUS from '../../graphql/queries/getMenus.graphql'
import { MenuContext } from '../context/MenuContext'
import styles from './mobile-nav.css'

type MenuItem = {
  index: number
  id: string
  name: string
  slug: string
  menu: string
}

export const ThirdLevelMenuMobile = () => {
  const [thirdLevelItems, setThirdLevelItems] = useState<MenuItem[]>([])

  const { data, loading } = useQuery(GET_MENUS)

  const { menuState, changeSecondLevelMenu } = useContext(MenuContext)

  const ItemsThirdLevelMenu = () => {
    const categories = data?.menus[menuState.firstLevelIndex]?.menu?.find(
      (x: any) => x.id === menuState.secondLevelId
    )

    if (loading) return <span> </span>
    setThirdLevelItems(categories?.menu)

    return (
      <>
        {thirdLevelItems?.map(thirdLevelItem => {
          return (
            <li
              className={classNames(
                'bt b--muted-4',
                styles['mobile-nav__list-item']
              )}
              id={thirdLevelItem.id}
              key={thirdLevelItem.id}
            >
              <Link
                to={thirdLevelItem?.slug}
                className={classNames(
                  'ph6 c-on-base t-heading-5',
                  styles['mobile-nav__list-item-link']
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
      <div className={classNames('flex justify-between items-center')}>
        <button
          className={classNames('pointer', styles['mobile-nav__back-arrow'])}
          onClick={changeSecondLevelMenu}
        >
          <IconCaret
            className={classNames(styles['mobile-nav__next-level-icon'])}
            orientation="left"
            thin="true"
            size="16"
          />
        </button>
        <div
          className={classNames(
            't-heading-4 w-100 tc',
            styles['mobile-nav__category-title']
          )}
        >
          {menuState.secondLevelItemName}
        </div>
      </div>
      <ul className={classNames('list ma0 pa0', styles['mobile-nav__list'])}>
        <ItemsThirdLevelMenu />
      </ul>
    </>
  )
}
