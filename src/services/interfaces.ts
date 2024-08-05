interface IApiClient {
  get<T>(url: string, config?: any): Promise<{ data: T }>;
}
