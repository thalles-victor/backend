import { v4 as uuid_v4 } from 'uuid';

export function generateStudentId() {
  return uuid_v4();
}
