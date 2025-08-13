'use client';

import { FC } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {  ChevronDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';


interface MultiSelectProps {
  label: string;
  options: { id: string; text: string }[];
  values: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
}

const MultiSelect: FC<MultiSelectProps> = ({
  label,
  options,
  values,
  onChange,
  disabled,
}) => {
  const handleChange = (val: string) => {
    if (values.includes(val)) {
      onChange(values.filter(v => v !== val));
    } else {
      onChange([...values, val]);
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className='w-full justify-between'
            disabled={disabled}
          >
            {values.length ? `${values.length} selected` : `Select ${label}`}
            <ChevronDown className='ml-2 h-4 w-4 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[450px] p-2 space-y-1  '>
          {options.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleChange(item.id)}
              className='flex items-center p-1.5 rounded hover:bg-muted/50 cursor-pointer'
            >
              <Checkbox
                className='mr-2'
                checked={values.includes(item.id)}
                onCheckedChange={() => handleChange(item.id)}
              />
              <span>{item.text}</span>
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MultiSelect;
