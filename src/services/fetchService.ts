export interface LoginData {
  url: string;
  email: string;
  password: string;
}

export class FetchService {
  private headers: [string, string][];
  private fetchUrl: URL;

  constructor(login: LoginData) {
    const token = window.btoa(`${login.email}:${login.password}`);

    this.headers = [
      ["Authorization", `Basic ${token}`],
      ["Content-Type", "application/xml"],
    ];

    const hostUrl = new URL(login.url);
    this.fetchUrl = new URL("rest/v1/data", hostUrl);
  }

  private createFetchOptions(fetchXml: string) {
    return {
      headers: this.headers,
      method: "POST",
      body: fetchXml,
    };
  }

  public async executeFetch(fetchXml: string) {
    return fetch(this.fetchUrl, this.createFetchOptions(fetchXml));
  }
}
