import { PartialType } from '@nestjs/swagger';
import { CreateMangerDto } from './create-manger.dto';

export class UpdateMangerDto extends PartialType(CreateMangerDto) {}
