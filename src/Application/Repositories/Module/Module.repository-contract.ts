import { Pagination } from 'src/Application/@types';
import { ModuleEntity } from 'src/Application/Entities/Module.entity';

export type ModuleSearchParam = { id: string } | { title: string };

export interface ModuleRepositoryContract {
  create(moduleEntity: ModuleEntity): Promise<ModuleEntity>;
  getAllModules(pagination?: Pagination): Promise<ModuleEntity[]>;
  getBy(search: ModuleSearchParam): Promise<ModuleEntity>;
}
