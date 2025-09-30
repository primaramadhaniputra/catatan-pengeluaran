import {useLocalSearchParams} from "expo-router";
import React from "react";
import {StatusBar, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import HistoryDetailByDate from "./HistoryDetailByDate";
import HistoryDetailByMonth from "./HistoryDetailByMonth";

const HistoryDetail = () => {
  const {type, date} = useLocalSearchParams();

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: "white", paddingVertical: 16}}
    >
      <StatusBar
        barStyle="dark-content" // teks & icon status bar jadi hitam
        backgroundColor="white" // background status bar putih
      />
      <Text style={{fontSize: 16, fontWeight: "600", paddingHorizontal: 16}}>
        Detail History Pengeluaran
      </Text>
      {!type ? <HistoryDetailByDate /> : <HistoryDetailByMonth />}
    </SafeAreaView>
  );
};

export default HistoryDetail;
