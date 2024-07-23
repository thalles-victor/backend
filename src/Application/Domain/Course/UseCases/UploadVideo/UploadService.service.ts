import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { VideoEntity } from 'src/Application/Entities/Video.entity';
// import { VideoLessonsEntity } from 'src/Application/Entities/Module.entity';
import { VideoTypeOrmRepository } from 'src/Application/Repositories/Files/Videos/VideoTypeOrm.repository';
import { defaultUUID_V4, generateVideoId } from 'src/utils/id-generate';

@Injectable()
export class UploadVideoService {
  constructor(private readonly videoRepository: VideoTypeOrmRepository) {}

  async execute(file: Express.Multer.File) {
    const video_id: string = generateVideoId(file.originalname);
    const filePath = path.join(
      process.cwd(),
      'src',
      '@assets',
      'Course',
      'Modules',
      'Module-1-Iniciando-Com-nestjs',
      video_id,
    );

    const videoEntity = Object.assign(new VideoEntity(), {
      id: defaultUUID_V4(),
      video_id: video_id,
      format: file.mimetype,
      original_file_name: file.originalname,
      path: filePath,
      upload_at: new Date(),
      updated_at: new Date(),
    } as VideoEntity);

    try {
      fs.writeFileSync(filePath, file.buffer);
      const videoSaved = await this.videoRepository.create(videoEntity);

      console.log(videoSaved);

      return videoSaved;
    } catch (error) {
      console.log(error);
    }
  }
}
