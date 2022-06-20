import type { MenuState } from './MenuContext'

type MenuAction =
  | { type: 'changeItemsFirstLevelId'; payload: string }
  | { type: 'changeItemsSecondLevelId'; payload: string }
  | { type: 'changeItemsFirstLevelIndex'; payload: number }
  | { type: 'changeSecondLevelLength'; payload: number }
  | { type: 'changeSecondLevelIndex'; payload: number }
  | { type: 'changeFirstLevelItemName'; payload: string }
  | { type: 'changeFirstLevelItemSlug'; payload: string }
  | { type: 'changeSecondLevelItemName'; payload: string }
  | { type: 'changeSecondLevelItemSlug'; payload: string }
  | { type: 'changeFirstLevelMenu' }
  | { type: 'changeSecondLevelMenu' }
  | { type: 'changeThirdLevelMenu' }
  | { type: 'changeThirdLevelLength'; payload: number }

export const menuReducer = (
  state: MenuState,
  action: MenuAction
): MenuState => {
  switch (action.type) {
    case 'changeItemsFirstLevelId':
      return {
        ...state,
        firstLevelId: action.payload,
      }

    case 'changeItemsSecondLevelId':
      return {
        ...state,
        secondLevelId: action.payload,
      }

    case 'changeItemsFirstLevelIndex':
      return {
        ...state,
        firstLevelIndex: action.payload,
      }

    case 'changeSecondLevelLength':
      return {
        ...state,
        secondLevelLength: action.payload,
      }

    case 'changeSecondLevelIndex':
      return {
        ...state,
        secondLevelIndex: action.payload,
      }

    case 'changeFirstLevelItemName':
      return {
        ...state,
        firstLevelItemName: action.payload,
      }

    case 'changeFirstLevelItemSlug':
      return {
        ...state,
        firstLevelItemSlug: action.payload,
      }

    case 'changeSecondLevelItemName':
      return {
        ...state,
        secondLevelItemName: action.payload,
      }

    case 'changeSecondLevelItemSlug':
      return {
        ...state,
        secondLevelItemSlug: action.payload,
      }

    case 'changeFirstLevelMenu':
      return {
        ...state,
        setFirstLevelMenu: true,
        setSecondLevelMenu: false,
        setThirdLevelMenu: false,
      }

    case 'changeSecondLevelMenu':
      return {
        ...state,
        setFirstLevelMenu: false,
        setSecondLevelMenu: true,
        setThirdLevelMenu: false,
      }

    case 'changeThirdLevelMenu':
      return {
        ...state,
        setFirstLevelMenu: false,
        setSecondLevelMenu: false,
        setThirdLevelMenu: true,
      }

    case 'changeThirdLevelLength':
      return {
        ...state,
        thirdLevelLength: action.payload,
      }

    default:
      return state
  }
}
