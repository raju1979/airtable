import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ArrayMinSize } from 'class-validator';
import { CallbackWithoutResultAndOptionalError, ObjectId } from 'mongoose';
import { DatabaseMongoEntityAbstract } from 'src/common/database/abstracts/database.mongo-entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';

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
    })
    @ArrayMinSize(0)
    workbooks: ObjectId[];

    @Prop({
        required: true,
        type: Boolean
    })
    isActive: boolean;
}

export const WorkspaceSchema = SchemaFactory.createForClass(WorkspaceEntity);

WorkspaceSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    console.log('SAVING');
    next();
});
