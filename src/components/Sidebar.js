import React from "react";
import { Button, Flex, Image, Text } from "theme-ui";

function Sidebar({ setCursorUrl }) {
  return (
    <Flex sx={styles.container}>
      <Button
        onClick={() => {
          setCursorUrl("../Home_Icon.svg");
        }}
        sx={{
          "&:hover": { backgroundColor: "lightGreen" },
        }}
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
        sx={{
          "&:hover": { backgroundColor: "lightGreen" },
        }}
      >
        <Image
          src="../Hospital_Icon.svg"
          alt="icon"
          sx={{ width: 30, height: 30, mr: 2 }}
        />
        <Text variant="text.h1">Hospital</Text>
      </Button>
      <Button
        sx={{
          "&:hover": { backgroundColor: "lightGreen" },
        }}
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
      {/* <Button sx={styles.button}>Recommend best house</Button> */}
    </Flex>
  );
}

export default Sidebar;

const styles = {
  button: {
    "&:hover": { backgroundColor: "lightGreen" },
    backgroundColor: "green",
    color: "white",
    position: "absolute",
    bottom: 40,
    padding: 10,
    fontSize: [12, 14, 18, 22],
    fontWeight: "600",
  },
  container: {
    backgroundColor: "navy",
    padding: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    height: "100vh",
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
};
