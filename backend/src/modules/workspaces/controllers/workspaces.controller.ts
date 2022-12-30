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
import {
    AuthJwtAccessProtected,
    AuthJwtAdminAccessProtected,
} from 'src/common/auth/decorators/auth.jwt.decorator';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import { IUserEntity } from 'src/modules/user/interfaces/user.interface';
import { UserProfileDoc } from 'src/modules/user/docs/user.doc';
import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';
import { WorkspaceCreateDto } from '../dtos/workspace.create.dto';
import { WorkspaceUpdatePutDto } from '../dtos/workspace.update.dto';
import { reject } from 'lodash';
import { resolve } from 'path';
import { func } from 'joi';
import { WorkspaceService } from 'src/modules/workspaces/services/workspace.service';
import {
    IResponse,
    IResponsePaging,
} from 'src/common/response/interfaces/response.interface';
import { WorkspaceEntity } from '../repository/entities/workspace.entity';
import { PaginationService } from 'src/common/pagination/services/pagination.service';
import { GetWorkspace } from '../decorators/workspace.decorator';
import { ENUM_AUTH_PERMISSIONS } from 'src/common/auth/constants/auth.enum.permission.constant';
import { ENUM_ERROR_STATUS_CODE_ERROR } from 'src/common/error/constants/error.status-code.constant';

@ApiTags('modules.workspaces')
@Controller({
    version: '1',
    path: '/workspaces',
})
export class WorkspacesController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly workservice: WorkspaceService
    ) {}
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
    ): Promise<IResponsePaging> {
        const skip: number = await this.paginationService.skip(page, perPage);
        const find: Record<string, any> = {
            ...isActive,
            ...search,
        };
        const workspaces: WorkspaceEntity[] = await this.workservice.findAll(
            find,
            {
                paging: {
                    limit: perPage,
                    skip: skip,
                },
                sort,
            }
        );

        const totalData: number = await this.workservice.getTotal(find);
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
            data: workspaces,
        };
    }

    @Post()
    @UserProfileGuard()
    @AuthJwtAccessProtected()
    async add(
        @Body()
        { title, properties, workbooks, isActive }: WorkspaceCreateDto
    ): Promise<void> {
        const createPayload = {
            title,
            properties,
            workbooks,
            isActive,
        };
        console.log('body ', title, properties, workbooks, isActive);
        const temp: any = await this.workservice.create(createPayload);
        return temp;
    }

    @Put('/update/:workspace')
    @UserProfileGuard()
    @AuthJwtAccessProtected()
    async update(
        @Param('workspace') id,
        @Body() body: WorkspaceUpdatePutDto
    ): Promise<any> {
        console.log(body);
        let workspace;
        try {
            workspace = await this.workservice.findOneById(id);
            await this.workservice.update(workspace._id, body);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        return workspace;
    }

    @Get('/get/:workspace')
    @UserProfileGuard()
    @AuthJwtAccessProtected()
    async get(@Param('workspace') id): Promise<IResponse> {
        let workspace;
        try {
            workspace = await this.workservice.findOneById(id);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        return workspace;
    }
}

function returnAllWorkspaces(): any {
    return new Promise((resolve, reject) => {
        resolve(['hello world']);
    });
}
