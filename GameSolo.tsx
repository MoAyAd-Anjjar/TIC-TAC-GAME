import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { Audio } from "expo-av";
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

const GameSolo: React.FC = () => {
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

  useEffect(() => {
    const loadSounds = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("./assets/music.mp3")
      );
      setSound(sound);

      const { sound: clickSound } = await Audio.Sound.createAsync(
        require("./assets/Click.wav")
      );
      setClickSound(clickSound);

      const { sound: winSound } = await Audio.Sound.createAsync(
        require("./assets/win.wav")
      );
      setWinSound(winSound);

      const { sound: drawSound } = await Audio.Sound.createAsync(
        require("./assets/draw.mp3")
      );
      setDrawSound(drawSound);

      const { sound: resetSound } = await Audio.Sound.createAsync(
        require("./assets/reset.mp3")
      );
      setResetSound(resetSound);
    };
    
    loadSounds();
    return () => {
      sound?.unloadAsync();
      clickSound?.unloadAsync();
      winSound?.unloadAsync();
      drawSound?.unloadAsync();
      resetSound?.unloadAsync();
    };
  }, []);

  useEffect(() => {
    const checkWinner = () => {
      for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (Board[a] && Board[a] === Board[b] && Board[a] === Board[c]) {
          setWinner(Board[a]);
          winSound?.replayAsync();
          if (Board[a] === "X") setXWins((prev) => prev + 1);
          else setOWins((prev) => prev + 1);
          return;
        }
      }
      if (!Board.includes("")) {
        setWinner("Draw");
        drawSound?.replayAsync();
      }
    };
    checkWinner();
  }, [Board]);

  const playSound = async () => {
    if (sound) {
      await sound.playAsync();
      setIsPlaying(true);
    }
    sound?.setVolumeAsync(0.1);
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  const playClickSound = async () => {
    if (clickSound) {
      await clickSound.replayAsync();
    }
  };

  const UpdateBoard = (index: number) => {
    if (Board[index] !== "" || Winner) return;

    const newBoard = [...Board];
    newBoard[index] = Turn;
    setBoard(newBoard);
    setTurn(Turn === "X" ? "O" : "X");

    playClickSound();
  };

  return (
    <View style={AppStyle.GamesStyle}>
      <TouchableOpacity onPress={isPlaying ? stopSound : playSound}>
        <Text>{isPlaying ? "Stop Sound" : "Play Sound"}</Text>
      </TouchableOpacity>

      <Text style={AppStyle.title}>TicTac Game</Text>
      <Text style={AppStyle.scoreText}>X Wins: {XWins} | O Wins: {OWins}</Text>
      
      <View style={AppStyle.cellContainer}>
        {Board.map((cell, index) => (
          <TouchableOpacity
            disabled={cell !== "" || Winner !== null}
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

      <TouchableOpacity
        onPress={() => {
          setBoard(new Array(9).fill(""));
          setTurn("X");
          setWinner(null);
          resetSound?.replayAsync();
        }}
        style={AppStyle.resetButton}
      >
        <Text style={AppStyle.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GameSolo;
