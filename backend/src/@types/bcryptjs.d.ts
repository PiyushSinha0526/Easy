declare module "bcryptjs" {
  export function hash(password: string, saltOrRounds: number | string): Promise<string>;
  export function compare(data: string, encrypted: string): Promise<boolean>;
}
