import { Module } from '@nestjs/common';
import { WorkspaceService } from './services/workspace.service';

@Module({
    providers: [WorkspaceService],
    exports: [ WorkspaceService],
    controllers: [],
})
export class WorkspacesModule {
    
}
