import {getTransactions} from "@/db";
import {
  formatCurrency,
  formatUnixToMonthAndYear,
  parseDate,
} from "@/utils/functions";
import {router} from "expo-router";
import React, {useEffect, useState} from "react";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Data} from "../Home";

const ByMonth = () => {
  const [data, setData] = useState<Data[]>([]);

  const dataByDate: {
    id: number;
    date: string;
    total: number;
  }[] = [];

  data.forEach((item) => {
    const monthAndYear = `${parseDate(item.date)!.getMonth() + 1}-${parseDate(
      item.date
    )?.getFullYear()}`;

    const indexPositin = dataByDate.findIndex((row) => {
      const monthAndYearDataByDate = `${
        parseDate(row.date)!.getMonth() + 1
      }-${parseDate(row.date)?.getFullYear()}`;
      return monthAndYearDataByDate == monthAndYear;
    });

    if (indexPositin < 0) {
      dataByDate.push({
        id: item.id,
        date: monthAndYear,
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

  console.log("dataByDate", parseDate("9-2025"));
  return (
    <ScrollView style={{flex: 1, marginVertical: 16}}>
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
                      type: "month",
                    },
                  });
                }}
              >
                <Text style={{fontSize: 14}}>
                  {formatUnixToMonthAndYear(
                    parseDate(item.date)!.getTime() / 1000
                  )}
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

export default ByMonth;
