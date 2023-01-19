import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
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
    IsUUID,
    IsArray
} from 'class-validator';
import { ObjectId } from 'mongoose';

class WorkbookProperties {

    @IsOptional()
    @MinLength(4)
    readonly icon:string

}

export class WorkbookUpdatePatchDto {

    @IsOptional()
    @Exclude()
    _id: string
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @Type(() => String)
    readonly title: string;

    @IsOptional()
    @IsNotEmpty()
    @Type(() => WorkbookProperties)
    @ValidateNested()
    readonly properties: WorkbookProperties;

    @IsOptional()
    @IsUUID('4', { each: true })
    @ArrayMinSize(0)
    readonly worksheets: string[]; 

    @IsOptional()
    @IsNotEmpty()
    @IsUUID('4', { each: true })
    readonly workspaces: string;

    @IsOptional()
    @IsUUID('4', { each: true })
    @IsArray()
    @IsNotEmpty()
    readonly permissions: string[];

    @IsOptional()
    readonly user: any;

    @IsOptional()
    @IsBoolean()
    readonly isActive: boolean;
}
