import { Pagination } from '@types';

export interface IBaseRepositoryContract<Entity, UpdateEntity, UniqueParams> {
  create(entity: Entity): Promise<Entity>;
  update(param: UniqueParams, updateEntity: UpdateEntity): Promise<Entity>;
  delete(param: UniqueParams): Promise<'success' | 'fail'>;
  getAll(pagination: Pagination): Promise<Entity[]>;
  getBy(param: UniqueParams): Promise<Entity>;
}
