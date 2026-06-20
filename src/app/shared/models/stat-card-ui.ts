import { StatCard } from "../../features/dashboard/models/stat-card";

export interface StatCardUI extends StatCard{
    label: string;
    theme: string;
    icon: string;
}