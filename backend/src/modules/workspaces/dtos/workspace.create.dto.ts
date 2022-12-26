import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    ValidateNested
} from 'class-validator';

class WorkspaceProperties {
    readonly icon:string
    readonly background:string
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
 
}


