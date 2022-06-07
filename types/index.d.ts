export declare enum Indent {
  SPACE_4 = '4',
  SPACE_2 = '2',
  TAB = 'tab',
}

export type Options = {
  input: string | Record<string, any>;
  output: string;
  useUnionTypes?: boolean;
  exportInterfaces?: boolean;
  exportModels?: boolean;
  exportSchemas?: boolean;
  indent?: Indent | '4' | '2' | 'tab';
  postfix?: string;
  write?: boolean;
};

export declare function generate(options: Options): Promise<void>;

declare type OpenAPI = {
  Indent: Indent;
  generate: typeof generate;
};

export default OpenAPI;
