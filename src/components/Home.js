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
        <div key={i} style={styles.element}>
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
  const findBestHome = (addHome) => {
    let bestHome = [0, 0];
    let minDist = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < addHome.length; i++) {
      for (let j = 0; j < addHome[0].length; j++) {
        if (addHome[i][j] === "Home") {
          let dist = Math.min(
            getDist(addHome, i, j, "Gym"),
            getDist(addHome, i, j, "Hospital"),
            getDist(addHome, i, j, "Restaurant")
          );
          if (dist < minDist) {
            minDist = dist;
            bestHome = [i, j];
          }
        }
      }
    }
    return bestHome;
  };

  const getDist = (addHome, i, j, facility) => {
    let dist = Number.MAX_SAFE_INTEGER;
    for (let row = 0; row < addHome.length; row++) {
      for (let col = 0; col < addHome[0].length; col++) {
        if (addHome[row][col] === facility) {
          dist = Math.min(dist, getManhattanDist(i, j, row, col));
        }
      }
    }
    return dist;
  };

  const getManhattanDist = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  };

  console.log(findBestHome(addHome));

  const handleRecommendationClick = (bestHome) => {
    const [rowIndex, colIndex] = bestHome;
    const updatedMatrix = [...addHome];
    updatedMatrix[rowIndex][colIndex] = "Best Home";
    setAddHome(updatedMatrix);
  };

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
      case "Best Home":
        return "../Best_Home.svg";
      default:
        return null;
    }
  };

  return (
    <Grid columns={!showButton ? [2, "1fr 3fr"] : 1}>
      {!showButton && <Sidebar setCursorUrl={setCursorUrl} />}
      <Box>
        {!showButton && (
          <Text variant="text.subHeader" sx={styles.heading}>
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
          <Box sx={styles.container}>
            <Grid columns={2} sx={styles.grid}>
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
            <Button
              sx={{ variant: "buttons.primary", mb: 3, ml: 3 }}
              onClick={() => handleRecommendationClick(findBestHome(addHome))}
              disabled={addHome.length === 0}
            >
              Recommend
            </Button>
            <Grid columns={n ? +n : 0} gap={3} sx={styles.grid}>
              {addHome &&
                addHome.length > 0 &&
                grid?.map((boxes, index) => (
                  <button
                    key={index}
                    style={{
                      backgroundColor: addHome[Math.floor(index / n)][index % n]
                        ? "mistyRose"
                        : "white",
                      border: "none",
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

const styles = {
  element: {
    padding: "10px",
    color: "black",
  },
  heading: {
    paddingBottom: [1, 2, 3, 4],
    paddingTop: [1, 2, 3, 4],
    color: "navy",
    fontFamily: "roboto",
  },
  container: {
    mt: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: { width: "80%", margin: "0 auto" },
};
