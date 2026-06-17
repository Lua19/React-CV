class ApiClient {
  private readonly baseUrl: string;

  constructor() {
    // Uses Vite's environment variables. 
    // Define VITE_API_BASE_URL in your .env file for different environments.
    this.baseUrl = import.meta.env.VITE_API_BASE_URL;
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
   */
  async getAllSkills<T = any>(): Promise<T> {
    const response = await fetch(`${this.baseUrl}/Skills`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return this.handleResponse<T>(response);
  }

  async getAllExperiences<T = any>(): Promise<T> {
    const response = await fetch(`${this.baseUrl}/Experience`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return this.handleResponse<T>(response);
  }
  async loginAuth<T = any>(email: string, password: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/Auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    return this.handleResponse<T>(response);
  }


}

export const apiClient = new ApiClient();