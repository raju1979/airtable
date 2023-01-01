import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseMongoRepositoryAbstract } from 'src/common/database/abstracts/database.mongo-repository.abstract';
import { DatabaseModel } from 'src/common/database/decorators/database.decorator';
import { IDatabaseRepository } from 'src/common/database/interfaces/database.repository.interface';
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
        super(workbookModel);
    }
}