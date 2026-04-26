import { StatCard } from "../../core/models/dashboard/stat-card";

export interface StatCardUI extends StatCard{
    label: string;
    theme: string;
    icon: string;
}