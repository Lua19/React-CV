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
    const response = await fetch(`${this.baseUrl}/api/Skills`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return this.handleResponse<T>(response);
  }

  private getHeaders(auth = false): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (auth) {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return headers;
  }

  async getAllExperiences<T = any>(): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api/Experience`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async createExperience<T = any>(experience: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api/Experience`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify(experience),
    });

    return this.handleResponse<T>(response);
  }

  async updateExperience<T = any>(id: number | string, experience: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api/Experience/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: JSON.stringify(experience),
    });

    return this.handleResponse<T>(response);
  }

  async deleteExperience<T = any>(id: number | string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api/Experience/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(true),
    });

    return this.handleResponse<T>(response);
  }

  async loginAuth<T = any>(email: string, password: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api/Auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    return this.handleResponse<T>(response);
  }

  async verifyToken<T = any>(token: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}/api/Auth/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Token: token }),
    });

    return this.handleResponse<T>(response);
  }
}

export const apiClient = new ApiClient();