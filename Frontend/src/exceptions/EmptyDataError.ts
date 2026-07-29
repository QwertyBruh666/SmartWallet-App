export class EmptyDataError extends Error {
    code: 204 | 404
    constructor({ message }: { code: string, message: string }) {
        super();
        this.message = message;
    }
}