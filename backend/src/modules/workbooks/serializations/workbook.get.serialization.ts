import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform, Type } from 'class-transformer';
import { ENUM_AUTH_ACCESS_FOR } from 'src/common/auth/constants/auth.enum.constant';
import { WorkbookEntity } from '../repository/entities/workbook.entity';
import { WorkspaceEntity } from '../../workspaces/repository/entities/workspace.entity';

export class WorkbookGetSerialization {
    @ApiProperty({
        description: 'Id that representative with your target data',
        example: faker.database.mongodbObjectId(),
        required: true,
    })
    @Type(() => String)
    readonly _id: string;

    @ApiProperty({
        description: 'Active flag of role',
        example: true,
        required: true,
    })
    readonly isActive: boolean;

    @ApiProperty({
        description: 'Properties for workbook',
        example: faker.name.jobTitle(),
        required: true,
    })
    readonly properties: {
        icon: string
    };

    @ApiProperty({
        description: 'Worksheets list',
        example: ['ADMIN'],
        required: true,
    })
    readonly worksheets: string[];

    @ApiProperty({
        description: 'Workspace',
        example: 'ddd-ddd-ddd-ddd',
        required: true,
    })
    @Transform(({ obj }) => ({
        _id :`abcd`
    }))
    readonly workspace: WorkspaceEntity;

    @ApiProperty({
        description: 'Date created at',
        example: faker.date.recent(),
        required: true,
    })
    readonly createdAt: Date;

    @Exclude()
    readonly updatedAt: Date;
}
