import { Pagination } from 'src/Application/@types';
import { ModuleEntity } from 'src/Application/Entities/Module.entity';
import {
  ModuleRepositoryContract,
  ModuleSearchParam,
} from './Module.repository-contract';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';

export class ModuleTypeOrmRepository implements ModuleRepositoryContract {
  constructor(
    @InjectRepository(ModuleEntity)
    private readonly moduleRepository: Repository<ModuleEntity>,
  ) {}

  async create(moduleEntity: ModuleEntity): Promise<ModuleEntity> {
    try {
      const module = this.moduleRepository.create(moduleEntity);

      const moduleCreated = await this.moduleRepository.save(module);

      return moduleCreated;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllModules(pagination?: Pagination): Promise<ModuleEntity[]> {
    try {
      const allModules = await this.moduleRepository.find({
        take: pagination.take ?? 10,
        skip: pagination.skip ?? 0,
        relations: {
          lessons: true,
        },
      });

      return allModules;
    } catch (error) {
      console.error(error);
    }
  }

  async getBy(search: ModuleSearchParam): Promise<ModuleEntity | null> {
    const [key, value] = Object.entries(search)[0];

    try {
      const module = await this.moduleRepository.findOneBy({ [key]: value });

      return module ?? null;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
