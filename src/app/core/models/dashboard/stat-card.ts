export type TrendType = 'Percent' | 'Number';

export type TrendDirection = 'Up' | 'Down' | 'Neutral';

export type TrendComparison = 'Yesterday' | 'Month' | 'Remaining' | 'Live' | 'Career';

export interface StatCard {
    count: number;
    trendValue: number | null;
    trendType: TrendType | null;
    trendDirection: TrendDirection | null;
    trendComparison: TrendComparison;
}