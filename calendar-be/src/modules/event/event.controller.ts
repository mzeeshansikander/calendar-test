import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ValidationPipe } from 'src/utils/app/pipes/validation.pipe';
import { AuthorizationHeader } from 'src/utils/app/types';
import { UserGuard } from '../auth/guard/user.guard';
import { EventCreateDTO } from './dto/create.dto';
import { EventService } from './event.service';

@ApiTags('Events')
@Controller('/event')
export class EventController {
  constructor(private service: EventService) {}

  @ApiOperation({ summary: 'Create an event' })
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiBody({ type: EventCreateDTO })
  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(UserGuard)
  create(@Body() data: EventCreateDTO) {
    return this.service.create(data);
  }
}
