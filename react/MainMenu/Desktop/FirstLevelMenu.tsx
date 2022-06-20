import classNames from 'classnames'
import React, { ReactElement, useContext } from 'react'
import { useQuery } from 'react-apollo'
import { Link } from 'vtex.render-runtime'

import GET_MENUS from '../../graphql/queries/getMenus.graphql'
import { MenuContext } from '../context/MenuContext'
import { SecondLevelMenu } from './SecondLevelMenu'
import styles from './primary-nav.css'

export const FirstLevelMenu = () => {
  const whitelabel = localStorage.getItem('whiteLabel')

  const { data, loading } = useQuery(GET_MENUS)

  const { menuState } = useContext(MenuContext)
  const { firstLevelIndex } = menuState

  const ItemsFirstLevelMenu = () => {
    if (loading) {
      return (
        <div className={classNames(styles['primary-nav__loading'])}>
          Loading...
        </div>
      )
    }

    return (
      <>
        {data?.menus?.map((firstLevelItem: any, index: number) => {
          if (
            firstLevelItem.name === 'Supermercado' &&
            // eslint-disable-next-line eqeqeq
            (whitelabel == 'SW#' || whitelabel === '')
          ) {
            return
          }

          let levelTwo: ReactElement | null = null

          if (firstLevelItem?.menu?.length) {
            levelTwo = <SecondLevelMenu firstLevel={firstLevelItem.id}
              imageUrl={firstLevelItem.imageUrl}
              actionUrl={firstLevelItem.actionUrl}
              actionLabel={firstLevelItem.actionLabel}
              imageText={firstLevelItem.imageText}
            />
          }

          return (
            <>
            <li
              id={firstLevelItem.id}
              className={classNames(
                't-heading-5',
                styles['primary-nav__list-item']
              )}
              key={index}
            >
              <Link
                className={classNames(
                  'c-on-base',
                  styles['primary-nav__list-item-node']
                )}
                to={firstLevelItem.slug}
              >
                <span
                  className={classNames(
                    styles['primary-nav__list-item-text'],
                    firstLevelIndex === index
                      ? styles['primary-nav__list-item-text--active']
                      : ''
                  )}
                >
                  {firstLevelItem.name}
                </span>
              </Link>
              {levelTwo}
            </li>
            </>
          )
        })}
      </>
    )
  }

  return (
    <nav className={classNames('bg-muted-5', styles['primary-nav'])}>
      <ul
        className={classNames(
          styles['primary-nav__list'],
          'list flex justify-around ma0 pa0'
        )}
      >
        <ItemsFirstLevelMenu />
      </ul>
    </nav>
  )
}
