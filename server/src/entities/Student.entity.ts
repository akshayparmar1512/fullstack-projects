import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student{

    @PrimaryGeneratedColumn("uuid")
    student_id!:string

    @Column({type:"varchar"})
    name!:string

    @Column({type:"varchar",unique:true})
    email!:string

    @Column({type:"varchar"})
    course!:string

    @Column({type:"varchar"})
    gender!:string

    @Column("simple-array")
    hobbies!:string[]

    @CreateDateColumn()
    created_at!:Date

}