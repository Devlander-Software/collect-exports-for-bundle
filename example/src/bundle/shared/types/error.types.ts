export class InitializationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InitializationError';
  }
}

export class LogError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LogError';
  }
}

export class MessageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MessageError';
  }
}
