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
import { WorkbookService } from '../services/workbook.service';

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
        return returnAllWorkbooks({});
    }


    @Post('/create')
    @UserProfileGuard()
    @AuthJwtAccessProtected()
    async add(
        @GetUser() user: IUserEntity,
        @Body()
        { title, properties, worksheets, workspace, isActive }: WorkbookCreateDto
    ): Promise<void> {
        let newWorkbook: any;
        try {
            const workbookWorkspace = await this.workservice.findOneById(workspace);
            if (workbookWorkspace) {
                const createPayload: any = {
                    title,
                    properties,
                    worksheets,
                    workspace,
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

}

function returnAllWorkbooks(createPayload: any): any {
    return new Promise((resolve, reject) => {
        resolve(createPayload);
    });
}