export interface StudentsRepositoryContract<Entity, Update> {
  create(entity: Entity): Promise<Entity>;
  getOnByEmail(email: string): Promise<Entity | null>;
  getOneById(id: string): Promise<Entity | null>;
  updateById(id: string, updateEntity: Update): Promise<Entity | null>;
  deleteById(id: string): Promise<'success' | 'fail'>;
}
