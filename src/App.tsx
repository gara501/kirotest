import React, { useState } from 'react';
import { ThemeProvider } from './providers/ThemeProvider';
import { DashboardLayout, KPICard, SalesChart, ActivityList } from './components';
import { 
  mockKPIData, 
  mockActivities, 
  weeklyChartData, 
  monthlyChartData 
} from './data/mockChartData';
import type { ActivityType } from './types/dashboard';

function App() {
  // State for chart timeframe
  const [chartTimeframe, setChartTimeframe] = useState<'weekly' | 'monthly'>('weekly');
  
  // State for activity filtering
  const [activityFilter, setActivityFilter] = useState<ActivityType | undefined>();

  // Memoize chart data based on timeframe to avoid recalculation
  const chartData = React.useMemo(() => {
    return chartTimeframe === 'weekly' ? weeklyChartData : monthlyChartData;
  }, [chartTimeframe]);
  
  // Memoize filtered activities to avoid recalculation on every render
  const filteredActivities = React.useMemo(() => {
    return activityFilter 
      ? mockActivities.filter(activity => activity.type === activityFilter)
      : mockActivities;
  }, [activityFilter]);

  // Memoize timeframe change handler to prevent recreation
  const handleTimeframeChange = React.useCallback((timeframe: 'weekly' | 'monthly') => {
    setChartTimeframe(timeframe);
  }, []);

  // Memoize activity filter handler to prevent recreation
  const handleActivityFilter = React.useCallback((filter: ActivityType) => {
    setActivityFilter(filter);
  }, []);

  return (
    <ThemeProvider>
      <DashboardLayout>
        <div className="space-y-6">
          {/* KPI Cards Section - Responsive Grid: 4-column → 2-column → 1-column */}
          <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Dashboard Overview
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockKPIData.map((kpi) => (
                <KPICard
                  key={kpi.id}
                  title={kpi.title}
                  value={kpi.formattedValue}
                  icon={kpi.icon}
                  trend={kpi.trend}
                />
              ))}
            </div>
          </div>

          {/* Sales Chart Section */}
          <div>
            <SalesChart
              data={chartData}
              timeframe={chartTimeframe}
              onTimeframeChange={handleTimeframeChange}
            />
          </div>

          {/* Activity List Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <ActivityList 
              activities={filteredActivities}
              maxHeight="500px"
              onFilter={handleActivityFilter}
            />
          </div>
        </div>
      </DashboardLayout>
    </ThemeProvider>
  );
}

export default App;
