import React from 'react'
      import Card from '@/components/molecules/Card'
      import Text from '@/components/atoms/Text'

      const PipelineOverviewCard = ({ dealStages, getDealsByStage }) => {
        return (
          <Card initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <Text type="h3" className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">Pipeline Overview</Text>
            <div className="space-y-3">
              {dealStages.map(stage => {
                const stageDeals = getDealsByStage(stage)
                const stageValue = stageDeals.reduce((sum, deal) => sum + (deal?.value || 0), 0)
                return (
                  <div key={stage} className="flex items-center justify-between">
                    <Text type="span" className="text-sm font-medium text-surface-700 dark:text-surface-300">{stage}</Text>
                    <div className="text-right">
                      <Text type="span" className="text-sm font-bold text-surface-900 dark:text-surface-100">
                        {stageDeals.length} deals
                      </Text>
                      <Text type="p" className="text-xs text-surface-600 dark:text-surface-400">
                        ${stageValue.toLocaleString()}
                      </Text>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        )
      }

      export default PipelineOverviewCard