import { Controller, Get } from '@nestjs/common';
import { AuthJwtAccessProtected } from 'src/common/auth/decorators/auth.jwt.decorator';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/modules/user/decorators/user.decorator';
import { IUserEntity } from 'src/modules/user/interfaces/user.interface';
import { UserProfileDoc } from 'src/modules/user/docs/user.doc';
import { UserProfileGuard } from 'src/modules/user/decorators/user.public.decorator';

@ApiTags('modules.workspaces')
@Controller({
    version: '1',
    path: '/workspaces',
})
export class WorkspacesController {
  @Get()
  @UserProfileGuard()
  @AuthJwtAccessProtected()
  findAll(@GetUser() user: IUserEntity): string {
    console.log('=========', user)
    return 'This action returns all workspaces';
  }
}