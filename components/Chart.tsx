'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { ChartConfig, ChartContainer } from '@/components/ui/chart';

export const description = 'An area chart with gradient fill';

const chartData = [
  { month: 'January', sales: 93, expenses: 120 },
  { month: 'February', sales: 105, expenses: 200 },
  { month: 'March', sales: 107, expenses: 170 },
  { month: 'April', sales: 173, expenses: 190 },
  { month: 'May', sales: 209, expenses: 130 },
  { month: 'June', sales: 314, expenses: 240 },
];

const chartConfig = {
  sales: {
    label: 'Sales',
    color: 'var(--color-primary)',
  },
  expenses: {
    label: 'Expenses',
    color: 'var(--color-primary)',
  },
} satisfies ChartConfig;

export function ChartAreaGradient() {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />

        <defs>
          <linearGradient
            id="fillPrimary"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
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
          <linearGradient
            id="fillPrimary"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="5%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-mobile)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="expenses"
          type="natural"
          fill="url(#fillPrimary)"
          fillOpacity={0.4}
          stroke="var(--color-primary)"
          stackId="a"
          dot={false} //
          activeDot={false}
        />
        <Area
          dataKey="sales"
          type="natural"
          fill="url(#fillPrimary)"
          fillOpacity={0.4}
          stroke="var(--color-primary)"
          stackId="a"
          dot={false}
          activeDot={false}
        />
      </AreaChart>
    </ChartContainer>
  );
}
