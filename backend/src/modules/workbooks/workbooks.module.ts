import { Module } from '@nestjs/common';
import { WorkbookRepositoriesModule } from './repository/workbook.repositories.module';
import { WorkbookService } from './services/workbook.service';


@Module({
    imports: [WorkbookRepositoriesModule],
    providers: [WorkbookService],
    exports: [WorkbookService],
    controllers: [],
})
export class WorkbooksModule {
    
}
