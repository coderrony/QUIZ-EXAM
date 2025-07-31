import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FC } from 'react';
import { IconTrendingUp } from '@tabler/icons-react';

interface DashboardCardProps {
  className?: string;
  title: string;
  count: number;
  icon: string;
  percentage: string;
  footerText: string;
}

const DashboardCard: FC<DashboardCardProps> = ({ title, count, icon, percentage, footerText }) => {
  return (
    <Card className="group bg-gradient-to-br from-primary/10 to-background border border-border shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-primary">
      <CardHeader>
        <CardDescription className="text-muted-foreground text-sm">
          {title}
        </CardDescription>
        <CardTitle className="text-4xl font-bold text-primary group-hover:text-foreground">
          {icon} {count}
        </CardTitle>
        <CardAction className="mt-2">
          <Badge variant="outline" className="gap-1 group-hover:border-primary">
            <IconTrendingUp className="h-4 w-4" />
            {percentage}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="text-xs text-muted-foreground pt-2 group-hover:text-foreground">
        {footerText}
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
