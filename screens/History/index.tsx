import {getTransactions} from "@/db";
import {formatCurrency, formatUnixToDate, parseDate} from "@/utils/functions";
import {router} from "expo-router";
import React, {useEffect, useState} from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Data} from "../Home";

const History = () => {
  const [data, setData] = useState<Data[]>([]);

  const dataByDate: {
    id: number;
    date: string;
    total: number;
  }[] = [];

  data.forEach((item) => {
    const indexPositin = dataByDate.findIndex((row) => row.date === item.date);

    if (indexPositin < 0) {
      dataByDate.push({
        id: item.id,
        date: item.date,
        total: Number(item.nominal),
      });
    } else {
      dataByDate[indexPositin].total += Number(item.nominal);
    }
  });

  const handleShow = async () => {
    const data = (await getTransactions()) as Data[];

    setData(data);
  };

  useEffect(() => {
    handleShow();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white", padding: 16}}>
      <StatusBar
        barStyle="dark-content" // teks & icon status bar jadi hitam
        backgroundColor="white" // background status bar putih
      />
      <Text style={{fontSize: 16, fontWeight: "600"}}>History Pengeluaran</Text>

      <ScrollView style={{flex: 1, marginVertical: 16}}>
        <View style={{gap: 8}}>
          {dataByDate.map((item) => {
            return (
              <TouchableOpacity
                style={{
                  elevation: 1,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: "#eef",
                  padding: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                key={item.id}
                onPress={() => {
                  router.push({
                    pathname: "/history-detail",
                    params: {
                      date: item.date,
                    },
                  });
                }}
              >
                <Text style={{fontSize: 14}}>
                  {formatUnixToDate(parseDate(item.date)!.getTime() / 1000)}
                </Text>
                <Text style={{fontSize: 16, fontWeight: "600"}}>
                  Rp {formatCurrency(item.total)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
