import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ArrayMinSize, IsBoolean, IsOptional, IsUUID, MinLength } from 'class-validator';
import { CallbackWithoutResultAndOptionalError } from 'mongoose';
import { DatabaseMongoEntityAbstract } from 'src/common/database/abstracts/database.mongo-entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { WorkbookEntity } from 'src/modules/workbooks/repository/entities/workbook.entity';
import { string } from 'yargs';

export const WorkspaceDatabaseName = 'workspaces';

class PropertiesEntity {
    @Prop({
        required: true,
        type: String,
        trim: true,
        minlength: 4
    })
    icon: string

    @Prop({
        required: true,
        type: String,
        trim: true,
        minlength: 4
    })
    background: string
}

class OtherWorkspaceUsersProperties {

    @MinLength(3)
    readonly user: string

    @IsBoolean()
    readonly canRead: boolean

    @IsBoolean()
    readonly canEdit: boolean
}

@DatabaseEntity({ collection: WorkspaceDatabaseName })
export class WorkspaceEntity extends DatabaseMongoEntityAbstract {
    @Prop({
        required: true,
        index: true,
        trim: true,
        unique: true,
        type: String,
        maxlength: 100,
    })
    title: string;


    @Prop({
        required: true,        
        type:PropertiesEntity,
    })
    properties: PropertiesEntity;

    @Prop({
        required: true,
        default: [],
        _id: false,
        type: Array<string>,
    })
    workbooks: string[];

    @Prop({
        required: true,
        type: Boolean
    })
    isActive: boolean;

    @Prop({
        type: String
    })
    createdBy: string;

    @Prop({
        type: String
    })
    updatedBy: string;

    @Prop({
        type: String
    })
    @IsOptional()
    primaryUser: string;

    @Prop({
        type: String
    })
    @IsOptional()
    otherUsers: OtherWorkspaceUsersProperties[]
}

export const WorkspaceSchema = SchemaFactory.createForClass(WorkspaceEntity);

WorkspaceSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    console.log('SAVING');
    next();
});
