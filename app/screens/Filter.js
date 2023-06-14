import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { RadioButton, Checkbox } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Filter() {
  const [brands, setBrands] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState("1");
  const [models, setModels] = useState([]);

  const options = [
    { label: "Old to new", value: "1" },
    { label: "New to old", value: "2" },
    { label: "Price high  to low", value: "3" },
    { label: "Price low to high", value: "4" },
  ];

  useEffect(() => {
    axios
      .get("https://5fc9346b2af77700165ae514.mockapi.io/products")
      .then((response) => {
        const uniqueBrands = Array.from(
          new Set(response.data.map((item) => item.brand))
        );
        const uniqueModels = Array.from(
          new Set(response.data.map((item) => item.model))
        );
        setBrands(uniqueBrands);
        setModels(uniqueModels);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCheck = (value) => {
    if (checkedItems.includes(value)) {
      setCheckedItems(checkedItems.filter((item) => item !== value));
    } else {
      setCheckedItems([...checkedItems, value]);
    }
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Ionicons name="ios-close-outline" size={44} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Filter</Text>
        </View>
        <ScrollView>
          <View style={styles.firstFilter}>
            <Text style={styles.filterHeader}>Sort By</Text>
            <RadioButton.Group
              onValueChange={(newValue) => setSelectedOption(newValue)}
              value={selectedOption}
            >
              {options.map((option, i) => (
                <View style={styles.radioButton} key={i}>
                  <RadioButton.Android
                    value={option.value}
                    color="#2A59FE"
                    uncheckedColor="#2A59FE"
                  />
                  <Text style={styles.textStyle}>{option.label}</Text>
                </View>
              ))}
            </RadioButton.Group>
          </View>
          <View style={styles.separator} />
          <View style={styles.firstFilter}>
            <Text style={styles.filterHeader}>Brand</Text>
            <View style={styles.searchContainer}>
              <Ionicons name="ios-search" size={16} color="#656D78" />
              <TextInput
                style={[styles.searchInput]}
                placeholderTextColor="#495466"
                placeholder={"Search"}
              />
            </View>
            <ScrollView style={styles.scrollView}>
              {brands.map((brand, i) => (
                <View style={styles.checkboxContainer} key={i}>
                  <Checkbox.Android
                    status={
                      checkedItems.includes(brand) ? "checked" : "unchecked"
                    }
                    onPress={() => handleCheck(brand)}
                    color="#2A59FE"
                    uncheckedColor="#2A59FE"
                  />
                  <Text style={styles.textStyle}>{brand}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.separator} />
          <View style={styles.firstFilter}>
            <Text style={styles.filterHeader}>Model</Text>
            <View style={styles.searchContainer}>
              <Ionicons name="ios-search" size={16} color="#656D78" />
              <TextInput
                style={[styles.searchInput]}
                placeholderTextColor="#495466"
                placeholder={"Search"}
              />
            </View>
            <ScrollView style={styles.scrollView}>
              {models.map((model, i) => (
                <View style={styles.checkboxContainer} key={i}>
                  <Checkbox.Android
                    status={
                      checkedItems.includes(model) ? "checked" : "unchecked"
                    }
                    onPress={() => handleCheck(model)}
                    color="#2A59FE"
                    uncheckedColor="#2A59FE"
                  />
                  <Text style={styles.textStyle}>{model}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.buttonText}>Primary</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "#fff",
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    marginRight: 150,
    fontWeight: "400",
  },
  firstFilter: {
    marginTop: 6,
    paddingLeft: 20,
    width: "90%",
  },
  scrollView: {
    marginTop: 6,
    paddingLeft: 5,
    width: "90%",
    maxHeight: 100,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    margin: -2,
  },
  textStyle: {
    marginLeft: 5,
  },
  filterHeader: {
    color: "#333333",
    fontSize: 12,
    fontWeight: 400,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    margin: -2,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 0,
    padding: 8,
    paddingHorizontal: 15,
    marginBottom: 0,
    marginVertical: 15,
    backgroundColor: "#f5f5f5",
    marginLeft: 12,
    width: "90%",
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
    fontSize: 16,
    padding: 4,
    color: "#495466",
  },
  separator: {
    height: 1,
    backgroundColor: "#00000080",
    marginVertical: 15,
    width: "90%",
    alignSelf: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  buttonContainer: {
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
  },
  filterButton: {
    backgroundColor: "#2A59FE",
    paddingVertical: 8,
    paddingHorizontal: 48,
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: 500,
  },
});
