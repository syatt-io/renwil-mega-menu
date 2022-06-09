import classNames from 'classnames'
import React, { ReactNode, useContext, useState } from 'react'
import { useQuery } from 'react-apollo'
import { Link } from 'vtex.render-runtime'
import partition from 'lodash/partition'

import GET_MENUS from '../../graphql/queries/getMenus.graphql'
import { MenuContext } from '../context/MenuContext'
import { ThirdLevelMenu } from './ThirdLevelMenu'
import styles from './main-menu.css'

interface ISecondLevelMenu {
  firstLevel?: number
  imageUrl?: string
  actionUrl?: string
  actionLabel?: string
  imageText?: string
}

interface InfoCardProp {
  imageUrl?: string
  actionUrl?: string
  actionLabel?: string
  imageText?: string
}

type MenuItem = {
  id: string
  name: string
  slug: string
  menu: string
}

const InfoCard = ({ imageUrl, actionUrl, actionLabel, imageText }: InfoCardProp) => {
  return (
    <div
    className={classNames(styles['main-menu__info-card'])}
      >
      <img src={imageUrl} alt={imageText} />
      <Link to={actionUrl}
      className={classNames(
        'pa3 t-heading-4 c-on-base',
        styles['main-menu__info-card-button']
      )}>
        {actionLabel}
      </Link>
    </div>
  )
}

export const SecondLevelMenu = ({ firstLevel = 0, imageUrl, actionUrl, actionLabel, imageText }: ISecondLevelMenu) => {
  const [secondLevelItems, setSecondLevelItems] = useState<MenuItem[]>([])

  const { data, loading } = useQuery(GET_MENUS)

  const { menuState } = useContext(MenuContext)

  const [secondLevelItemsWithChildren, emptySecondLevelItems] = partition(
    secondLevelItems,
    secondLevelItem => secondLevelItem?.menu?.length
  )

  const ItemsSecondLevelMenu = () => {
    const categories = data?.menus?.find((x: any) => x.id === firstLevel)

    if (loading) return <span> </span>
    setSecondLevelItems(categories?.menu)

    let wrappedSecondLevelItems: ReactNode | null = null

    if (emptySecondLevelItems?.length) {
      wrappedSecondLevelItems = (
        <li className={classNames(styles['main-menu__list-item'])}>
          <ul className={classNames('list ma0 pa0')}>
            {emptySecondLevelItems?.map((secondLevelItem: any) => {
              return (
                <li
                  className={classNames(styles['main-menu__list-item'])}
                  key={secondLevelItem.id}
                >
                  <div
                    className={classNames(styles['main-menu__list-item-node'])}
                  >
                    <Link
                      to={secondLevelItem?.slug}
                      className={classNames(
                        'pa3 t-heading-4 c-on-base',
                        styles['main-menu__list-item-link']
                      )}
                    >
                      {secondLevelItem?.name}
                    </Link>
                  </div>
                </li>
              )
            })}
          </ul>
        </li>
      )
    }

    return (
      <>
        {wrappedSecondLevelItems}
        {secondLevelItemsWithChildren?.map((secondLevelItem: any) => {
          let levelThree: ReactNode | null = null

          if (secondLevelItem?.menu?.length) {
            levelThree = <ThirdLevelMenu secondLevel={secondLevelItem.id} />
          }

          return (
            <li
              className={classNames(styles['main-menu__list-item'])}
              key={secondLevelItem.id}
            >
              <div className={classNames(styles['main-menu__list-item-node'])}>
                <Link
                  to={secondLevelItem?.slug}
                  className={classNames(
                    'pa3 t-heading-4 c-on-base',
                    styles['main-menu__list-item-link']
                  )}
                >
                  {secondLevelItem?.name}
                </Link>
                {levelThree}
              </div>
            </li>
          )
        })}
      </>
    )
  }

  return (
    <div
      className={classNames(
        styles['main-menu__mega-nav-wrapper'],
        menuState.secondLevelLength ? '' : 'dn'
      )}
    >
      <div className={classNames(styles['main-menu__mega-nav-inner'])}>
        <nav className={classNames(styles['main-menu__mega-nav'])}>
          <ul className={classNames('list ma0 pa0', styles['main-menu__list'])}>
            <ItemsSecondLevelMenu />
          </ul>
          {imageUrl && <InfoCard imageUrl={imageUrl} actionLabel={actionLabel} actionUrl={actionUrl} imageText={imageText} />}
        </nav>
      </div>
    </div>
  )
}
