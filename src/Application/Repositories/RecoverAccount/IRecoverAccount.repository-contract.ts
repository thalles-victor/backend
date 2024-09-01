import { IBaseRepositoryContract } from '../IBaseRepository.contract';
import {
  RecoverAccountEntity,
  RecoverAccountUpdateEntity,
} from 'src/Application/Entities/RecoverAccount.entity';

export type RecoverAccountUniqueParams = { id: string };

export interface IRecoverAccountRepositoryContract
  extends IBaseRepositoryContract<
    RecoverAccountEntity,
    RecoverAccountUpdateEntity,
    RecoverAccountUniqueParams
  > {}
