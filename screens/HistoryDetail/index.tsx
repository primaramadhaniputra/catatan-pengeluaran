import {getTransactionByDate} from "@/db";
import {formatCurrency} from "@/utils/functions";
import {useLocalSearchParams} from "expo-router";
import React, {useEffect, useState} from "react";
import {ScrollView, StatusBar, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Data} from "../Home";

const categoryColor = ["#907ade", "#de7a7c"];

const HistoryDetail = () => {
  const {date} = useLocalSearchParams();
  const [data, setData] = useState<Data[]>([]);

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

  useEffect(() => {
    getDataDetail();
  }, []);

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
          <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 12}}>
            Pengeluaran {date}
          </Text>
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
                    }}
                  >
                    <Text>{row.note}</Text>
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
    </SafeAreaView>
  );
};

export default HistoryDetail;
