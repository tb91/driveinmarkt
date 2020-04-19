export interface DatabaseOperations<T> {
  createUser({ name, email, phone }): Promise<boolean>;
  createStore({
    userPK,
    name,
    description,
    picture,
    street,
    street_number,
    zip,
    city,
    country,
  });
  createProduct({
    name,
    description,
    price,
    pictures,
    storePK,
  }): Promise<boolean>;
  update(object: T, key: string): T;
  delete(key: string): boolean;
}
