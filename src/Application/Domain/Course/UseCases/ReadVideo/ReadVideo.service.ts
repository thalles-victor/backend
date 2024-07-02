import * as fs from 'node:fs';
import * as path from 'node:path';
import { Stream } from 'node:stream';

type ReadVideoServiceProps = {
  start: number;
  end: number;
};

export class ReadLessonService {
  async execute({ start, end }: ReadVideoServiceProps): Promise<Stream> {
    const stream = fs.createReadStream(
      path.join(
        process.cwd(),
        'src',
        '@assets',
        'Course',
        'Modules',
        'Module 1 - Iniciando Com nestjs',
        'Nestjs Aula 01.mp4',
      ),
      { start, end },
    );

    return stream;
  }

  public getVideoPath() {
    return path.join(
      process.cwd(),
      'src',
      '@assets',
      'Course',
      'Modules',
      'Module 1 - Iniciando Com nestjs',
      'Nestjs Aula 01.mp4',
    );
  }

  public getVideosInformation() {
    const path = this.getVideoPath();

    const information = fs.statSync(path);

    return information;
  }
}
