import * as fs from 'node:fs';
import * as path from 'node:path';
import { Stream } from 'node:stream';

type ReadVideoOptionsServiceProps = {
  start: number;
  end: number;
};

export class ReadLessonService {
  async execute(
    nameId: string,
    { start, end }: ReadVideoOptionsServiceProps,
  ): Promise<Stream> {
    const path = this.getVideoPath(nameId);

    const stream = fs.createReadStream(path, { start, end });

    return stream;
  }

  public getVideoPath(nameId: string) {
    return path.join(
      process.cwd(),
      'src',
      '@assets',
      'Course',
      'Modules',
      'Module 1 - Iniciando Com nestjs',
      nameId,
    );
  }

  public getVideosInformation(nameId: string) {
    const path = this.getVideoPath(nameId);

    const information = fs.statSync(path);

    return information;
  }
}
