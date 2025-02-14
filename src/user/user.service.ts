import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Tags } from './entities/tags.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    @InjectRepository(Tags)
    private readonly tags: Repository<Tags>,
  ) {}

  async addTags(params: { tags: string[]; userId: number }) {
    //通过前端传入的userId 查到当前id 的用户信息，然后拿到前端传入的tags [tag1,tag2,tag3]
    // 进行遍历 给tag实例进行赋值 然后调用保存方法添加tag 添加完之后 通过 tagList 保存该tag类
    // 最后把tagList 赋给 user类的tags属性 然后重新调用save 进行更新
    const user = await this.user.findOne({ where: { id: params.userId } });
    if (!user) {
      throw new Error('User not found');
    }
    const tagList: Tags[] = [];
    for (let i = 0; i < params.tags.length; i++) {
      const T = new Tags();
      T.tags = params.tags[i];
      await this.tags.save(T);
      tagList.push(T);
    }
    user.tags = tagList;
    return this.user.save(user);
  }

  create(createUserDto: CreateUserDto) {
    const data = new User();
    data.name = createUserDto.name;
    data.desc = createUserDto.desc;
    return this.user.save(data);
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const data = await this.user.find({
      // 查询关联的tags
      relations: ['tags'],
      where: {
        name: Like(`%${query.keyWord}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.user.count({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
    });
    return { data, total };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
