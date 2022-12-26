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


@Injectable()
export class WorkspaceService implements IWorkspaceService {

    constructor(
        private readonly workspaceRepository: WorkspaceRepository,
        // private readonly helperStringService: HelperStringService,
        // private readonly helperDateService: HelperDateService,
        // private readonly configService: ConfigService
    ) {
    }

    async findAll<T>(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<any> {
        return returnAllWorkspaces();
    }


    async create<T>(
        {
            title,
            properties,
            workbooks
        }: IWorkspaceCreate
    ): Promise<WorkspaceEntity> {
        const workspace: WorkspaceEntity = new WorkspaceEntity();
        workspace.title = title;
        workspace.properties = properties;
        workspace.workbooks = workbooks;
        return this.workspaceRepository.create<WorkspaceEntity>(workspace);
    }

}

function returnAllWorkspaces(): any {
    return new Promise((resolve, reject) => {
        resolve(['hello world']);
    })
}