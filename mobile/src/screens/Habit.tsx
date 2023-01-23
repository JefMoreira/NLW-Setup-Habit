import { Alert, ScrollView, Text, View } from "react-native";
import { useRoute } from '@react-navigation/native';
import dayjs from "dayjs";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";
import { useState, useEffect } from "react";
import { Loading } from "../components/Loading";
import { HabitsEmpty } from "../components/HabitsEmpty";
import { api } from "../lib/axios";
import { generateProgressPorcentage } from "../utils/generate-progress-percentage";
import clsx from "clsx";

interface Params {
  date: string;
}
interface DayInfoProps {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[];
}

export function Habit() {
  const [loading, setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([])
 
  const route = useRoute()
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf('day').isBefore(new Date());
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  const habitsProgress = dayInfo?.possibleHabits?.length ? generateProgressPorcentage(dayInfo.possibleHabits.length, completedHabits.length) : 0

  async function fetchHabits() {
    try {
      setLoading(true)

      const response = await api.get('/day', { params: { date } });
      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits ?? [])
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível carregar as informações dos hábitos.')
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleHabits(habitId: string) {
    try {
      await api.patch(`/habits/${habitId}/toggle`);

      if (completedHabits?.includes(habitId)) {
        setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId));
      } else {
        setCompletedHabits(prevState => [...prevState, habitId]);
      }
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível atualizar o status do hábito.')
    }
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }


  return (
    
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >   
      <BackButton />

      <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
        {dayOfWeek}
      </Text>
      <Text className="text-white font-extrabold text-3xl">
        {dayAndMonth}
      </Text>
      <ProgressBar progress={habitsProgress}/>

      <View className={clsx("mt-6", {
        ['opacity-50']: isDateInPast
      })}>
        {
          dayInfo?.possibleHabits ?
            dayInfo?.possibleHabits.map(habit => (
            <CheckBox
              key={habit.id}
              title={habit.title}
              checked={completedHabits.includes(habit.id)}
              disabled={isDateInPast}
              onPress={() => handleToggleHabits(habit.id)}
          />
          ))
          : <HabitsEmpty />
        } 
      </View>
        {
          isDateInPast && (
          <Text className="text-white mt-10 text-center">
            Você não pode editar um hábito de uma data passada.
          </Text>
          )
        }
    
  </ScrollView>


    </View>

  )
}