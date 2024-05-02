import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ValidationPipe } from 'src/utils/app/pipes/validation.pipe';
import { AuthorizationHeader, CustomRequest } from 'src/utils/app/types';
import { UserGuard } from '../auth/guard/user.guard';
import { EventCreateDTO } from './dto/create.dto';
import { EventUpdateDTO } from './dto/update.dto';
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
  create(@Request() { user }: CustomRequest, @Body() data: EventCreateDTO) {
    return this.service.create(user.user, data);
  }

  @ApiOperation({ summary: 'Get all events' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit the number of events',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Offset the events',
  })
  @ApiQuery({
    name: 'start',
    required: false,
    type: String,
    description: 'Start date range',
  })
  @ApiQuery({
    name: 'end',
    required: false,
    type: String,
    description: 'End date range',
  })
  @Get()
  get(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    return this.service.get(limit, offset, start, end);
  }

  @ApiOperation({ summary: 'Update an event by ID' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @ApiBody({ type: EventUpdateDTO })
  @Put('/:id')
  @UsePipes(ValidationPipe)
  @UseGuards(UserGuard)
  update(
    @Request() { user }: CustomRequest,
    @Body() data: EventUpdateDTO,
    @Param('id') id: string,
  ) {
    return this.service.update(user.user, id, data);
  }

  @ApiOperation({ summary: 'Delete an event by ID' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @Delete('/:id')
  @UseGuards(UserGuard)
  delete(@Request() { user }: CustomRequest, @Param('id') id: string) {
    return this.service.delete(user.user, id);
  }

  @ApiOperation({ summary: 'Get my events' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit the number of events',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Offset the events',
  })
  @ApiQuery({
    name: 'start',
    required: false,
    type: String,
    description: 'Start date range',
  })
  @ApiQuery({
    name: 'end',
    required: false,
    type: String,
    description: 'End date range',
  })
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @Get('/my')
  @UseGuards(UserGuard)
  getMy(
    @Request() { user }: CustomRequest,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('offset', new ParseIntPipe({ optional: true })) offset?: number,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    return this.service.get(limit, offset, start, end, user.user);
  }
}
