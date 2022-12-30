import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Put,
    Param,
    InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthJwtAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';
import { IUserEntity } from 'src/modules/user/interfaces/user.interface';
import { WorkbookCreateDto } from '../dtos/workbook.create.dto';

@ApiTags('modules.workbooks')
@Controller({
    version: '1',
    path: '/workbooks',
})
export class WorkbooksController {
    constructor(
        private readonly paginationService: PaginationService,
    ) {}

    @Get('/')
    @AuthJwtAccessProtected()
    async list(
        @Query()
        {
            page,
            perPage,
            sort,
            search,
            availableSort,
            availableSearch,
            isActive,
        }: any
    ): Promise<any> {
        return returnAllWorkbooks();
    }


    @Post('/create')
    @UserProfileGuard()
    @AuthJwtAccessProtected()
    async add(
        @GetUser() user: IUserEntity,
        @Body()
        { title, properties, worksheets, workspace, isActive }: WorkbookCreateDto
    ): Promise<void> {
        // const createPayload = {
        //     title,
        //     properties,
        //     worksheets,
        //     workspace,
        //     isActive,
        //     user: user.username,
        // };
        // const temp: any = await this.workservice.create(createPayload);
        return returnAllWorkbooks();
    }

}

function returnAllWorkbooks(): any {
    return new Promise((resolve, reject) => {
        resolve(['hello world']);
    });
}