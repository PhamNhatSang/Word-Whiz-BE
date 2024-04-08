import "reflect-metadata";

import { BelongsTo, Column, DataType, ForeignKey, Table } from "sequelize-typescript";
import { BaseModel } from "./base-model";
import Test from "./test.model";
import { Data } from "node-lombok";
@Table({modelName:'test_items'})
@Data()
export default class TestItem extends BaseModel<TestItem> {
    @ForeignKey(() => Test)
    @Column
    test_id: number;

    @BelongsTo(() => Test)
    test: Test;

    @Column(DataType.TEXT)
    question: string;

    @Column(DataType.TEXT)
    option_1: string;

    @Column(DataType.TEXT)
    option_2: string;

    @Column(DataType.TEXT)
    option_3: string;


    @Column(DataType.TEXT)
    option_4: string;

    @Column(DataType.TEXT)
    correct_answer: string;

}