import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoRepositoryAbstract } from 'src/common/database/abstracts/database.mongo-repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { IDatabaseRepository } from 'src/common/database/interfaces/database.repository.interface';
import { PermissionEntity } from 'src/modules/permission/repository/entities/permission.entity';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { WorkspaceEntity } from 'src/modules/workspaces/repository/entities/workspace.entity';
import { WorkbookEntity } from '../entities/workbook.entity';

@Injectable()
export class WorkbookRepository
    extends DatabaseMongoRepositoryAbstract<WorkbookEntity>
    implements IDatabaseRepository<WorkbookEntity>
{
    constructor(
        @DatabaseModel(WorkbookEntity.name)
        private readonly workbookModel: Model<WorkbookEntity>
    ) {
        super(workbookModel,[{
            path: 'workspaces',
            match: '_id',
            model: WorkspaceEntity.name,
        }]);
    }
}