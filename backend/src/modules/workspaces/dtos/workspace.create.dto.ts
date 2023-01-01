import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    ValidateNested,
    MinLength,
    Matches,
    IsMongoId,
    ArrayMinSize,
    IsBoolean,
    IsOptional
} from 'class-validator';
import { ObjectId } from 'mongoose';

class WorkspaceProperties {

    @MinLength(4)
    readonly icon:string

    @MinLength(7)
    @MaxLength(7)
    @Matches('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')
    readonly background:string
}

class OtherWorkspaceUsersProperties {

    @MinLength(3)
    readonly user: string

    @IsBoolean()
    readonly canRead: boolean

    @IsBoolean()
    readonly canEdit: boolean
}


export class WorkspaceCreateDto {
    @ApiProperty({
        example: faker.internet.userName(),
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @Type(() => String)
    readonly title: string;

    @IsNotEmpty()
    @Type(() => WorkspaceProperties)
    @ValidateNested()
    readonly properties: WorkspaceProperties;

    @IsOptional()
    @IsMongoId({each: true})
    @ArrayMinSize(0)
    readonly workbooks: string[]; 

    @IsBoolean()
    readonly isActive: boolean;

    @IsOptional()
    readonly primaryUser: string

    @IsOptional()
    readonly otherUsers: OtherWorkspaceUsersProperties[]
}


