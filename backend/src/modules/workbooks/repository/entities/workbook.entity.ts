import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ArrayMinSize, IsBoolean, IsNotEmpty, IsOptional, IsUUID, MinLength } from 'class-validator';
import { CallbackWithoutResultAndOptionalError, ObjectId } from 'mongoose';
import { DatabaseMongoEntityAbstract } from 'src/common/database/abstracts/database.mongo-entity.abstract';
import { DatabaseEntity } from 'src/common/database/decorators/database.decorator';
import { string } from 'yargs';

export const WorkbookDatabaseName = 'workbooks';

class PropertiesEntity {
    @Prop({
        required: true,
        type: String,
        trim: true,
        minlength: 4
    })
    icon: string
}


@DatabaseEntity({ collection: WorkbookDatabaseName })
export class WorkbookEntity extends DatabaseMongoEntityAbstract {
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
    @IsUUID('4', { each: true })
    worksheets: string[];

    @Prop({
        required: true,
    })
    @IsNotEmpty()
    @IsUUID('4', { each: true })
    workspace: string;

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
}

export const WorkbookSchema = SchemaFactory.createForClass(WorkbookEntity);

WorkbookSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
    console.log('SAVING');
    next();
});
