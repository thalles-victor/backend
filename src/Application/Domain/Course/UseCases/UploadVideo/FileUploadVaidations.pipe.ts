import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: any) {
    const oneKb = 1000;
    return value < oneKb;
  }
}
