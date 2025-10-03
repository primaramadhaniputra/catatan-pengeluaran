import React from "react";
import {StatusBar, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Note = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "white", padding: 16}}>
      <StatusBar
        barStyle="dark-content" // teks & icon status bar jadi hitam
        backgroundColor="white" // background status bar putih
      />
      <Text style={{fontSize: 16, fontWeight: "600"}}>
        Tambah Daftar Belanja
      </Text>
      {/* <FormAddNote /> */}
    </SafeAreaView>
  );
};

export default Note;
