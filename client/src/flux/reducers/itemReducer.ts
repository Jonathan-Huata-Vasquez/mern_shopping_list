import {
  GET_ITEMS,
  GET_CATEGORIES,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from '../actions/types';
import { IAction, IItem } from '../../types/interfaces';

const initialState = {
  items: [],
  categories:[],
  loading: false
};

interface IState {
  items: IItem[];
}

export default function(state: IState = initialState, action: IAction) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CATEGORIES:
        return {
          ...state,
          categories: action.payload
        };
    default:
      return state;
  }
}
