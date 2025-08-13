import { FC } from 'react';

interface InfoBoxProps {
  icon: React.ReactNode;
  label: string;
  value: string | number | React.ReactNode;
}

const InfoBox: FC<InfoBoxProps> = ({icon,label,value}) => {
  return (
    <div className='flex items-center justify-start gap-1 p-2 md:gap-3 md:p-3 bg-muted/50 rounded-lg shadow-sm group-hover:bg-muted/70'>
      {icon}
      <div>
        <p className='text-sm font-medium text-foreground'>{value}</p>
        <p className='text-xs text-muted-foreground'>{label}</p>
      </div>
    </div>
  );
};

export default InfoBox;