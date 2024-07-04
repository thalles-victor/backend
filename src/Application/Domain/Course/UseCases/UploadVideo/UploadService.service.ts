import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';

@Injectable()
export class UploadVideoService {
  constructor() {}

  execute(file: Express.Multer.File) {
    const filePath = path.join(
      process.cwd(),
      'src',
      '@assets',
      'Course',
      'Modules',
      'Module-1-Iniciando-Com-nestjs',
      file.originalname,
    );

    try {
      fs.writeFileSync(filePath, file.buffer);

      return null;
    } catch (error) {
      console.log(error);
    }
  }
}
