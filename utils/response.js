class Response {
  constructor(success, message, data) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success(message, data) {
    return new Response(true, message, data);
  }

  static error(message, data) {
    return new Response(false, message, data);
  }
}

module.exports = Response;
