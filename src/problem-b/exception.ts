type Options = {
  message: string;
  code: string;
};

export class Exception extends Error {
  public code: string;

  constructor({ message, code }: Options) {
    super(message);
    this.code = code;
  }
}
