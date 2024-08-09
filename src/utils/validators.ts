import { BadRequestException } from '@nestjs/common';

export function validateNumber(value: any) {
  const parsed = parseInt(value, 10);

  if (isNaN(parsed)) {
    throw new BadRequestException('value must be a number');
  }

  return parsed;
}
