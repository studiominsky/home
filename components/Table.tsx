import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTranslations } from 'next-intl';

const customers = [
  {
    id: 'CUST001',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    joined: '2023-01-15',
    status: 'Active',
  },
  {
    id: 'CUST002',
    name: 'Bob Smith',
    email: 'bob@example.com',
    joined: '2022-11-03',
    status: 'Inactive',
  },
  {
    id: 'CUST003',
    name: 'Charlie Lee',
    email: 'charlie@example.com',
    joined: '2023-03-22',
    status: 'Active',
  },
];

function StatusIndicator({ status }: { status: string }) {
  const t = useTranslations('Visuals.WebApp');
  const isActive = status === 'Active';
  const color = isActive ? 'bg-positive' : 'bg-gray-400';
  return (
    <span className="flex items-center gap-2">
      <span
        className={`
                    relative flex h-2 w-2
                    ${color}
                    rounded-full
                    before:content-['']
                    before:absolute
                    before:inset-0
                    before:rounded-full
                    before:animate-ping
                    before:${
                      isActive ? 'bg-green-400' : 'bg-gray-300'
                    }
                    before:opacity-75
                `}
      />
      {isActive ? t('active') : t('inactive')}
    </span>
  );
}

function CustomerTable() {
  const t = useTranslations('Visuals.WebApp');
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            {t('customerId')}
          </TableHead>
          <TableHead>{t('name')}</TableHead>
          <TableHead>{t('email')}</TableHead>
          <TableHead>{t('dateJoined')}</TableHead>
          <TableHead>{t('status')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="font-medium">
              {customer.id}
            </TableCell>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.joined}</TableCell>
            <TableCell>
              <StatusIndicator status={customer.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default CustomerTable;
