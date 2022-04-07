import React, { StrictMode } from "react";
import { render } from "react-dom";
import ThemeProvider from "@mui/system/ThemeProvider";
import createTheme from "@mui/system/createTheme";
import DragAndDrop from "./Cases/DragAndDrop";

const rootElement = document.querySelector("#root") as HTMLElement;


const theme = createTheme({
    components: {
        paper: { variant: 'outined', elevation: 2 },
        MyThemeComponent: {
            styleOverrides: {
                root: {
                    color: 'darkslategray',
                },
                primary: {
                    color: 'darkblue',
                },
                secondary: {
                    color: 'darkred',
                    backgroundColor: 'pink',
                },
            },
            variants: [
                {
                    props: { variant: 'dashed', color: 'primary' },
                    style: {
                        border: '1px dashed darkblue',
                    },
                },
                {
                    props: { variant: 'dashed', color: 'secondary' },
                    style: {
                        border: '1px dashed darkred',
                    },
                },
            ],
        },
    },
});

render(
    <StrictMode>
        <ThemeProvider theme={theme} >
            <DragAndDrop />
        </ThemeProvider>
    </StrictMode >, rootElement
)