import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import {
  MaterialIcons,
  Feather,
  EvilIcons,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { COLORS, FONTS, SIZES, images } from "../constants";
import * as Location from "expo-location";
import { Picker } from "@react-native-picker/picker";

const Profile = ({ navigation }) => {
  const [address, setAddress] = useState("Loading...");
  const [errorMsg, setErrorMsg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    mobileNumber: "",
    address: "",
  });

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      const text = JSON.stringify(location);
      const parsedData = JSON.parse(text);
      const longitude = parsedData.coords.longitude;
      const latitude = parsedData.coords.latitude;
      let address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      setAddress(
        `${address[0].name},${address[0].district},${address[0].city}`
      );
    };

    getPermissions();
  }, []);

  function handleCallNow() {
    Linking.openURL("tel:+918799906728");
  }

  function handleRequest() {
    navigation.navigate("Search");
  }

  function handleDonationRequest() {
    navigation.navigate("DonationRequest");
  }

  function handleInviteFriend() {
    Linking.openURL(
      "whatsapp://send?text=Check out this amazing app I found! It's a platform where you can easily sign up for blood donation drives and contribute to various charity causes. It's a great way to make a difference in someone's life.Let's join hands and spread kindness together! 😊&phone=+918799906728"
    );
  }

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            height: 44,
            width: 44,
            borderRadius: 4,
            backgroundColor: COLORS.secondaryWhite,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>
        <Text style={{ ...FONTS.h4 }}>Profile</Text>
        <TouchableOpacity onPress={() => console.log("Pressed")}>
          <Feather name="edit" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    );
  }

  function renderProfile() {
    return (
      <View
        style={{
          alignItems: "center",
          marginVertical: 22,
        }}
      >
        <Image
          source={images.Profile}
          resizeMode="contain"
          style={{
            height: 100,
            width: 100,
            borderRadius: SIZES.padding,
          }}
        />
        <Text style={{ ...FONTS.h2, marginTop: 24 }}>Muazzam Shabai</Text>
        <View
          style={{
            flexDirection: "row",
            marginVertical: SIZES.padding,
          }}
        >
          <EvilIcons name="location" size={24} color={COLORS.primary} />
          <Text
            style={{
              ...FONTS.body4,
              marginLeft: 8,
            }}
          >
            Pune
          </Text>
        </View>
      </View>
    );
  }

  function renderButtons() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={handleCallNow}
          style={{
            backgroundColor: COLORS.secondary,
            width: 150,
            height: 50,
            borderRadius: SIZES.padding,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="call" size={24} color={COLORS.white} />
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.white,
              marginLeft: 12,
            }}
          >
            Call Now
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDonationRequest}
          style={{
            backgroundColor: COLORS.primary,
            width: 150,
            height: 50,
            borderRadius: SIZES.padding,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Entypo name="forward" size={24} color={COLORS.white} />
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.white,
              marginLeft: 12,
            }}
          >
            Request
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderFeatures() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 22,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.h1 }}>A+</Text>
          <Text style={{ ...FONTS.body3 }}>Blood Type</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.h1 }}>05</Text>
          <Text style={{ ...FONTS.body3 }}>Donated</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text style={{ ...FONTS.h1 }}>02</Text>
          <Text style={{ ...FONTS.body3 }}>Requested</Text>
        </View>
      </View>
    );
  }

  function renderSettings() {
    return (
      <View style={{ flexDirection: "column" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 12,
          }}
          onPress={handleRequest}
        >
          <MaterialCommunityIcons
            name="calendar-clock-outline"
            size={24}
            color={COLORS.primary}
          />
          <Text style={{ ...FONTS.body3, marginLeft: 24 }}>
            Available for Donate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 12,
          }}
          onPress={handleInviteFriend}
        >
          <Ionicons name="share-outline" size={24} color={COLORS.primary} />
          <Text style={{ ...FONTS.body3, marginLeft: 24 }}>
            Invite a friend
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 12,
          }}
          onPress={handleFormModal}
        >
          <Feather name="info" size={24} color={COLORS.primary} />
          <Text style={{ ...FONTS.body3, marginLeft: 24 }}>
            Apply for Blood Donation
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 12,
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <AntDesign name="logout" size={24} color={COLORS.primary} />
          <Text style={{ ...FONTS.body3, marginLeft: 24 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function handleFormModal() {
    setShowModal(true);
  }

  function saveFormData() {
    // Your logic to save form data goes here
    setShowModal(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <View style={{ marginHorizontal: 22 }}>
          {renderHeader()}
          {renderProfile()}
          {renderButtons()}
          {renderFeatures()}
          {renderSettings()}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 20,
                borderRadius: 10,
                width: "80%",
              }}
            >
              <Text style={{ ...FONTS.h3, marginBottom: 10 }}>
                Apply for Blood Donation
              </Text>
              <View style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    placeholder="First Name"
                    style={{
                      flex: 1,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.gray,
                      marginRight: 10,
                    }}
                    onChangeText={(text) =>
                      setFormData({ ...formData, firstName: text })
                    }
                  />
                  <TextInput
                    placeholder="Last Name"
                    style={{
                      flex: 1,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.gray,
                    }}
                    onChangeText={(text) =>
                      setFormData({ ...formData, lastName: text })
                    }
                  />
                </View>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                  <TextInput
                    placeholder="Enter Age"
                    style={{
                      flex: 1,
                      borderBottomWidth: 1,
                      borderBottomColor: COLORS.gray,
                      marginRight: 10,
                    }}
                    onChangeText={(text) =>
                      setFormData({ ...formData, age: text })
                    }
                  />
                  <Picker
                    style={{ flex: 1 }}
                    selectedValue={formData.gender}
                    onValueChange={(itemValue, itemIndex) =>
                      setFormData({ ...formData, gender: itemValue })
                    }
                  >
                    <Picker.Item label="Gender" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Others" value="other" />
                  </Picker>
                </View>
                <Picker
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.gray,
                    marginBottom: 10,
                  }}
                  selectedValue={formData.bloodGroup}
                  onValueChange={(itemValue, itemIndex) =>
                    setFormData({ ...formData, bloodGroup: itemValue })
                  }
                >
                  <Picker.Item label="Select Blood Group" value="" />
                  <Picker.Item label="A+" value="A+" />
                  <Picker.Item label="B+" value="B+" />
                  <Picker.Item label="AB+" value="AB+" />
                  <Picker.Item label="O+" value="O+" />
                  <Picker.Item label="A-" value="A-" />
                  <Picker.Item label="B-" value="B-" />
                  <Picker.Item label="AB-" value="AB-" />
                  <Picker.Item label="O-" value="O-" />
                </Picker>
                <TextInput
                  placeholder="Mobile Number"
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.gray,
                    marginBottom: 10,
                  }}
                  onChangeText={(text) =>
                    setFormData({ ...formData, mobileNumber: text })
                  }
                />
                <TextInput
                  placeholder="Address"
                  multiline={true}
                  numberOfLines={5}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: COLORS.gray,
                    marginBottom: 10,
                  }}
                  onChangeText={(text) =>
                    setFormData({ ...formData, address: text })
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  style={{
                    backgroundColor: COLORS.primary,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: COLORS.white }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={saveFormData}
                  style={{
                    backgroundColor: COLORS.secondary,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: COLORS.white }}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </PageContainer>
    </SafeAreaView>
  );
};

export default Profile;
