import { ScrollView, Text, View } from "react-native";
import { useRoute } from '@react-navigation/native';
import dayjs from "dayjs";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";

interface Params {
  date: string;
}

export function Habit() {
  const route = useRoute();
  const { date } = route.params as Params; 

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

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
      <ProgressBar progress={40}/>

      <View className="mt-6">
        <CheckBox
          title="Beber 2L de água"
          checked={false}
        />

        <CheckBox
          title="Caminahar"
          checked={true}
        />

      </View>

    
  </ScrollView>


    </View>

  )
}