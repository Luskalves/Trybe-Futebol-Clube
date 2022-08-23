class NotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'notFound';
  }
}

export default NotFound;
