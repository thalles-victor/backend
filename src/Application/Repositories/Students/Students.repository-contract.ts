export type TTargetStudentParam = { id: string } | { email: string };

export interface StudentsRepositoryContract<Entity, Update> {
  create(entity: Entity): Promise<Entity>;
  getOnByEmail(email: string): Promise<Entity | null>;
  getOneById(id: string): Promise<Entity | null>;
  updateBy(
    target: TTargetStudentParam,
    updateEntity: Update,
  ): Promise<Entity | null>;
  deleteById(id: string): Promise<'success' | 'fail'>;
}
