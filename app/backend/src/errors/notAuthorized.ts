class NotAuthorized extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'notAuthorized';
  }
}

export default NotAuthorized;
