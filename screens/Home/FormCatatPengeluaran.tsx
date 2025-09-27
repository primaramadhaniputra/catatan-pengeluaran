import {router} from "expo-router";
import React from "react";
import {Text, TouchableOpacity, View} from "react-native";

const FormCatatPengeluarang = () => {
  return (
    <>
      <View>
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
          <Text style={{color: "white", fontWeight: 500}}>
            Catat Pengeluaran
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FormCatatPengeluarang;
