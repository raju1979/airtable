import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AuthModule } from 'src/common/auth/auth.module';
import { AwsModule } from 'src/common/aws/aws.module';
import { SettingController } from 'src/common/setting/controllers/setting.controller';
import { HealthController } from 'src/health/controllers/health.controller';
import { HealthModule } from 'src/health/health.module';
import { UserController } from 'src/modules/user/controllers/user.controller';
import { UserModule } from 'src/modules/user/user.module';
import { WorkbooksController } from 'src/modules/workbooks/controllers/workbooks.controller';
import { WorkbooksModule } from 'src/modules/workbooks/workbooks.module';
import { WorkspacesController } from 'src/modules/workspaces/controllers/workspaces.controller';
import { WorkspacesModule } from 'src/modules/workspaces/workspaces.module';

@Module({
    controllers: [HealthController, SettingController, UserController, WorkspacesController, WorkbooksController],
    providers: [],
    exports: [],
    imports: [
        AwsModule,
        HealthModule,
        TerminusModule,
        HttpModule,
        UserModule,
        AuthModule,
        WorkspacesModule,
        WorkbooksModule
    ],
})
export class RoutesModule {}
