import axios, { AxiosRequestConfig } from "axios";

export abstract class BaseService {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  protected get<T>(
    endpoint?: string | null,
    config: AxiosRequestConfig = {},
    controller?: AbortController
  ): Promise<T> {
    return axios
      .get<T>(this.getUrl(endpoint), { ...config, signal: controller?.signal })
      .then(({ data }) => data);
  }

  protected post<T, R>(
    endpoint?: string | null,
    request?: R,
    config: AxiosRequestConfig = {},
    controller?: AbortController
  ): Promise<T> {
    return axios
      .post<T>(this.getUrl(endpoint), request, {
        ...config,
        signal: controller?.signal,
      })
      .then(({ data }) => data);
  }

  protected patch<T, R>(
    endpoint?: string | null,
    request?: R,
    config: AxiosRequestConfig = {},
    controller?: AbortController
  ): Promise<T> {
    return axios
      .patch<T>(this.getUrl(endpoint), request, {
        ...config,
        signal: controller?.signal,
      })
      .then(({ data }) => data);
  }

  protected delete<T>(
    endpoint?: string | null,
    config: AxiosRequestConfig = {},
    controller?: AbortController
  ): Promise<T> {
    return axios
      .delete<T>(this.getUrl(endpoint), {
        ...config,
        signal: controller?.signal,
      })
      .then(({ data }) => data);
  }

  private getUrl(endpoint?: string | null): string {
    return endpoint ? `${this.baseUrl}/${endpoint}` : this.baseUrl;
  }
}
