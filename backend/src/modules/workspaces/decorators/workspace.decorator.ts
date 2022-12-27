import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { WorkspaceEntity } from 'src/modules/workspaces/repository/entities/workspace.entity';


export const GetWorkspace = createParamDecorator(
  (data: string, ctx: ExecutionContext): WorkspaceEntity => {
      console.log(ctx)
      const { __workspace } = ctx.switchToHttp().getRequest();
      console.log('uuuuuuuuuuuu', __workspace)
      return __workspace;
  }
);
