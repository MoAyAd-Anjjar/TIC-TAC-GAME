import { StyleSheet } from "react-native";

export default StyleSheet.create({
  GamesStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  cellContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    justifyContent: "center",
  },
  cell: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    margin: 5,
    backgroundColor: "#444",
    borderRadius: 10,
  },
  Text_x: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ff4757", // Red for X
  },
  Text_o: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#1e90ff", // Blue for O
  },
  turnText: {
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
  },
  winText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2ecc71", // Green for winner announcement
    marginTop: 20,
    textShadowColor: "rgba(0, 255, 0, 0.5)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
  },
  drawText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#f1c40f", // Yellow for Draw
    marginTop: 20,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  resetText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
    textAlign: "center",
  }
  
});
