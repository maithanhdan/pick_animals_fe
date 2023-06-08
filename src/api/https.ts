import { LocalStore } from '@/helpers/local';
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

class API {
  private httpClient: AxiosInstance;
  private token: string | number | null;

  constructor() {
    this.token = LocalStore.get('access_token');
    this.httpClient = axios.create({
      baseURL:
        import.meta.env.VITE_APP_API || 'https://jsonplaceholder.typicode.com',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.httpClient.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.httpClient.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async get(url: string): Promise<any> {
    try {
      const response: AxiosResponse = await this.httpClient.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error(`GET request failed: ${error.message}`);
    }
  }

  async post(url: string, data: any): Promise<any> {
    try {
      const response: AxiosResponse = await this.httpClient.post(url, data);
      return response.data;
    } catch (error: any) {
      throw new Error(`POST request failed: ${error.message}`);
    }
  }

  async put(url: string, data: any): Promise<any> {
    try {
      const response: AxiosResponse = await this.httpClient.put(url, data);
      return response.data;
    } catch (error: any) {
      throw new Error(`PUT request failed: ${error.message}`);
    }
  }

  async delete(url: string): Promise<any> {
    try {
      const response: AxiosResponse = await this.httpClient.delete(url);
      return response.data;
    } catch (error: any) {
      throw new Error(`DELETE request failed: ${error.message}`);
    }
  }
}

export default API;
