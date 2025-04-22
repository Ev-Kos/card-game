declare module 'express' {
    interface Request {
        nonce?: string;
    }
}
export {};
