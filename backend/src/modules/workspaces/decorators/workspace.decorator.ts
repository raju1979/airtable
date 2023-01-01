import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { WorkspaceEntity } from 'src/modules/workspaces/repository/entities/workspace.entity';
import { IWorkspaceEntity } from '../interfaces/workspace.interface';


export const GetWorkspace = createParamDecorator(
  (data: string, ctx: ExecutionContext): IWorkspaceEntity => {
      const { __workspace } = ctx.switchToHttp().getRequest();
      return __workspace;
  }
);
