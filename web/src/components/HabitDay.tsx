import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { ProgressBar } from './ProgressBar';

interface HabitDayProps{
  completed: number
  amount: number
}

export function HabitDay({completed, amount }: HabitDayProps) {
  const completedPercentage = Math.round((completed / amount) *100)
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
          <span className="font-semibold text-zinc-400">terça-feira</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">17/01</span>
            <ProgressBar progress={completedPercentage} />
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
