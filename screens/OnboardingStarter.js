import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";

const Dots = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? "#ff2156" : "#808080";
  return (
    <View
      style={{
        height: 5,
        width: 5,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Done = ({ ...props }) => (
  <TouchableOpacity
    style={{
      marginRight: 12,
    }}
    {...props}
  >
    <Text style={{ color: "#ff2156" }}>Done</Text>
  </TouchableOpacity>
);

const OnboardingStarter = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.navigate("GetStarted")}
      onDone={() => navigation.navigate("GetStarted")}
      DotComponent={Dots}
      bottomBarColor="#ffffff"
      DoneButtonComponent={Done}
      pages={[
        {
          backgroundColor: "#ffcccb",
          image: (
            <Image source={require("../assets/images/onboarding_1.png")} />
          ),
          title: "Find Blood Donors",
          subtitle:
            "A user-friendly feature that facilitates users to swiftly search for suitable blood donors based on their location, blood type, and availability.",
        },
        {
          backgroundColor: "#aaf0d1",
          image: (
            <Image source={require("../assets/images/onboarding_2.png")} />
          ),
          title: "Save a Life",
          subtitle:
            "Blood Donor Search empowers users to connect with donors efficiently and potentially saving lives in critical situations.",
        },
      ]}
    />
  );
};

export default OnboardingStarter;
