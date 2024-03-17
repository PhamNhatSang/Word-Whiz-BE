import { Table,PrimaryKey, Column,AutoIncrement,Model,DataType } from "sequelize-typescript";
@Table
export class Book extends Model<Book>{
   

    
    @Column(DataType.STRING)
    title: string|null;
}