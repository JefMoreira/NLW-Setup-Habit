import * as Popover from '@radix-ui/react-popover';
import * as CheckBox from '@radix-ui/react-checkbox'
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx';
import { Check } from 'phosphor-react';
import dayjs from 'dayjs';

interface HabitDayProps{
  date: Date
  completed?: number
  amount?: number
}

export function HabitDay({ completed = 0, amount = 0, date }: HabitDayProps) {
  const completedPercentage = amount > 0 ? Math.round((completed / amount) *100) : 0
  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfweek = dayjs(date).format('dddd')
  return (
    <Popover.Root>
      <Popover.Trigger 
      className={clsx('w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg bg-',{
        'bg-sky-500 border-sky-300': completedPercentage >= 80,
        'bg-sky-600 border-sky-400': completedPercentage >= 60 && completedPercentage < 80,
        'bg-sky-700 border-sky-500': completedPercentage >= 40 && completedPercentage < 60,
        'bg-sky-800 border-sky-600': completedPercentage >= 20 && completedPercentage < 40,
        'bg-sky-900 border-sky-700': completedPercentage > 0 && completedPercentage < 20,
        'bg-zinc-900  border-zinc-800': completedPercentage === 0, 
      }
      )} />
      
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfweek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">{dayAndMonth}</span>
            <ProgressBar progress={completedPercentage} />
            <div className="mt-6 flex flex-row gap-3">
              <CheckBox.Root
                className="flex items-center gap-3 group"
              >
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500"> 
                  <CheckBox.Indicator>
                    <Check size={20} className="text-white" />                      
                  </CheckBox.Indicator>
                  </div>
                    <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                      Beber 2L de água
                    </span>

               </CheckBox.Root>

            </div>
             
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
