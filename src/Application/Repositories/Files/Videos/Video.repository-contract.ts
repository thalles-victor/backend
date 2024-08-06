import { VideoEntity } from 'src/Application/Entities/Video.entity';

export type VideoSearchParam = { id: string } | { video_id: string };

export interface VideoRepositoryContract {
  create(videoEntity: VideoEntity): Promise<VideoEntity>;
  getBy(param: VideoSearchParam): Promise<VideoEntity | null>;
  deleteBy(pram: VideoSearchParam): Promise<'success' | 'fail'>;
  getNumberOfLessons(): Promise<number>;
}
