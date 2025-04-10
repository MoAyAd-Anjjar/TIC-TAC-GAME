import { TouchableOpacity, View, Text } from "react-native";
import GamePage from "./GamePage";
import { useState } from "react";

const HomePage = ({ navigation }: any) => {
  const [ChoosePlay, setChoosePlay] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#b35b6f",
      }}
    >
      {
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            accessibilityLabel="Player vs Computer"
            onPress={() => navigation.navigate("solo")}
            style={{
              padding: 10,
              backgroundColor: "#007BFF",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Play Game</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel="Player vs Computer"
            onPress={() => navigation.navigate("online")}
            style={{
              padding: 10,
              backgroundColor: "#007BFF",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              Play MultiPlayer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityLabel="Player vs Computer"
            onPress={() => navigation.navigate("AI")}
            style={{
              padding: 10,
              backgroundColor: "#007BFF",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              Play vs Computer
            </Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

export default HomePage;
