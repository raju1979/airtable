import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoRepositoryAbstract } from 'src/common/database/abstracts/database.mongo-repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { IDatabaseRepository } from 'src/common/database/interfaces/database.repository.interface';
import { UserEntity } from 'src/modules/user/repository/entities/user.entity';
import { WorkbookEntity } from 'src/modules/workbooks/repository/entities/workbook.entity';
import { WorkspaceEntity } from '../entities/workspace.entity';

@Injectable()
export class WorkspaceRepository
    extends DatabaseMongoRepositoryAbstract<WorkspaceEntity>
    implements IDatabaseRepository<WorkspaceEntity>
{
    constructor(
        @DatabaseModel(WorkspaceEntity.name)
        private readonly workspaceModel: Model<WorkspaceEntity>
    ) {
        super(workspaceModel, [{            
                path: 'workbooks',
                match: '_id',
                model: WorkbookEntity.name
            }
        ]);
    }
}