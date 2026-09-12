import { Tag } from '../../tag/models/tag.model';

export type SharePermission = 'READ' | 'EDIT';

export interface Note {
  id: number;
  title: string;
  content: string;
  archived: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  tags?: Tag[];
  permission?: SharePermission;
}
