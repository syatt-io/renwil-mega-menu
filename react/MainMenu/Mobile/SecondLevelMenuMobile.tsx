import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { useQuery } from 'react-apollo'
import { Link } from 'vtex.render-runtime'
import { IconCaret } from 'vtex.store-icons'

import GET_MENUS from '../../graphql/queries/getMenus.graphql'
import { MenuContext } from '../context/MenuContext'
import styles from './mobile-nav.css'

type MenuItem = {
  id: string
  name: string
  slug: string
  menu: string
}

export const SecondLevelMenuMobile = () => {
  const [secondLevelItems, setSecondLevelItems] = useState<MenuItem[]>([])

  const { data, loading } = useQuery(GET_MENUS)

  const {
    menuState,
    changeItemsSecondLevelId,
    changeSecondLevelItemName,
    changeSecondLevelIndex,
    changeThirdLevelMenu,
    changeFirstLevelMenu,
    changeSecondLevelItemSlug,
  } = useContext(MenuContext)

  const ItemsSecondLevelMenu = () => {
    const categories = data?.menus?.find(
      (x: any) => x.id === menuState.firstLevelId
    )

    if (loading) return <span> </span>
    setSecondLevelItems(categories?.menu)

    return (
      <>
        {secondLevelItems?.map((secondLevelItem, index) => {
          if (secondLevelItem?.menu?.length) {
            return (
              <li
                className={classNames(
                  styles['mobile-nav__list-item'],
                  index === 0 ? '' : 'bt b--muted-4'
                )}
                id={secondLevelItem.id}
                key={secondLevelItem.id}
              >
                <button
                  className={classNames(
                    'flex justify-between items-center pointer w-100 tl pa0',
                    styles['mobile-nav__list-item-button']
                  )}
                  onClick={() => {
                    changeItemsSecondLevelId(secondLevelItem.id)
                    changeSecondLevelItemName(secondLevelItem.name)
                    changeSecondLevelItemSlug(secondLevelItem.slug)
                    changeSecondLevelIndex(index)
                    changeThirdLevelMenu()
                  }}
                >
                  <div
                    className={classNames(
                      'ph6 w-100 t-heading-4 c-on-base',
                      styles['mobile-nav__list-item-text']
                    )}
                  >
                    {secondLevelItem.name}
                  </div>
                  <div
                    className={classNames(
                      'pointer',
                      styles['mobile-nav__next-level-arrow']
                    )}
                  >
                    <IconCaret
                      className={classNames(
                        styles['mobile-nav__next-level-icon']
                      )}
                      orientation="right"
                      thin="true"
                      size="16"
                    />
                  </div>
                </button>
              </li>
            )
          }

          return (
            <li
              className={classNames(
                'bt b--muted-4',
                styles['mobile-nav__list-item']
              )}
              id={secondLevelItem.id}
              key={secondLevelItem.id}
            >
              <Link
                className={classNames(
                  'ph6 t-heading-5 c-on-base',
                  styles['mobile-nav__list-item-link']
                )}
                to={secondLevelItem.slug}
              >
                {secondLevelItem.name}
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
          className={classNames(
            'ph5 pointer',
            styles['mobile-nav__back-arrow']
          )}
          onClick={changeFirstLevelMenu}
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
          {menuState.firstLevelItemName}
        </div>
      </div>
      <ul className={classNames('list ma0 pa0', styles['mobile-nav__list'])}>
        <ItemsSecondLevelMenu />
      </ul>
    </>
  )
}
