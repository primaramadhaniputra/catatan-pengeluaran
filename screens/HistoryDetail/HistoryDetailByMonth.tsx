import {deleteTransactionsByDate, getTransactionsByMonth} from "@/db";
import {formatCurrency, formatUnixToDate, parseDate} from "@/utils/functions";
import {router, useLocalSearchParams} from "expo-router";
import React, {useEffect, useState} from "react";
import {Alert, ScrollView, Text, View} from "react-native";
import {Data} from "../Home";

const categoryColor = ["#907ade", "#de7a7c"];

const HistoryDetailByMonth = () => {
  const [data, setData] = useState<Data[]>([]);
  const {type, date} = useLocalSearchParams();

  const dataByCategory: {
    date: string;
    data: {
      categoryName: string;
      categoryId: string;
      data: Data[];
    }[];
  }[] = [];

  data.forEach((item) => {
    const position = dataByCategory.findIndex((row) => row.date === item.date);

    if (position < 0) {
      dataByCategory.push({
        date: item.date,
        data: [
          {
            categoryName: item.categoryName,
            categoryId: item.categoryId,
            data: [item],
          },
        ],
      });
    } else {
      const findPositionDataCategory = dataByCategory[position][
        "data"
      ].findIndex((row) => row.categoryId === item.categoryId);
      if (findPositionDataCategory < 0) {
        dataByCategory[position]["data"].push({
          categoryName: item.categoryName,
          categoryId: item.categoryId,
          data: [item],
        });
      } else {
        dataByCategory[position]["data"][findPositionDataCategory]["data"].push(
          item
        );
      }
    }
  });

  const getDataDetail = async () => {
    const [month, year] = (date! as string).split("-").map(Number);

    const data = await getTransactionsByMonth(month, year);

    // const data = await getTransactionByDate(date! as string);
    setData(data as Data[]);
  };

  const deletTransactions = async (date: string) => {
    await deleteTransactionsByDate(date);
    Alert.alert("Success", "Berhasil menghapus pengeluaran", [
      {text: "OK", onPress: () => router.replace("/history")},
    ]);
  };

  useEffect(() => {
    getDataDetail();
  }, []);

  return (
    <ScrollView style={{paddingHorizontal: 16}}>
      {dataByCategory
        .sort(
          (a, b) => parseDate(a.date)!.getTime() - parseDate(b.date)!.getTime()
        )
        .map((item) => {
          let total = 0;
          item.data.forEach((item) => {
            item.data.forEach((row) => {
              total += Number(row.nominal);
            });
          });

          return (
            <View
              key={item.date}
              style={{
                marginTop: 24,
                backgroundColor: "white",
                elevation: 1,
                borderRadius: 12,
                padding: 16,
                gap: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{fontSize: 18, fontWeight: "600"}}>
                  {String(
                    formatUnixToDate(
                      parseDate(item.date! as string)!.getTime() / 1000
                    )
                  )}
                </Text>
                {/* <TouchableOpacity
              style={{
                backgroundColor: "#d01919",
                height: 40,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-end",
                paddingHorizontal: 12,
              }}
              onPress={() => deletTransactions(date as string)}
            >
              <Text style={{color: "white", fontWeight: 500}}>Hapus</Text>
            </TouchableOpacity> */}
              </View>
              {item.data.map((item, idx) => (
                <View key={item.categoryId} style={{gap: 8}}>
                  <Text
                    style={{
                      backgroundColor: categoryColor[idx],
                      color: "white",
                      alignSelf: "flex-start",
                      fontSize: 12,
                      paddingHorizontal: 8,
                      borderRadius: 8,
                    }}
                  >
                    {item.categoryName}
                  </Text>
                  {item.data.map((row) => (
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#eee",
                        paddingBottom: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                      }}
                      key={row.id}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flex: 1,
                          gap: 8,
                        }}
                      >
                        <Text style={{flex: 1, flexWrap: "wrap"}}>
                          {row.note}
                        </Text>
                        <Text>Rp {formatCurrency(Number(row.nominal))}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text>Total</Text>
                <Text style={{fontSize: 18, fontWeight: "600"}}>
                  Rp {formatCurrency(total)}
                </Text>
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
};

export default HistoryDetailByMonth;
