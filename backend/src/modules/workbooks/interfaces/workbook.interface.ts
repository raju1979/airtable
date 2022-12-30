import { ObjectId } from "mongoose";

export interface IWorkbookCreate {
    title: string;
    properties: {
        icon: string;
    }
    worksheets: string[];
    workspace: string;
    isActive: boolean;
    user? :string
}