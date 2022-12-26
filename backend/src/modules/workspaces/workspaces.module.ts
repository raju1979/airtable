import { Module } from '@nestjs/common';
import { WorkRepositoryModule } from './repository/workspace.repository.module';
import { WorkspaceService } from './services/workspace.service';

@Module({
    imports: [WorkRepositoryModule],
    providers: [WorkspaceService],
    exports: [ WorkspaceService],
    controllers: [],
})
export class WorkspacesModule {
    
}
