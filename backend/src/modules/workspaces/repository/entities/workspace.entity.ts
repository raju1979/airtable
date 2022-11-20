import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { any } from 'joi';
import { CallbackWithoutResultAndOptionalError } from 'mongoose';
import { AwsS3Serialization } from 'src/common/aws/serializations/aws.s3.serialization';
import { DatabaseMongoEntityAbstract } from 'src/common/database/abstracts/database.mongo-entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { RoleEntity } from 'src/modules/role/repository/entities/role.entity';

export const WorkspaceDatabaseName = 'workspaces';

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
        type:Object,
    })
    properties: Object;

    @Prop({
        required: true,
    })
    workbooks: [];
}

export const WorkspaceSchema = SchemaFactory.createForClass(WorkspaceEntity);

WorkspaceSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    console.log('SAVING');
    next();
});
