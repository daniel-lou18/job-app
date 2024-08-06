// The IApiClient interface defines the contract for the expected apiClient.

interface IApiClient {
  get<T>(url: string, config?: any): Promise<{ data: T }>;
}
