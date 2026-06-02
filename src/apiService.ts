class ApiClient {
  private readonly baseUrl: string;

  constructor() {
    // Uses Vite's environment variables. 
    // Define VITE_API_BASE_URL in your .env file for different environments.
    this.baseUrl = 'https://localhost:7032/api';
  }

  /**
   * Helper to process the fetch response and handle errors consistently.
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Attempt to extract error message from body, otherwise fallback to status text
      const errorBody = await response.json().catch(() => null);
      const errorMessage = errorBody?.message || `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }
    return response.json() as Promise<T>;
  }

  /**
   * GET ALL SKILLS.
   * @param path The endpoint path (e.g., '/experiences')
   * @param headers Optional headers
   */
  async getAllSkills(): Promise<T> {
    const response = await fetch(`${this.baseUrl}/Skills`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return this.handleResponse<T>(response);
  }

  async getAllExperiences(): Promise<T> {
    const response = await fetch(`${this.baseUrl}/Experience`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return this.handleResponse<T>(response);
  }

}

export const apiClient = new ApiClient();