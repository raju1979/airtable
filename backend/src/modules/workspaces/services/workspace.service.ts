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


@Injectable()
export class WorkspaceService implements IWorkspaceService {

    async findAll<T>(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<any> {
        return returnAllWorkspaces();
    }

}

function returnAllWorkspaces(): any {
    return new Promise((resolve, reject) => {
        resolve(['hello world']);
    })
}