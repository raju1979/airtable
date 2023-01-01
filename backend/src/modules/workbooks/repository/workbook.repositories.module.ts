import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from 'src/common/database/constants/database.constant';
import { WorkspaceEntity, WorkspaceSchema } from 'src/modules/workspaces/repository/entities/workspace.entity'
import { WorkbookEntity, WorkbookSchema } from './entities/workbook.entity';
import { WorkbookRepository } from './repositories/workbook.repository';

@Module({
    providers: [WorkbookRepository],
    exports: [WorkbookRepository],
    controllers: [],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: WorkbookEntity.name,
                    schema: WorkbookSchema,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class WorkbookRepositoriesModule {}
