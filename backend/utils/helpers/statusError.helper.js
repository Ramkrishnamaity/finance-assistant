/**
  * Custom Error class to handle HTTP status codes with messages
*/
class StatusError extends Error {
    static badRequest(message = "Bad Request") {
        return new StatusError(400, message);
    }

    static unauthorized(message = "UnAuthorized Access") {
        return new StatusError(401, message);
    }

    static forbidden(message = "Forbidden") {
        return new StatusError(403, message);
    }

    static notFound(message = "Not Found") {
        return new StatusError(404, message);
    }

    static logout(message = "Token Expired") {
        return new StatusError(419, message);
    }

    static serverError(message = "Server Error") {
        return new StatusError(500, message);
    }

    static badGateway(message = "Bad GateWay") {
        return new StatusError(502, message);
    }

    static databaseError(message = "DB Error") {
        return new StatusError(503, message);
    }

    constructor(code, message) {
        super(message);
        this.statusCode = code;
    }
}

export default StatusError;