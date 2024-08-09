import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateModuleDto } from './CreateModule.dto';
import { ModuleEntity } from 'src/Application/Entities/Module.entity';
import { ModuleTypeOrmRepository } from 'src/Application/Repositories/Module/ModuleTypeOrm.repository';
import { defaultUUID_V4 } from '@utils';

@Injectable()
export class CreateModuleService {
  constructor(private readonly moduleRepository: ModuleTypeOrmRepository) {}

  async execute(createModuleDto: CreateModuleDto): Promise<ModuleEntity> {
    // check if not exist module at same title

    const existWithSameTitle = await this.moduleRepository.getBy({
      title: createModuleDto.title,
    });

    if (existWithSameTitle) {
      throw new BadRequestException('There is already a module with that name');
    }

    const moduleEntity = Object.assign(new ModuleEntity(), {
      id: defaultUUID_V4(),
      lessons: [],
      title: createModuleDto.title,
      description: createModuleDto.description ?? null,
      create_at: new Date(),
      updated_at: new Date(),
    } as ModuleEntity);

    const moduleCreated = await this.moduleRepository.create(moduleEntity);

    return moduleCreated;
  }
}
