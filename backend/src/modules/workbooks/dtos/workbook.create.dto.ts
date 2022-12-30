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
    IsOptional,
    IsUUID
} from 'class-validator';
import { ObjectId } from 'mongoose';

class WorkbookProperties {

    @MinLength(4)
    readonly icon:string

}

class OtherWorkspaceUsersProperties {

    @MinLength(3)
    readonly user: string

    @IsBoolean()
    readonly canRead: boolean

    @IsBoolean()
    readonly canEdit: boolean
}


export class WorkbookCreateDto {
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
    @Type(() => WorkbookProperties)
    @ValidateNested()
    readonly properties: WorkbookProperties;

    @IsOptional()
    @IsUUID('4', { each: true })
    @ArrayMinSize(0)
    readonly worksheets: string[]; 

    @IsNotEmpty()
    @IsUUID('4', { each: true })
    readonly workspace: string;

    @IsBoolean()
    readonly isActive: boolean;
}


