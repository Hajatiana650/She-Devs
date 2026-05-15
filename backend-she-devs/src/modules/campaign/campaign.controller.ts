import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Controller('campaign')
export class CampaignController {
  constructor(private service: CampaignService) {}

  @Get()                                   // GET /campaign
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')                              // GET /campaign/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()                                  // POST /campaign
  create(@Body() dto: CreateCampaignDto) {
    return this.service.create(dto);
  }

  @Patch(':id')                            // PATCH /campaign/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateCampaignDto>,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')                           // DELETE /campaign/:id
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}