import BaseException from "./BaseException";

export default class ExistData extends BaseException {
    constructor(message: string,code?:string) {
        super(message,code);
    }
}