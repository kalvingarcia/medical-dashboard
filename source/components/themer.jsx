import React from "react";
import {ThemeProvider} from "react-jss";

const theme = {
    text: "#072635",
    button: "#01F0D0",
    active: "#D8FCF7",
    background: "#FFFFFF",
    tooltip: "#D8FCF7",
    systolic: "#E66FD2",
    diastolic: "#8C6FE6"
}

export default function Themer({children}) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}