import {insertTransaction} from "@/db";
import {formatCurrency, formatDate, parseCurrency} from "@/utils/functions";
import {router} from "expo-router";
import React, {useState} from "react";
import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const category = [
  {
    id: "1",
    name: "Makanan & Minuman",
  },
  {
    id: "2",
    name: "Lain-lain",
  },
  {
    id: "4",
    name: "Mingguan",
  },
  {
    id: "3",
    name: "Bulanan",
  },
];

export const defaultState = {
  categoryId: "",
  categoryName: "",
  nominal: "0",
  catatan: "",
  date: new Date(),
};

const FormAddNote = () => {
  const [showDate, setShowDate] = useState(false); //
  const [isLoading, setIsLoading] = useState(false);
  const [formDataExpense, setFormDataExpense] = useState(defaultState);
  const [showModalCreate, setShowModalCreate] = useState(false);

  const insets = useSafeAreaInsets();

  const toggleModalCreate = () => setShowModalCreate((prev) => !prev);

  const toggleShowDate = () => setShowDate((prev) => !prev);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDate(false); // tutup picker setelah pilih
    if (selectedDate) {
      setFormDataExpense((prev) => ({...prev, date: selectedDate}));
    }
  };

  const handleAdd = async () => {
    setIsLoading(true);
    setFormDataExpense(defaultState);
    await insertTransaction(
      formDataExpense.categoryId,
      formDataExpense.categoryName,
      formatDate(formDataExpense.date, "-"),
      formDataExpense.nominal,
      formDataExpense.catatan
    );
    setIsLoading(false);
    Alert.alert("Success", "Berhasil mencatat pengeluaran", [
      {text: "OK", onPress: () => router.replace("/(tabs)")},
    ]);
  };
  return (
    <View>
      <Text style={{fontSize: 16, fontWeight: "600"}}>
        Form Catat Pengeluaran
      </Text>

      <View style={{marginTop: 24, gap: 4}}>
        <Text>judul</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "#c0c0c0",
            paddingHorizontal: 8,
          }}
          onChangeText={(text) =>
            setFormDataExpense((prev) => ({...prev, catatan: text}))
          }
          value={formDataExpense.catatan}
        />
      </View>

      <View style={{marginTop: 12, gap: 4}}>
        <Text>Category</Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "#c0c0c0",
            paddingHorizontal: 8,
            height: 40,
            justifyContent: "center",
          }}
          onPress={toggleModalCreate}
        >
          <Text>{formDataExpense.categoryName}</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 12, gap: 4}}>
        <Text>Nominal</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 4,
            borderColor: "#c0c0c0",
            paddingHorizontal: 8,
          }}
          keyboardType="number-pad"
          onChangeText={(text) => {
            const parseNominal = parseCurrency(text);
            setFormDataExpense((prev) => ({
              ...prev,
              nominal: String(parseNominal),
            }));
          }}
          value={formatCurrency(Number(formDataExpense.nominal))}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor:
            isLoading ||
            !formDataExpense.catatan ||
            !formDataExpense.categoryId ||
            formDataExpense.nominal === "0"
              ? "#ccc9c9"
              : "#d01919",
          height: 40,
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 12,
          marginTop: 24,
        }}
        onPress={handleAdd}
        disabled={
          isLoading ||
          !formDataExpense.catatan ||
          !formDataExpense.categoryId ||
          formDataExpense.nominal === "0"
        }
      >
        <Text style={{color: "white", fontWeight: 500}}>
          {isLoading ? "Menyimpan" : "Simpan"}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalCreate}
        onRequestClose={toggleModalCreate}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,.25)",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 16,
              // paddingBottom: 52,
              paddingBottom: insets.bottom + 12,
              gap: 8,
            }}
          >
            {category.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{
                  height: 40,
                  justifyContent: "center",
                  borderRadius: 4,
                  paddingHorizontal: 8,
                  borderWidth: 1,
                  borderColor: "#eee",
                  backgroundColor:
                    item.id === formDataExpense.categoryId
                      ? "#a88ed2"
                      : "transparent",
                }}
                onPress={() =>
                  setFormDataExpense((prev) => ({
                    ...prev,
                    categoryId: item.id,
                    categoryName: item.name,
                  }))
                }
              >
                <Text
                  style={{
                    color:
                      item.id === formDataExpense.categoryId
                        ? "white"
                        : "black",
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FormAddNote;
