/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Tags {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tags: string;

    // 定义多对一关系：多个标签对应一个用户
    // @ManyToOne 第一个参数指向关联的实体(User)
    // 第二个参数是反向引用，表示在User实体中如何访问tags
    @ManyToOne(() => User, (user) => user.tags)
    // @JoinColumn 会自动在数据库中创建一个名为userId的外键列
    // 这个装饰器标记Tags实体为关系的拥有者
    // 实际的SQL会创建：FOREIGN KEY (userId) REFERENCES user(id)
    @JoinColumn()
    user: User;
}
