import { WorkbookEntity } from "src/modules/workbooks/repository/entities/workbook.entity";
import { WorkspaceCreateDto } from "../dtos/workspace.create.dto";
import { WorkspaceEntity } from "../repository/entities/workspace.entity";

export interface IWorkspaceCreate {
    title: string;
    properties: {
        icon: string;
        background: string;
    }
    workbooks: string[];
    isActive: boolean;
    primaryUser?: string;
    otherUsers?: any[];
    user? :string
}

export interface IWorkspaceEntity extends Omit<WorkspaceEntity, 'workbooks'> {
    workbooks: WorkbookEntity[];
}