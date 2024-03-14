import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES, FONTS } from "../constants";
import Slideshow from "react-native-image-slider-show";
import { categories } from "../constants/data";
import DonationCard from "../components/DonationCard";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const [position, setPosition] = useState(0);
  const [dataSource, setDataSource] = useState([
    {
      url: "https://img.lovepik.com/photo/40174/6611.jpg_wh860.jpg",
    },
    {
      url: "https://static.vecteezy.com/system/resources/previews/018/929/858/original/blood-donation-2d-isolated-illustration-man-in-chair-on-blood-transfusion-donor-with-smiling-nurse-flat-characters-on-cartoon-background-charity-work-and-volunteering-colourful-scene-vector.jpg",
    },
    {
      url: "https://img.freepik.com/premium-vector/doctor-nurse-help-female-volunteer-give-blood-hospital-woman-sitting-modern-medical-chair-donate-blood-transfusion-bags-isolated-white-world-donor-day-charity-concept_575670-1265.jpg",
    },
    {
      url: "https://media.istockphoto.com/id/1349428314/video/blood-donation-animation-video-illustration-4k-video.jpg?s=640x640&k=20&c=IKuxsLSfdQNP5q0c93o4_EjMVPEJc2lcAqpWHfsAIKw=",
    },
  ]);

  useEffect(() => {
    const toggle = setInterval(() => {
      setPosition(position === dataSource.length - 1 ? 0 : position + 1);
    }, 5000);

    return () => clearInterval(toggle);
  });

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 12,
        }}
      >
        <TouchableOpacity onPress={() => console.log("Pressed")}>
          <MaterialCommunityIcons
            name="view-dashboard"
            size={28}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <View>
          <View
            style={{
              height: 6,
              width: 6,
              backgroundColor: COLORS.primary,
              borderRadius: 3,
              position: "absolute",
              right: 5,
              top: 5,
            }}
          ></View>
          <TouchableOpacity onPress={() => console.log("Pressed")}>
            <Ionicons
              name="notifications-outline"
              size={28}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderSliderBanner() {
    return (
      <View
        style={{
          height: 200,
          width: "100%",
        }}
      >
        <Slideshow position={position} dataSource={dataSource} />
      </View>
    );
  }

  function renderFeatures() {
    return (
      <View
        style={{
          marginVertical: SIZES.padding,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={{
              height: 120,
              width: 110,
              borderColor: COLORS.secondaryWhite,
              borderWidth: 2,
              backgroundColor: COLORS.white,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 22,
            }}
            onPress={() => {
              if (category.title === "Find Donors") {
                navigation.navigate("Search");
              }
              if (category.title === "Order Blood") {
                navigation.navigate("Search");
              }
              if (category.title === "Donates") {
                navigation.navigate("DonationRequest");
              }
              if (category.title === "Help") {
                navigation.navigate("Profile");
              }
              if (category.title === "Donation") {
                navigation.navigate("Report");
              }
              if (category.title === "Charity") {
                navigation.navigate("Report");
              }
            }}
          >
            <Image
              source={category.icon}
              resizeMode="contain"
              style={{
                height: 40,
                width: 40,
                marginVertical: 12,
              }}
            />
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.secondaryBlack,
              }}
            >
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  function renderDonationCard() {
    return (
      <View>
        <Text
          style={{
            ...FONTS.body3,
            fontWeight: "bold",
            color: COLORS.secondaryBlack,
          }}
        >
          Donation Request
        </Text>
        <DonationCard
          name="Rahul Shah"
          location="Sahyadri Hospital"
          bloodType="B+"
          postedDate="13 mins ago"
          onPress={() => console.log("Pressed")}
        />
        <DonationCard
          name="Sonal Joshi"
          location="Ruby Hall Clinic"
          bloodType="B+"
          postedDate="13 mins ago"
          onPress={() => console.log("Pressed")}
        />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ marginHorizontal: 22 }}>
        {renderHeader()}
        {renderSliderBanner()}
        {renderFeatures()}
        {renderDonationCard()}
      </View>
    </SafeAreaView>
  );
};

export default Home;
