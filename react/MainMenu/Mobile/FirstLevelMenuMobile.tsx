import React, { useContext } from 'react'
import classNames from 'classnames'
import { useQuery } from 'react-apollo'
import { Link } from 'vtex.render-runtime'
import { IconCaret } from 'vtex.store-icons'

import GET_MENUS from '../../graphql/queries/getMenus.graphql'
import { MenuContext } from '../context/MenuContext'
import styles from './mobile-nav.css'

export const FirstLevelMenuMobile = () => {
  const { data, loading } = useQuery(GET_MENUS)

  const {
    changeItemsFirstLevelId,
    changeFirstLevelItemName,
    changeSecondLevelMenu,
    changeItemsFirstLevelIndex,
    changeFirstLevelItemSlug,
  } = useContext(MenuContext)

  const ItemsFirstLevelMenuMobile = () => {
    if (loading) return <span> Loading... </span>

    return (
      <>
        {data.menus?.map((firstLevelItem: any, index: number) => {
          if (firstLevelItem?.menu?.length) {
            return (
              <li
                className={classNames(
                  styles['mobile-nav__list-item'],
                  index === 0 ? '' : 'bt b--muted-4'
                )}
                id={firstLevelItem.id}
                key={firstLevelItem.id}
              >
                <button
                  className={classNames(
                    'flex justify-between items-center pointer w-100 tl pa0',
                    styles['mobile-nav__list-item-button']
                  )}
                  onClick={() => {
                    changeItemsFirstLevelId(firstLevelItem.id)
                    changeFirstLevelItemName(firstLevelItem.name)
                    changeFirstLevelItemSlug(firstLevelItem.slug)
                    changeItemsFirstLevelIndex(index)
                    changeSecondLevelMenu()
                  }}
                >
                  <div
                    className={classNames(
                      'w-100 ph6 t-heading-4 c-on-base',
                      styles['mobile-nav__list-item-text']
                    )}
                  >
                    {firstLevelItem.name}
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
            <>
              <li
                className={classNames(
                  'bt b--muted-4',
                  styles['mobile-nav__list-item']
                )}
                id={firstLevelItem.id}
                key={firstLevelItem.id}
              >
                <Link
                  className={classNames(
                    'ph6 t-heading-4 c-on-base',
                    styles['mobile-nav__list-item-link']
                  )}
                  to={firstLevelItem.slug}
                >
                  {firstLevelItem.name}
                </Link>
              </li>
            </>
          )
        })}
      </>
    )
  }

  return (
    <ul className={classNames('list ma0 pa0', styles['mobile-nav__list'])}>
      <ItemsFirstLevelMenuMobile />
    </ul>
  )
}
