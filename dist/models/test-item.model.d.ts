import "reflect-metadata";
import { BaseModel } from "./base-model";
import Test from "./test.model";
export default class TestItem extends BaseModel<TestItem> {
    test_id: number;
    test: Test;
    question: string;
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
    correct_answer: string;
}
