import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/requests/create-deal.dto';
import { Deal } from './deal.entity';
import { SearchDealsDto } from './dto/requests/search-deals.dto';
import { Point } from 'geojson';
import { FetchUser } from 'src/decorators/fetch-user.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { stat, unlink } from 'fs';
import { Response } from 'express';
import { extname } from 'path';
import { verifyExtension } from 'src/utils/verifyExtension';
import { removeFiles } from 'src/utils/removeFiles';
import { allowedMimetypes } from 'src/config/imageExtensions';
import { Serialize } from 'src/decorators/serialize.decorator';
import { CreateDealResponseDto } from './dto/reponses/create-deal-response.dto';
import { GetUserId } from 'src/decorators/get-userId.decorator';
import SearchDealsResponseDto from './dto/reponses/search-deals-response.dto';
import GetDealResponseDto from './dto/reponses/get-deal-response.dto';

const imagesDir = `${process.cwd()}/images`;
@Controller('deals')
export class DealsController {
  constructor(
    private dealsService: DealsService,
    private configService: ConfigService,
  ) {}

  @Get()
  @Serialize(SearchDealsResponseDto)
  getDeals(@Query() searchDealsDto: SearchDealsDto): Promise<Deal[]> {
    const { term, lat, lng } = searchDealsDto;
    let location: Point;
    if (lat && lng) location = { type: 'Point', coordinates: [lng, lat] };

    return this.dealsService.searchDeals(term, location);
  }

  @Get('images/:imgId')
  serveImg(@Param('imgId') imgId: string, @Res() res: Response) {
    stat(`${imagesDir}/${imgId}`, (err) => {
      if (err) return res.status(404).end();
      res.sendFile(`${imagesDir}/${imgId}`);
    });
  }

  @Get('/:id')
  @Serialize(GetDealResponseDto)
  getDeal(@Param('id') id: string): Promise<Deal> {
    return this.dealsService.getDeal(parseInt(id));
  }

  @Post()
  @UseGuards(AuthGuard)
  @FetchUser()
  @UseInterceptors(
    FilesInterceptor('imgs', 4, {
      storage: diskStorage({
        destination: (_req, _file, cb) => cb(null, imagesDir),
        filename: (_req, file, cb) =>
          cb(null, `${uuid()}${extname(file.originalname)}`),
      }),

      fileFilter: (_req, file, cb) => {
        if (allowedMimetypes.includes(file.mimetype)) {
          return cb(null, true);
        }
        return cb(null, false);
      },
    }),
  )
  @Serialize(CreateDealResponseDto)
  async createDeal(
    @Body() createDealDto: CreateDealDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @GetUser() user: User,
  ): Promise<Deal> {
    const verifiedFiles = files.map(async (file) => {
      const extVerified = await verifyExtension(file.path);
      if (extVerified)
        return `${this.configService.get('SERVER_HOST')}/deals/images/${
          file.filename
        }`;
      removeFiles(files);
      throw new BadRequestException('files don\'t match the extension');
    });

    const imgs = await Promise.all(verifiedFiles);
    const location: Point = {
      type: "Point",
      coordinates: [createDealDto.lng, createDealDto.lat]
    }

    const dto = { ...createDealDto, imgs, location };

    return this.dealsService.createDeal(dto, user);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  @Serialize(GetDealResponseDto)
  updateDeal(@Param('id') id: string, @GetUserId() userId: string, @Body() editableDealFieldsDto) {
    return this.dealsService.updateDeal(parseInt(id),parseInt(userId),editableDealFieldsDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  deleteDeal(@Param('id') id: string, @GetUserId() userId: string): Promise<void> {
    return this.dealsService.deleteDeal(parseInt(id), parseInt(userId));
  }
}
