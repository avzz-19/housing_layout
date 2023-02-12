import React from "react";
import { Button, Flex, Image, Text } from "theme-ui";

function Sidebar({ setCursorUrl }) {
  return (
    <Flex
      sx={{
        backgroundColor: "navy",
        padding: 20,
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 10,
        height: "100vh",
        borderTopRightRadius: 25,
      }}
    >
      <Button
        onClick={() => {
          setCursorUrl("../Home_Icon.svg");
        }}
        sx={{ "&:hover": { backgroundColor: "lightGreen" } }}
      >
        <Image
          src="../Home_Icon.svg"
          alt="icon"
          sx={{ width: 30, height: 30, mr: 2 }}
        />
        <Text variant="text.h1" sx={{ color: "navy" }}>
          Add Home
        </Text>
      </Button>
      <Text variant="text.subHeader" sx={{ color: "white" }}>
        Add Services
      </Text>
      <Button
        onClick={() => {
          setCursorUrl("../Hospital_Icon.svg");
        }}
        sx={{ "&:hover": { backgroundColor: "lightGreen" } }}
      >
        <Image
          src="../Hospital_Icon.svg"
          alt="icon"
          sx={{ width: 30, height: 30, mr: 2 }}
        />
        <Text variant="text.h1">Hospital</Text>
      </Button>
      <Button
        sx={{ "&:hover": { backgroundColor: "lightGreen" } }}
        onClick={() => {
          setCursorUrl("../Restaurant_Icon.svg");
        }}
      >
        <Image
          src="../Restaurant_Icon.svg"
          alt="icon"
          sx={{ width: 30, height: 30, mr: 2 }}
        />
        <Text variant="text.h1">Restaurant</Text>
      </Button>
      <Button
        onClick={() => {
          setCursorUrl("../Gym_Icon.svg");
        }}
        sx={{ "&:hover": { backgroundColor: "lightGreen" } }}
      >
        <Image
          src="../Gym_Icon.svg"
          alt="icon"
          sx={{ width: 30, height: 30, mr: 2 }}
        />
        <Text variant="text.h1">Gym</Text>
      </Button>
    </Flex>
  );
}

export default Sidebar;
