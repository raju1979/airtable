import { Injectable } from '@nestjs/common';

import {
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
    IDatabaseOptions,
} from 'src/common/database/interfaces/database.interface';
import { IWorkbookService } from '../interfaces/workbook.service.interface';
import { IWorkbookEntity } from '../interfaces/workbook.interface';
import { WorkbookEntity } from '../repository/entities/workbook.entity';
import { WorkbookRepository } from '../repository/repositories/workbook.repository';
import { WorkbookCreateDto } from '../dtos/workbook.create.dto';
import { WorkbookUpdatePatchDto } from '../dtos/workbook.update.dto';



@Injectable()
export class WorkbookService implements IWorkbookService {

    constructor(
        private readonly workbookRepository: WorkbookRepository,
        // private readonly helperStringService: HelperStringService,
        // private readonly helperDateService: HelperDateService,
        // private readonly configService: ConfigService
    ) {
    }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<WorkbookEntity[]> {
        return this.workbookRepository.findAll<WorkbookEntity>(
            find,
            options
        );
    }


    async create(
        {
            title,
            properties,
            worksheets,
            workspaces,
            isActive,
            user
        }: WorkbookCreateDto
    ): Promise<WorkbookEntity> {
        const workbook: WorkbookEntity = new WorkbookEntity();
        workbook.title = title;
        workbook.properties = properties;
        workbook.worksheets = worksheets;
        workbook.workspaces = workspaces;
        workbook.isActive = isActive;
        workbook.createdBy = user;
        workbook.updatedBy = user;
        return this.workbookRepository.create<WorkbookEntity>(workbook);
    }
    

    // async update(
    //     _id: string,
    //     data: WorkspaceUpdatePutDto,
    //     options?: IDatabaseOptions
    // ): Promise<WorkspaceEntity> {
    //     return this.workspaceRepository.updateOneById<WorkspaceUpdatePutDto>(
    //         _id,
    //         data,
    //         options
    //     );
    // }

    async patch(
        _id: string,
        data: WorkbookUpdatePatchDto,
        options?: IDatabaseOptions
    ): Promise<WorkbookEntity> {
        return this.workbookRepository.updateOneById<WorkbookUpdatePatchDto>(
            _id,
            data,
            options
        );
    }

    async findOneById(
        _id: string,
        options?: IDatabaseFindOneOptions
    ): Promise<WorkbookEntity> {
        return this.workbookRepository.findOneById<IWorkbookEntity>(
            _id,
            options
        );
    }

    async getTotal(
        find?: Record<string, any>,
        options?: IDatabaseOptions
    ): Promise<number> {
        return this.workbookRepository.getTotal(find, options);
    }

}

function returnAllWorkspaces(): any {
    return new Promise((resolve, reject) => {
        resolve(['hello world']);
    })
}