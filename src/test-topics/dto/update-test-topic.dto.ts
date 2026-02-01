import { PartialType } from '@nestjs/swagger';
import { CreateTestTopicDto } from './create-test-topic.dto';

export class UpdateTestTopicDto extends PartialType(CreateTestTopicDto) {}
