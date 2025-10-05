import {deleteTransactionsByDate, getTransactionByDate} from "@/db";
import {formatCurrency, formatUnixToDate, parseDate} from "@/utils/functions";
import {router, useLocalSearchParams} from "expo-router";
import React, {useEffect, useState} from "react";
import {Alert, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Data} from "../Home";

const categoryColor = ["#907ade", "#de7a7c", "#7adeb8", "#d4de7a"];

const HistoryDetailByDate = () => {
  const [data, setData] = useState<Data[]>([]);
  const {date} = useLocalSearchParams();

  const dataByCategory: {
    categoryId: string;
    categoryName: string;
    data: Data[];
  }[] = [];

  data.forEach((item) => {
    const indexPositin = dataByCategory.findIndex(
      (row) => row.categoryId === item.categoryId
    );

    if (indexPositin < 0) {
      dataByCategory.push({
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        data: [item],
      });
    } else {
      dataByCategory[indexPositin].data.push(item);
    }
  });

  const total = data.reduce((acc, curr) => {
    acc += Number(curr.nominal);
    return acc;
  }, 0);

  const getDataDetail = async () => {
    const data = await getTransactionByDate(date! as string);
    setData(data as Data[]);
  };

  const deletTransactions = async (date: string) => {
    await deleteTransactionsByDate(date);
    Alert.alert("Success", "Berhasil menghapus pengeluaran", [
      {text: "OK", onPress: () => router.back()},
    ]);
  };

  useEffect(() => {
    getDataDetail();
  }, []);

  return (
    <ScrollView style={{paddingHorizontal: 16}}>
      <View
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
              formatUnixToDate(parseDate(date! as string)!.getTime() / 1000)
            )}
          </Text>
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
        {dataByCategory.map((item, idx) => (
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
                  <Text style={{flex: 1, flexWrap: "wrap"}}>{row.note}</Text>
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
    </ScrollView>
  );
};

export default HistoryDetailByDate;
