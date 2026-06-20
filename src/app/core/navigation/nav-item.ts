import { Permission } from "../auth/permissions";

export interface NavItem {
    label: string;
    icon: string;
    route: string;
    permission: Permission;
}
