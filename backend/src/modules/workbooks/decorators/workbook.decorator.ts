import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { WorkspaceEntity } from 'src/modules/workspaces/repository/entities/workspace.entity';
import { WorkbookEntity } from '../repository/entities/workbook.entity';


export const GetWorkbook = createParamDecorator(
  (data: string, ctx: ExecutionContext): WorkbookEntity => {
      const { __workbook } = ctx.switchToHttp().getRequest();
      return __workbook;
  }
);
