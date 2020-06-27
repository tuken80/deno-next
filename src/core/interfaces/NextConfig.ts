export interface NextConfig {
  config: Config;
  container: string; // <app></app>: app
}

export interface Config {
  port: number;
  path: string;
  main?: string; // Refference for main file, default is Index
}
