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
  const [addHome, setAddHome] = useState([]);
  const [cursorUrl, setCursorUrl] = React.useState("../Home_Icon.svg");

  useEffect(() => {
    let gridArray = [];
    if (m !== 0 && n !== 0) {
      setProduct(m * n);
    }
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
    if (product > 0) setGrid(gridArray);
    let matrix = [];
    if (m > 0 && n > 0)
      for (let i = 0; i < m; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
          row.push(0);
        }
        matrix.push(row);
      }
    setAddHome(matrix);
  }, [product, m, n]);

  const handleClick = (rowIndex, colIndex) => {
    const icon = getFacility();
    const updatedMatrix = [...addHome];
    updatedMatrix[rowIndex][colIndex] = icon;
    setAddHome(updatedMatrix);
  };

  console.log(addHome);

  const getFacility = () => {
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
        return 0;
    }
  };
  const getImgUrl = (row, col) => {
    switch (addHome[row][col]) {
      case "Restaurant":
        return "../Restaurant_Icon.svg";
      case "Hospital":
        return "../Hospital_Icon.svg";
      case "Gym":
        return "../Gym_Icon.svg";
      case "Home":
        return "../Home_Icon.svg";
      default:
        return null;
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
                <Input name="m" id="m" mb={3} type="number" />
              </Box>
              <Box>
                <Label htmlFor="n">Width</Label>
                <Input name="n" id="n" mb={3} type="number" />
              </Box>
            </Grid>
            <Button
              sx={{ variant: "buttons.primary", mb: 3 }}
              onClick={() => {
                setM(() => document.getElementById("m").value);
                setN(() => document.getElementById("n").value);
              }}
            >
              Create
            </Button>
            <Grid
              columns={n ? +n : 0}
              gap={3}
              sx={{ width: "80%", margin: "0 auto" }}
            >
              {addHome &&
                addHome.length > 0 &&
                grid?.map((boxes, index) => (
                  <button
                    key={index}
                    style={{
                      backgroundColor: addHome[Math.floor(index / n)][index % n]
                        ? "green"
                        : "white",
                      cursor: `url(${cursorUrl}),auto`,
                    }}
                    onClick={() =>
                      handleClick(Math.floor(index / n), index % n)
                    }
                  >
                    {addHome[Math.floor(index / n)][index % n] ? (
                      <Image
                        src={getImgUrl(Math.floor(index / n), index % n)}
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
