import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Put,
    Param,
    InternalServerErrorException,
    BadRequestException,
    Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthJwtAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';
import { IUserEntity } from 'src/modules/user/interfaces/user.interface';
import { WorkspaceService } from 'src/modules/workspaces/services/workspace.service';
import { WorkbookCreateDto } from '../dtos/workbook.create.dto';
import { WorkbookEntity } from '../repository/entities/workbook.entity';
import { WorkbookService } from '../services/workbook.service';
import { WorkbookGetSerialization } from '../serializations/workbook.get.serialization';
import { IResponse } from 'src/common/response/interfaces/response.interface';
import { GetWorkbook } from '../decorators/workbook.decorator';
import { WorkbookUpdatePatchDto } from '../dtos/workbook.update.dto';

@ApiTags('modules.workbooks')
@Controller({
    version: '1',
    path: '/workbooks',
})
export class WorkbooksController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly workbookService: WorkbookService,
        private readonly workservice: WorkspaceService
    ) { }

    @Get('/list')
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
        const skip: number = await this.paginationService.skip(page, perPage) || 0;
        const find: Record<string, any> = {
            ...search,
        };

        const workbooks: WorkbookEntity[] = await this.workbookService.findAll(find, {
            paging: {
                limit: perPage,
                skip: skip,
            },
            sort,
            join: true
        });

        const totalData: number = await this.workbookService.getTotal({});
        const totalPage: number = await this.paginationService.totalPage(
            totalData,
            perPage
        );
        return {
            totalData,
            totalPage,
            currentPage: page,
            perPage,
            availableSearch,
            availableSort,
            data: workbooks,
        };
    }


    @Post('/create')
    @UserProfileGuard()
    @AuthJwtAccessProtected()
    async add(
        @GetUser() user: IUserEntity,
        @Body()
        { title, properties, worksheets, workspaces, isActive }: WorkbookCreateDto
    ): Promise<void> {
        let newWorkbook: any;
        try {
            const workbookWorkspace = await this.workservice.findOneById(workspaces);
            if (workbookWorkspace) {
                const createPayload: any = {
                    title,
                    properties,
                    worksheets,
                    workspaces,
                    isActive,
                    user: user.username,
                };
                newWorkbook = await this.workbookService.create(createPayload);
            } else {
                throw new Error('Workspace does not Exists')
            }
        } catch(err: any) {
            if (err.message === 'Workspace does not Exists') {
                throw new BadRequestException('Something bad happened', { cause: new Error(), description: err.message })
            } else {
                throw new InternalServerErrorException({
                    statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                    message: 'http.serverError.internalServerError',
                    error: err.message,
                });
            }            
        }
        return newWorkbook; 
    }

    @UserProfileGuard()
    @AuthJwtAccessProtected()
    @Get('/get/:workbook') 
    async get(@GetWorkbook() workbookData: any, @Param('workbook') id): Promise<IResponse> {
        console.log('---------- id', id)
        let workbook;
        try {
            workbook = await this.workbookService.findOneById(id, {join: true});
            console.log(workbook)
            return workbook
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
    }

    @Patch('/updatesome/:workbook')
    @UserProfileGuard()
    @AuthJwtAccessProtected()
    async updateSome(
        @Param('workbook') id,
        @Body() body: WorkbookUpdatePatchDto
    ): Promise<any> {
        let workbook;
        try {
            workbook = await this.workbookService.findOneById(id);
            console.log('id ', id, workbook)
            console.log('body  ', body)
            await this.workbookService.patch(workbook._id, body);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
        return workbook;
    }

}

function returnAllWorkbooks(createPayload: any): any {
    return new Promise((resolve, reject) => {
        resolve(createPayload);
    });
}