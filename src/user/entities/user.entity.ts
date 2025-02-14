/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tags } from './tags.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "varchar", length: 255 })
    name: string;
    @Column({ type: "text" })
    desc: string;
    @OneToMany(() => Tags, (tags) => tags.user)
    tags: Tags[];
}
