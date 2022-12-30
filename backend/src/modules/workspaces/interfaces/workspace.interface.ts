import { ObjectId } from "mongoose";
import { WorkspaceCreateDto } from "../dtos/workspace.create.dto";



export interface IWorkspaceCreate {
    title: string;
    properties: {
        icon: string;
        background: string;
    }
    workbooks: ObjectId[];
    isActive: boolean;
    primaryUser?: string;
    otherUsers?: any[];
    user? :string
}