import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthJwtAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import { IUserEntity } from 'src/modules/user/interfaces/user.interface';
import { UserProfileDoc } from 'src/modules/user/docs/user.doc';
import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';
import { WorkspaceCreateDto } from '../dtos/workspace.create.dto';
import { reject } from 'lodash';
import { resolve } from 'path';
import { func } from 'joi';
import { WorkspaceService } from 'src/modules/workspaces/services/workspace.service';

@ApiTags('modules.workspaces')
@Controller({
    version: '1',
    path: '/workspaces',
})
export class WorkspacesController {
  constructor(
    private readonly workservice: WorkspaceService
  ){}
  @Get()
  @UserProfileGuard()
  @AuthJwtAccessProtected()
  findAll(@GetUser() user: IUserEntity): IUserEntity {
    return user;
  }

  @Post()
  @UserProfileGuard()
  @AuthJwtAccessProtected()
  async add(
    @Body()
        { title, properties }: WorkspaceCreateDto
  ): Promise<void> {
    console.log('body ', title, properties);
    const temp: any = await this.workservice.findAll();
    return temp;
  }

}

