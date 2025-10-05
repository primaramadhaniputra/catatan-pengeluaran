import {getTransactionsByMonth} from "@/db";
import {
  formatCurrency,
  formatDate,
  formatUnixToDate,
  parseDate,
} from "@/utils/functions";
import {router} from "expo-router";
import React, {useEffect, useState} from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {Data} from "../Home";

const ByDate = () => {
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // const [month, year] = (date! as string).split("-").map(Number);
  const handleShow = async () => {
    setIsLoading(true);
    const currentDate = formatDate(new Date(), "-");
    const [_, month, year] = (currentDate! as string).split("-").map(Number);

    const data = await getTransactionsByMonth(month, year);

    setData(data as Data[]);
    setIsLoading(false);
  };

  useEffect(() => {
    handleShow();
  }, []);
  return (
    <ScrollView
      style={{flex: 1, marginVertical: 8}}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleShow} />
      }
    >
      {isLoading ? <ActivityIndicator /> : null}
      <View style={{gap: 8}}>
        {dataByDate
          .sort(
            (a, b) =>
              parseDate(b.date)!.getTime() - parseDate(a.date)!.getTime()
          )
          .map((item) => {
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
  );
};

export default ByDate;
