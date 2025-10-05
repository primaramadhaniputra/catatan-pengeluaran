import {deleteTransaction, getTransactions} from "@/db";
import {formatCurrency, formatDate, formatUnixToDate} from "@/utils/functions";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, {useEffect, useState} from "react";
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import FormCatatPengeluaran from "./FormCatatPengeluaran";

export interface Data {
  categoryId: string;
  categoryName: string;
  date: string;
  id: number;
  nominal: string;
  note: string;
}

const categoryColor = ["#907ade", "#de7a7c", "#7adeb8", "#d4de7a"];

const Home = () => {
  const [data, setData] = useState<Data[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleShow = async () => {
    setIsLoading(true);
    const data = (await getTransactions()) as Data[];
    const dataByToday = data.filter(
      (item) => item.date === formatDate(new Date(), "-")
    );
    setData(dataByToday);
    setIsLoading(false);
  };

  const handleDelete = async (id: number) => {
    await deleteTransaction(id);
    handleShow();
    Alert.alert("Success");
  };

  useEffect(() => {
    handleShow();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white", padding: 16}}>
      {/* <StatusBar
        barStyle="dark-content" // teks & icon status bar jadi hitam
        backgroundColor="white" // background status bar putih
      /> */}

      <FormCatatPengeluaran />
      <ScrollView
        contentContainerStyle={{
          marginTop: 24,
          backgroundColor: "white",
          elevation: 1,
          borderRadius: 12,
          padding: 16,
          gap: 8,
        }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleShow} />
        }
      >
        {isLoading ? <ActivityIndicator /> : null}
        <Text style={{fontSize: 18, fontWeight: "600", marginBottom: 12}}>
          Pengeluaran {formatUnixToDate(new Date().getTime() / 1000)}
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
                <TouchableOpacity onPress={() => handleDelete(row.id)}>
                  <MaterialIcons name="delete" color={"red"} size={24} />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flex: 1,
                    gap: 8,
                  }}
                >
                  <Text style={{flex: 1}}>{row.note}</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
