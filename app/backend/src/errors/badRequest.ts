class BadRequest extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'badRequest';
  }
}

export default BadRequest;
