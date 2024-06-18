import { IBook } from 'shared/types/books'

export interface IManageBookRouteState extends IBook {
  type: 'edit' | 'create'
}
