import { Injectable } from '@nestjs/common';
import { Pagination } from 'src/Application/@types';
import { ModuleTypeOrmRepository } from 'src/Application/Repositories/Module/ModuleTypeOrm.repository';

@Injectable()
export class GetAllModulesService {
  constructor(private readonly moduleRepository: ModuleTypeOrmRepository) {}

  async execute(pagination?: Pagination) {
    const allModules = await this.moduleRepository.getAllModules(pagination);

    return allModules;
  }
}
