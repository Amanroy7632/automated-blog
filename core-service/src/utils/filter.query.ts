type PaginationType = {
  currentPage: number;
  pageLimit: number;
  skip: number;
};
export class FilterQuery {
  getPaginatedValue(page: string, limit: string): PaginationType {
    const currentPage = parseInt(page, 10) || 1;
    const pageLimit = parseInt(limit, 10) || 10;
    const skip = (currentPage - 1) * pageLimit;
    return { currentPage, pageLimit, skip };
  }
  removeSpecialCharacters(search: string): string {
    return search;
  }
}
export const filterQuery = new FilterQuery();
