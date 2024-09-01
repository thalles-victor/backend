import { Pagination } from '@types';
import {
  RecoverAccountEntity,
  RecoverAccountUpdateEntity,
} from 'src/Application/Entities/RecoverAccount.entity';
import {
  IRecoverAccountRepositoryContract,
  RecoverAccountUniqueParams,
} from './IRecoverAccount.repository-contract';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { splitKeyAnValue } from 'src/utils/validators';

@Injectable()
export class RecoverAccountTypeOrmRepository
  implements IRecoverAccountRepositoryContract
{
  constructor(
    @InjectRepository(RecoverAccountEntity)
    private readonly recoverAccountTypeOrmRepository: Repository<RecoverAccountEntity>,
  ) {}

  async create(entity: RecoverAccountEntity): Promise<RecoverAccountEntity> {
    try {
      const recoverAccountEntity =
        this.recoverAccountTypeOrmRepository.create(entity);

      return this.recoverAccountTypeOrmRepository.save(recoverAccountEntity);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async update(
    param: RecoverAccountUniqueParams,
    updateEntity: RecoverAccountUpdateEntity,
  ): Promise<RecoverAccountEntity> {
    const [key, value] = splitKeyAnValue(param);

    try {
      const recoverAccountToUpdate =
        await this.recoverAccountTypeOrmRepository.findOneBy({ [key]: value });

      const recoverAccountUPdated = Object.assign(
        recoverAccountToUpdate,
        updateEntity,
      );

      return this.recoverAccountTypeOrmRepository.save(recoverAccountUPdated);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async delete(param: RecoverAccountUniqueParams): Promise<'success' | 'fail'> {
    const [key, value] = splitKeyAnValue(param);

    try {
      await this.recoverAccountTypeOrmRepository.delete({ [key]: value });

      return 'success';
    } catch (error) {
      return 'fail';
    }
  }

  getAll(pagination: Pagination): Promise<RecoverAccountEntity[]> {
    return this.recoverAccountTypeOrmRepository.find({
      take: pagination.take,
      skip: pagination.skip,
    });
  }

  getBy(param: RecoverAccountUniqueParams): Promise<RecoverAccountEntity> {
    const [key, value] = splitKeyAnValue<RecoverAccountUniqueParams>(param);

    const recoverAccount = this.recoverAccountTypeOrmRepository.findOneBy({
      [key]: value,
    });

    return recoverAccount;
  }

  async getByStudentId(student_id: string): Promise<RecoverAccountEntity> {
    const recoverAccount = await this.recoverAccountTypeOrmRepository.findOneBy(
      {
        Student: {
          id: student_id,
        },
      },
    );

    return recoverAccount ?? null;
  }
}
