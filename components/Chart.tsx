'use client';

import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';

const chartData = [
  { month: 'January', revenue: 12300 },
  { month: 'February', revenue: 15500 },
  { month: 'March', revenue: 13700 },
  { month: 'April', revenue: 18400 },
  { month: 'May', revenue: 21900 },
  { month: 'June', revenue: 24200 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function ChartAreaGradient() {
  const gradientId = React.useId();

  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] w-full"
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
          top: 10,
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-primary)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-primary)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey="revenue"
          type="natural"
          fill={`url(#${gradientId})`}
          stroke="var(--color-primary)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}