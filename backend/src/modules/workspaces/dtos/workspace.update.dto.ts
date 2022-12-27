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
} from 'class-validator';
import { ObjectId } from 'mongoose';

import { IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer'

class WorkspaceProperties {

    @MinLength(4)
    readonly icon:string

    @MinLength(7)
    @MaxLength(7)
    @Matches('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')
    readonly background:string
}


export class WorkspaceUpdatePutDto {
    
    @IsOptional()
    @Exclude()
    _id: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @Type(() => String)
    readonly title: string;

    @IsNotEmpty()
    @Type(() => WorkspaceProperties)
    @ValidateNested()
    readonly properties: WorkspaceProperties;

    @IsMongoId({each: true})
    @ArrayMinSize(0)
    readonly workbooks: ObjectId[]; 

    @IsBoolean()
    readonly isActive: boolean;
}


