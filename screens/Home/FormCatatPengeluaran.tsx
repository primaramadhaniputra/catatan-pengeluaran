import {router} from "expo-router";
import React from "react";
import {Text, TouchableOpacity} from "react-native";

const FormCatatPengeluarang = () => {
  return (
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
      onPress={() => router.push("/expense")}
    >
      <Text style={{color: "white", fontWeight: 500}}>Catat Pengeluaran</Text>
    </TouchableOpacity>
  );
};

export default FormCatatPengeluarang;
