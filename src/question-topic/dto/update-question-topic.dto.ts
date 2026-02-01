import { PartialType } from '@nestjs/swagger';
import { CreateQuestionTopicDto } from './create-question-topic.dto';

export class UpdateQuestionTopicDto extends PartialType(CreateQuestionTopicDto) {}
