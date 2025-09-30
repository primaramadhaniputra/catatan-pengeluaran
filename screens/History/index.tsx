import React, {useState} from "react";
import {StatusBar, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import ByDate from "./ByDate";
import ByMonth from "./ByMonth";

const History = () => {
  const [type, setType] = useState<"date" | "month">("date");

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white", padding: 16}}>
      <StatusBar
        barStyle="dark-content" // teks & icon status bar jadi hitam
        backgroundColor="white" // background status bar putih
      />
      <Text style={{fontSize: 16, fontWeight: "600"}}>History Pengeluaran</Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 16,
          gap: 8,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            borderWidth: 1,
            alignItems: "center",
            height: 40,
            borderRadius: 8,
            justifyContent: "center",
            borderColor: "#eee",
            backgroundColor: type === "date" ? "#d01919" : "transparent",
          }}
          onPress={() => setType("date")}
        >
          <Text style={{color: type === "date" ? "white" : "gray"}}>
            Harian
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            borderWidth: 1,
            alignItems: "center",
            height: 40,
            borderRadius: 8,
            justifyContent: "center",
            borderColor: "#eee",
            backgroundColor: type === "month" ? "#d01919" : "transparent",
          }}
          onPress={() => setType("month")}
        >
          <Text style={{color: type === "month" ? "white" : "gray"}}>
            Bulanan
          </Text>
        </TouchableOpacity>
      </View>

      {type === "date" ? <ByDate /> : <ByMonth />}
    </SafeAreaView>
  );
};

export default History;
