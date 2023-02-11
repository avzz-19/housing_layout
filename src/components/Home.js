import React, { useState } from "react";
import { Box, Button, Image } from "theme-ui";
import { CSSTransition } from "react-transition-group";

function Home() {
  const [showButton, setShowButton] = useState(true);
  return (
    <div>
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
        <Box sx={{ mt: 80 }}>
          <Button sx={{ variant: "buttons.primary" }}>Create</Button>
        </Box>
      </CSSTransition>
      <Image
        src="../House_Img.svg"
        alt="House"
        sx={{ height: [250, 350, 450, 550], flex: 1 }}
        hidden={!showButton}
      />
    </div>
  );
}

export default Home;
