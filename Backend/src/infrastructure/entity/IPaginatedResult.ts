export interface IPaginatedResult<T> {
  files: T[];
  total: number;
  totalPages: number;
}
