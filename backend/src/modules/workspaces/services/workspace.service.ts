import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HelperStringService } from 'src/common/helper/services/helper.string.service';

import {
    IDatabaseCreateOptions,
    IDatabaseSoftDeleteOptions,
    IDatabaseExistOptions,
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseOptions,
} from 'src/common/database/interfaces/database.interface';
import { IWorkspaceService } from '../interfaces/workspace.service.interface';
import { IWorkspaceCreate } from '../interfaces/workspace.interface';
import { WorkspaceEntity } from '../repository/entities/workspace.entity';
import { HelperDateService } from 'src/common/helper/services/helper.date.service';
import { WorkspaceRepository } from '../repository/repositories/workspace.repository';
import { WorkspaceUpdatePutDto } from '../dtos/workspace.update.dto';


@Injectable()
export class WorkspaceService implements IWorkspaceService {

    constructor(
        private readonly workspaceRepository: WorkspaceRepository,
        // private readonly helperStringService: HelperStringService,
        // private readonly helperDateService: HelperDateService,
        // private readonly configService: ConfigService
    ) {
    }

    // async findAll(
    //     find?: Record<string, any>,
    //     options?: IDatabaseFindAllOptions
    // ): Promise<WorkspaceEntity> {
    //     return this.workspaceRepository.findAll<WorkspaceEntity>();
    // }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<WorkspaceEntity[]> {
        return this.workspaceRepository.findAll<WorkspaceEntity>(
            find,
            options
        );
    }


    async create<T>(
        {
            title,
            properties,
            workbooks,
            isActive,
            user
        }: IWorkspaceCreate
    ): Promise<WorkspaceEntity> {
        const workspace: WorkspaceEntity = new WorkspaceEntity();
        workspace.title = title;
        workspace.properties = properties;
        workspace.workbooks = workbooks;
        workspace.isActive = isActive;
        workspace.createdBy = user;
        workspace.updatedBy = user;
        workspace.primaryUser = user;
        return this.workspaceRepository.create<WorkspaceEntity>(workspace);
    }
    

    async update(
        _id: string,
        data: WorkspaceUpdatePutDto,
        options?: IDatabaseOptions
    ): Promise<WorkspaceEntity> {
        return this.workspaceRepository.updateOneById<WorkspaceUpdatePutDto>(
            _id,
            data,
            options
        );
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<WorkspaceEntity> {
        return this.workspaceRepository.findOneById<WorkspaceEntity>(
            _id,
            options
        );
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseOptions
    ): Promise<number> {
        return this.workspaceRepository.getTotal(find, options);
    }

}

function returnAllWorkspaces(): any {
    return new Promise((resolve, reject) => {
        resolve(['hello world']);
    })
}