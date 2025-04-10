import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";
import io from "socket.io-client";
import AppStyle from "./Styel";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App: React.FC = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [clickSound, setClickSound] = useState<Audio.Sound | null>(null);
  const [winSound, setWinSound] = useState<Audio.Sound | null>(null);
  const [drawSound, setDrawSound] = useState<Audio.Sound | null>(null);
  const [resetSound, setResetSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [Board, setBoard] = useState<string[]>(new Array(9).fill(""));
  const [Turn, setTurn] = useState<"X" | "O">("X");
  const [Winner, setWinner] = useState<string | null>(null);
  const [XWins, setXWins] = useState(0);
  const [OWins, setOWins] = useState(0);

  const [socket, setSocket] = useState<any>(null);
  const [playerSymbol, setPlayerSymbol] = useState<"X" | "O" | null>(null);

  useEffect(() => {
    const socketConnection = io("http://192.168.1.113:3000"); // Point to your server address

    setSocket(socketConnection);

    // Listen for game state updates
    socketConnection.on(
      "updateBoard",
      (data: { board: string[]; turn: "X" | "O" }) => {
        setBoard(data.board);
        setTurn(data.turn);
      }
    );

    // Listen for the player assignment
    socketConnection.on("assign", (symbol: "X" | "O") => {
      setPlayerSymbol(symbol);
    });

    // Handle game full scenario
    socketConnection.on("full", () => {
      alert("Game is full! Try again later.");
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  useEffect(() => {
    const checkWinner = () => {
      for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (Board[a] && Board[a] === Board[b] && Board[a] === Board[c]) {
          setWinner(Board[a]);
          if (Board[a] === "X") setXWins((prev) => prev + 1);
          else setOWins((prev) => prev + 1);
          return;
        }
      }
      if (!Board.includes("")) {
        setWinner("Draw");
      }
    };
    checkWinner();
  }, [Board]);

  const playClickSound = async () => {
    if (clickSound) {
      await clickSound.replayAsync();
    }
  };

  const UpdateBoard = (index: number) => {
    if (Board[index] !== "" || Winner || playerSymbol !== Turn) return; // Prevent moves when it's not the player's turn

    const newBoard = [...Board];
    newBoard[index] = Turn;
    setBoard(newBoard);

    // Emit the move to the server
    socket.emit("makeMove", { index });

    playClickSound();
  };

  const resetGame = () => {
    setBoard(new Array(9).fill(""));
    setTurn("X");
    setWinner(null);

    // Emit reset to server
    socket.emit("reset");
  };

  return (
    <View style={AppStyle.GamesStyle}>
      <Text style={AppStyle.title}>TicTac Game</Text>
      <Text style={AppStyle.scoreText}>
        X Wins: {XWins} | O Wins: {OWins}
      </Text>

      <View style={AppStyle.cellContainer}>
        {Board.map((cell, index) => (
          <TouchableOpacity
            disabled={cell !== "" || Winner !== null || playerSymbol !== Turn} // Disable cell click if it's not player's turn
            onPress={() => UpdateBoard(index)}
            style={AppStyle.cell}
            key={index}
          >
            <Text style={cell === "X" ? AppStyle.Text_x : AppStyle.Text_o}>
              {cell}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {Winner && (
        <Text style={Winner === "Draw" ? AppStyle.drawText : AppStyle.winText}>
          {Winner === "Draw" ? "It's a Draw!" : `Winner: ${Winner} 🎉🎉🎉`}
        </Text>
      )}

      <TouchableOpacity onPress={resetGame} style={AppStyle.resetButton}>
        <Text style={AppStyle.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
