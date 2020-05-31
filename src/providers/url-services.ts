export class URLServices {
  api: string;
  envMode: string = "dev";

  private local() {
    this.api = "http://localhost:5000/api";
  }

  private prod() {
    this.api = "http://localhost:5000/api";
  }

  constructor() {
    switch (this.envMode) {
      case "dev":
        this.local();
        break;
      default:
        this.prod();
        break;
    }
  }
}
