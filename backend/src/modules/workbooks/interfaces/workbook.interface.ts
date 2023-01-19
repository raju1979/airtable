import { ObjectId } from "mongoose";
import { WorkspaceEntity } from "src/modules/workspaces/repository/entities/workspace.entity";
import { WorkbookEntity } from "../repository/entities/workbook.entity";

export interface IWorkbookCreate {
    title: string;
    properties: {
        icon: string;
    }
    worksheets: string[];
    workspaces: string;
    isActive: boolean;
    user? :string
}

export interface IWorkbookEntity extends Omit<WorkbookEntity, 'workspace'> {
    workspace: WorkspaceEntity;
}