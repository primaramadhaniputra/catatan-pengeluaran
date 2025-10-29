import {formatCurrency} from "@/utils/functions";
import React from "react";
import {Text, View} from "react-native";
import {categoryColor, Data} from "../Home";

import PieChart from "react-native-pie-chart";

const widthAndHeight = 170;

const series = [
  {value: 430, color: "#fbd203", label: {text: "A", fontWeight: "bold"}},
  {value: 430, color: "red"},
];

interface Props {
  data: Data[];
}

const ExpenseByCategory = ({data}: Props) => {
  const totalByCategory: {
    name: string;
    id: string;
    total: number;
    color: string;
  }[] = [];

  data.forEach((item) => {
    const findDataIndex = totalByCategory.findIndex(
      (row) => row.id === item.categoryId
    );
    if (findDataIndex < 0) {
      totalByCategory.push({
        id: item.categoryId,
        name: item.categoryName,
        total: Number(item.nominal),
        color: categoryColor[totalByCategory.length],
      });
    } else {
      totalByCategory[findDataIndex].total = totalByCategory[
        findDataIndex
      ].total += Number(item.nominal);
    }
  });

  const series = totalByCategory.map((item) => ({
    value: item.total,
    color: item.color,
    // label: {text: item.total, fontWeight: "bold", fontSize: 8},
  }));

  return (
    <View style={{marginTop: 8, gap: 8}}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <PieChart widthAndHeight={widthAndHeight} series={series} />
      </View>

      {totalByCategory.map((item, idx) => (
        <View
          key={item.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            paddingBottom: 4,
          }}
        >
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
            {item.name}
          </Text>
          <Text style={{fontWeight: "600"}}>
            : Rp {formatCurrency(item.total)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ExpenseByCategory;
