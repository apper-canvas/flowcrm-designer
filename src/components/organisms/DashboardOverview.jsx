import React from 'react'
      import DashboardStatCard from '@/components/molecules/DashboardStatCard'
      import RecentActivitiesCard from '@/components/molecules/RecentActivitiesCard'
      import PipelineOverviewCard from '@/components/molecules/PipelineOverviewCard'

      const DashboardOverview = ({ contacts, deals, activities, getTotalPipelineValue, getDealsByStage, getRecentActivities }) => {
        const dealStages = ['Lead', 'Qualified', 'Proposal', 'Won', 'Lost']

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardStatCard
                title="Total Contacts"
                value={contacts.length}
                icon="Users"
                iconBgClass="bg-primary/10"
                iconClass="text-primary"
                delay={0}
              />
              <DashboardStatCard
                title="Active Deals"
                value={deals.length}
                icon="DollarSign"
                iconBgClass="bg-accent/10"
                iconClass="text-accent"
                delay={0.1}
              />
              <DashboardStatCard
                title="Pipeline Value"
                value={`$${getTotalPipelineValue().toLocaleString()}`}
                icon="TrendingUp"
                iconBgClass="bg-green-100 dark:bg-green-900/20"
                iconClass="text-green-600"
                delay={0.2}
              />
              <DashboardStatCard
                title="Activities"
                value={activities.length}
                icon="Calendar"
                iconBgClass="bg-orange-100 dark:bg-orange-900/20"
                iconClass="text-orange-600"
                delay={0.3}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivitiesCard getRecentActivities={getRecentActivities} />
              <PipelineOverviewCard dealStages={dealStages} getDealsByStage={getDealsByStage} />
            </div>
          </div>
        )
      }

      export default DashboardOverview