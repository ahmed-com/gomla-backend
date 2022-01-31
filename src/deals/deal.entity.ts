import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Deal{
    @PrimaryGeneratedColumn()
    id: number;
}
