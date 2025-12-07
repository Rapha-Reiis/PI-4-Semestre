export interface IService<Input, Output> {
  execute(Input: Input | null): Promise<Output | null>;
}
