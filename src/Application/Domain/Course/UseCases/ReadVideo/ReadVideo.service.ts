import * as fs from 'node:fs';
import * as path from 'node:path';
import { Stream } from 'node:stream';

type ReadVideoOptionsServiceProps = {
  start: number;
  end: number;
};

export class ReadLessonService {
  async execute(
    module: string,
    lesson: string,
    { start, end }: ReadVideoOptionsServiceProps,
  ): Promise<Stream> {
    const path = this.getVideoPath(module, lesson);

    const stream = fs.createReadStream(path, { start, end });

    return stream;
  }

  public getVideoPath(module: string, lesson: string) {
    return path.join(
      process.cwd(),
      'src',
      '@assets',
      'Course',
      'Modules',
      module,
      lesson,
    );
  }

  public getVideosInformation(module: string, lesson: string) {
    const path = this.getVideoPath(module, lesson);

    const information = fs.statSync(path);

    return information;
  }
}
