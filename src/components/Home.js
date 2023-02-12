import React, { useEffect, useState } from "react";
import { Box, Button, Image, Grid, Input, Label, Text } from "theme-ui";
import { CSSTransition } from "react-transition-group";
import Sidebar from "./Sidebar";

function Home() {
  const [showButton, setShowButton] = useState(true);
  const [m, setM] = useState(0);
  const [n, setN] = useState(0);
  const [product, setProduct] = useState(0);
  const [grid, setGrid] = useState([]);
  const [addHome, setAddHome] = useState(Array(grid.length).fill(false));
  const [cursorUrl, setCursorUrl] = React.useState("../Home_Icon.svg");

  useEffect(() => {
    let gridArray = [];
    for (let i = 0; i < product; i++) {
      gridArray.push(
        <div
          key={i}
          style={{
            padding: "10px",
            color: "black",
          }}
        >
          {i + 1}
        </div>
      );
    }
    setGrid(gridArray);

    setAddHome(Array(gridArray.length).fill(false));
  }, [product, m, n]);

  const handleClick = (index) => {
    const updatedAddHome = [...addHome];
    updatedAddHome[index] = getIcon();
    setAddHome(updatedAddHome);
  };
  console.log(addHome);

  const getIcon = () => {
    switch (cursorUrl) {
      case "../Home_Icon.svg":
        return "Home";
      case "../Hospital_Icon.svg":
        return "Hospital";
      case "../Restaurant_Icon.svg":
        return "Restaurant";
      case "../Gym_Icon.svg":
        return "Gym";

      default:
        return false;
    }
  };
  const getImgUrl = (index) => {
    switch(addHome[index]) {
      case 'Restaurant':
        return "../Restaurant_Icon.svg";
      case 'Hospital':
        return "../Hospital_Icon.svg";
      case 'Gym':
        return "../Gym_Icon.svg";
      case 'Home':
        return "../Home_Icon.svg";
      default:
        return false;
    }
  };
  

  return (
    <Grid columns={!showButton ? [2, "1fr 3fr"] : 1}>
      {!showButton && <Sidebar setCursorUrl={setCursorUrl} />}
      <Box>
        {!showButton && (
          <Text
            variant="text.subHeader"
            sx={{
              paddingBottom: [1, 2, 3, 4],
              paddingTop: [1, 2, 3, 4],
              color: "navy",
              fontFamily: "roboto",
            }}
          >
            Define Layout
          </Text>
        )}

        <CSSTransition
          in={showButton}
          timeout={300}
          classNames="move-down"
          unmountOnExit
        >
          <Button
            sx={{ variant: "buttons.primary" }}
            onClick={() => {
              setShowButton(false);
            }}
          >
            Create Layout
          </Button>
        </CSSTransition>
        <CSSTransition
          in={!showButton}
          timeout={300}
          classNames="move-up"
          mountOnEnter
        >
          <Box
            sx={{
              mt: 20,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid columns={2} sx={{ width: "80%", margin: "0 auto" }}>
              <Box>
                <Label htmlFor="m">Height</Label>
                <Input
                  name="m"
                  id="m"
                  mb={3}
                  onChange={(e) => setM(e.target.value)}
                />
              </Box>
              <Box>
                <Label htmlFor="n">Width</Label>
                <Input
                  name="n"
                  id="n"
                  mb={3}
                  onChange={(e) => setN(e.target.value)}
                />
              </Box>
            </Grid>
            <Button
              sx={{ variant: "buttons.primary", mb: 3 }}
              onClick={() => setProduct(m * n)}
            >
              Create
            </Button>
            <Grid columns={+n} gap={3} sx={{ width: "80%", margin: "0 auto" }}>
              {grid.map((boxes, index) => (
                <button
                  key={index}
                  style={{
                    backgroundColor: addHome[index] ? "green" : "white",
                    cursor: `url(${cursorUrl}),auto`,
                  }}
                  onClick={() => handleClick(index)}
                >
                  {addHome[index] ? (
                    <Image
                      src={getImgUrl(index)}
                      alt="icon"
                      sx={{ width: 30, height: 30, ml: 2 }}
                    />
                  ) : (
                    <Text>{boxes}</Text>
                  )}
                </button>
              ))}
            </Grid>
          </Box>
        </CSSTransition>
        <Image
          src="../newhouse.gif"
          alt="House"
          sx={{ height: [250, 350, 450, 550], flex: 1 }}
          hidden={!showButton}
        />
      </Box>
    </Grid>
  );
}

export default Home;
