import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from 'src/Application/Entities/Video.entity';

import { Repository } from 'typeorm';
import {
  VideoSearchParam,
  VideoRepositoryContract,
} from './Video.repository-contract';

@Injectable()
export class VideoTypeOrmRepository implements VideoRepositoryContract {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoTypeOrmRepository: Repository<VideoEntity>,
  ) {}

  async create(videoEntity: VideoEntity) {
    let videoSaved: VideoEntity | undefined = undefined;

    const videoToSave = Object.assign(new VideoEntity(), {
      ...videoEntity,
    } as VideoEntity);

    try {
      videoSaved = await this.videoTypeOrmRepository.save(videoToSave);

      return videoSaved;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBy<T extends VideoSearchParam>(
    param: T,
  ): Promise<VideoEntity | null> {
    const [key, value] = Object.entries(param)[0];

    const video = await this.videoTypeOrmRepository.findOneBy({ [key]: value });

    return video ?? null;
  }

  async deleteBy(param: VideoSearchParam): Promise<'success' | 'fail'> {
    const [key, value] = Object.entries(param)[0];

    try {
      await this.videoTypeOrmRepository.delete({ [key]: value });

      return 'success';
    } catch (error) {
      return 'fail';
    }
  }
}
