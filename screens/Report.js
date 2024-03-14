import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import QRCode from "react-native-qrcode-svg";
import Modal from "react-native-modal";

const foodItems = [
  {
    id: 1,
    name: "Grains",
    image: require("../assets/images/users/Grains.png"),
    price: 55,
  },
  {
    id: 2,
    name: "Rice",
    image: require("../assets/images/users/Rice.png"),
    price: 44,
  },
  {
    id: 3,
    name: "Onion",
    image: require("../assets/images/users/Onions.png"),
    price: 30,
  },
  {
    id: 4,
    name: "Potato",
    image: require("../assets/images/users/Potato.png"),
    price: 30,
  },
  {
    id: 5,
    name: "Oil",
    image: require("../assets/images/users/Oil.png"),
    price: 98,
  },
];

const ngoData = {
  name: "Sample NGO",
  number: "1234567890",
  address: "Sample Address",
};

const FoodTab = () => {
  const [quantity, setQuantity] = useState({});
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const increaseQuantity = (id) => {
    setQuantity({ ...quantity, [id]: (quantity[id] || 0) + 1 });
  };

  const decreaseQuantity = (id) => {
    if (quantity[id] && quantity[id] > 0) {
      setQuantity({ ...quantity, [id]: quantity[id] - 1 });
    }
  };

  const handleDonate = () => {
    const calculatedTotal = calculateTotalAmount();
    setTotalAmount(calculatedTotal);
    setShowQR(true);
  };

  const handlePay = () => {
    setShowQR(false);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    showToast("Payment Successful");
    showNotification(totalAmount);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const showNotification = (amount) => {
    setShowConfirmation(true);
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    for (const id in quantity) {
      totalAmount +=
        quantity[id] *
        foodItems.find((item) => item.id === parseInt(id))?.price;
    }
    return totalAmount;
  };

  return (
    <ScrollView contentContainerStyle={styles.tabContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          value={mobileNumber}
          onChangeText={setMobileNumber}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>

      {foodItems.map((item) => (
        <View key={item.id} style={styles.foodItemContainer}>
          <Image source={item.image} style={styles.foodItemImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.foodItemName}>{item.name}</Text>
            <Text style={styles.foodItemPrice}>₹{item.price} / kg</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => decreaseQuantity(item.id)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity[item.id] || 0}</Text>
            <TouchableOpacity
              onPress={() => increaseQuantity(item.id)}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmountText}>
          Total Amount: ₹{calculateTotalAmount()}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDonate} style={styles.donateButton}>
        <Text style={styles.donateButtonText}>Donate</Text>
      </TouchableOpacity>
      <Modal isVisible={showQR}>
        <View style={styles.qrContainer}>
          <QRCode value={`₹${totalAmount}`} size={200} />
          <TouchableOpacity onPress={handlePay} style={styles.payButton}>
            <Text style={styles.payButtonText}>Pay ₹{totalAmount}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={showConfirmation}>
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationTitle}>Charity Donation</Text>
          <Text style={styles.confirmationMessage}>
            ₹{totalAmount} has been debited successfully from your bank account
            for Charity Donation !!!
          </Text>
          <View style={styles.confirmationButtonContainer}>
            <TouchableOpacity
              onPress={handleConfirm}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const MoneyTab = () => {
  const [ngoName, setNgoName] = useState("");
  const [ngoNumber, setNgoNumber] = useState("");
  const [ngoAddress, setNgoAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [amount, setAmount] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleDonate = () => {
    const calculatedTotal = calculateTotalAmount();
    setTotalAmount(calculatedTotal);
    setShowQR(true);
  };

  const handlePay = () => {
    setShowQR(false);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    showToast("Payment Successful");
    showNotification(totalAmount);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const showNotification = (amount) => {
    setShowConfirmation(true);
  };

  const calculateTotalAmount = () => {
    return parseInt(amount);
  };

  return (
    <ScrollView contentContainerStyle={styles.tabContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>NGO Name</Text>
        <TextInput
          value={ngoName}
          onChangeText={setNgoName}
          placeholder="NGO Name"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>NGO Number</Text>
        <TextInput
          value={ngoNumber}
          onChangeText={setNgoNumber}
          placeholder="NGO Number"
          keyboardType="phone-pad"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>NGO Address</Text>
        <TextInput
          value={ngoAddress}
          onChangeText={setNgoAddress}
          placeholder="NGO Address"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Notes"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Donation Amount (₹)</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="Amount"
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={handleDonate} style={styles.donateButton}>
        <Text style={styles.donateButtonText}>Donate</Text>
      </TouchableOpacity>
      <Modal isVisible={showQR}>
        <View style={styles.qrContainer}>
          <QRCode value={`₹${totalAmount}`} size={200} />
          <TouchableOpacity onPress={handlePay} style={styles.payButton}>
            <Text style={styles.payButtonText}>Pay ₹{totalAmount}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={showConfirmation}>
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmationTitle}>Charity Donation</Text>
          <Text style={styles.confirmationMessage}>
            ₹{totalAmount} has been debited successfully from your bank account
            for Charity Donation !!!
          </Text>
          <View style={styles.confirmationButtonContainer}>
            <TouchableOpacity
              onPress={handleConfirm}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const CharityDonationPage = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "food", title: "Food" },
    { key: "money", title: "Money" },
  ]);

  const renderScene = SceneMap({
    food: FoodTab,
    money: MoneyTab,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "green" }}
      style={{ backgroundColor: "white" }}
      activeColor={"green"}
      inactiveColor={"gray"}
    />
  );

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <Text style={styles.header}>CHARITY DONATION</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: "100%" }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    marginBottom: 17,
  },
  tabContainer: {
    flexGrow: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 50,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  foodItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
    marginTop: 20,
  },
  foodItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  foodItemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  foodItemPrice: {
    fontSize: 14,
    color: "gray",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "lightgray",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  quantityButtonText: {
    fontSize: 16,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
    padding: 12,
  },
  totalAmountContainer: {
    alignItems: "center",
    backgroundColor: "#add8e6",
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  donateButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  donateButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  payButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  payButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  confirmationContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  confirmationMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  confirmationButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CharityDonationPage;
