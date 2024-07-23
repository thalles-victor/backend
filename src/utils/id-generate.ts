import { v4 as uuid_v4 } from 'uuid';

function generateShortId(size = 6) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';
  for (let i = 0; i < size; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export function defaultUUID_V4() {
  return uuid_v4();
}

export function generateStudentId() {
  return uuid_v4();
}

export function generateVideoId(filename: string, size_id: number = 6) {
  return `${generateShortId(size_id)}-${filename.replace(' ', '')}`;
}
