import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const tipsData = [
  {
    danger: "Snake Bite",
    steps: [
      "Stay calm and still to slow the spread of venom.",
      "Keep the bitten area below the heart.",
      "Call emergency services immediately.",
      "Avoid attempting to suck out the venom.",
    ],
  },
  {
    danger: "Trapped in House During Flood",
    steps: [
      "Move to higher ground if possible.",
      "Avoid walking through floodwaters.",
      "Shut off electricity and gas supplies.",
      "Listen to emergency broadcasts for instructions.",
    ],
  },
  {
    danger: "Trapped in Fire",
    steps: [
      "Stay low to the ground to avoid smoke.",
      "Use a cloth to cover your nose and mouth.",
      "Check doors for heat before opening.",
      "Exit through windows or fire escapes if necessary.",
    ],
  },
  {
    danger: "Trapped in an Earthquake",
    steps: [
      "Take cover under sturdy furniture.",
      "Stay indoors until the shaking stops.",
      "Avoid windows and heavy objects.",
      "If outside, move to an open area away from buildings.",
    ],
  },
  // {
  //   danger: "Tsunami",
  //   steps: [
  //     "Move to higher ground immediately.",
  //     "Avoid the shoreline and low-lying areas.",
  //     "Listen to emergency broadcasts for updates.",
  //     "Do not return until authorities declare it safe.",
  //   ],
  // },
  {
    danger: "CPR (Cardiopulmonary Resuscitation)",
    steps: [
      "Check if the person is breathing.",
      "Begin chest compressions: Push hard and fast in the center of the chest.",
      "Provide rescue breaths if trained: Tilt the head back, lift the chin, and give 2 breaths.",
      "Continue CPR until medical professionals arrive.",
    ],
  },
  {
    danger: "Frostbite",
    steps: [
      "Move to a warmer area immediately.",
      "Warm the affected areas gradually with warm (not hot) water.",
      "Avoid rubbing the frostbitten area.",
      "Seek medical attention as soon as possible.",
    ],
  },
  {
    danger: "Snow Blindness",
    steps: [
      "Move indoors or into a shaded area.",
      "Rest the eyes and avoid further exposure to sunlight.",
      "Wear sunglasses or cover the eyes to reduce pain.",
      "Seek medical care if symptoms persist or worsen.",
    ],
  },
  {
    danger: "Hurricane",
    steps: [
      "Secure your home and evacuate if advised.",
      "Stay indoors and away from windows.",
      "Prepare an emergency kit with essentials.",
      "Monitor weather updates and follow official instructions.",
    ],
  },
  {
    danger: "Landslide",
    steps: [
      "Move away from the path of the landslide.",
      "Take cover under sturdy furniture if indoors.",
      "Avoid river valleys and low-lying areas.",
      "Listen to emergency services for evacuation instructions.",
    ],
  },
  {
    danger: "Volcanic Eruption",
    steps: [
      "Follow evacuation orders from authorities.",
      "Avoid river valleys and low-lying areas.",
      "Wear protective clothing and masks.",
      "Stay indoors and close windows and doors.",
    ],
  },
  {
    danger: "Extreme Heat",
    steps: [
      "Stay hydrated and avoid strenuous activities.",
      "Stay indoors and use air conditioning if possible.",
      "Wear lightweight and light-colored clothing.",
      "Check on vulnerable individuals and pets.",
    ],
  },
  {
    danger: "Blizzard",
    steps: [
      "Stay indoors and keep warm.",
      "Stock up on essentials and emergency supplies.",
      "Avoid traveling unless absolutely necessary.",
      "Listen to weather updates and follow official instructions.",
    ],
  },
];

const TipItem = ({ danger, steps }: { danger: string, steps: string[] }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.tipItem}>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={styles.tipButton}
      >
        <Text style={styles.tipTitle}>{danger}</Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <Text key={index} style={styles.stepText}>
              {index + 1}. {step}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const TipsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Disaster Management Tips</Text>
      {tipsData.map((tip, index) => (
        <TipItem key={index} danger={tip.danger} steps={tip.steps} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  tipItem: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
    overflow: "hidden",
  },
  tipButton: {
    padding: 15,
    backgroundColor: "#4285F4",
  },
  tipTitle: {
    fontSize: 18,
    color: "#fff",
  },
  stepsContainer: {
    padding: 15,
    backgroundColor: "#e9ecef",
  },
  stepText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default TipsScreen;
