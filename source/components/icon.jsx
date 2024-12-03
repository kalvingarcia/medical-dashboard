import React from "react"
import {createUseStyles} from "react-jss"

const useStyles = createUseStyles((theme) => ({
    icon: {
        position: "relative",
        fontSize: ({isInButton}) => isInButton? 24 : 30,
        color: theme.text,

        fontFamily: "icons",
        fontWeight: "normal",
        fontStyle: "normal",
        display: "inline-block",
        lineHeight: 1,
        textTransform: "none",
        letterSpacing: "normal",
        wordWrap: "normal",
        whiteSpace: "nowrap",
        direction: "ltr",

        WebkitFontSmoothing: "antialiased",
        textRendering: "optimizeLegibility",
        MosOsxFontSmoothing: "grayscale",
        fontFeatureSettings: "'liga'"
    }
}));

export default function Icon({icon, isInButton = false}) {
    const styles = useStyles({isInButton});
    return (
        <i className={styles.icon}>{icon}</i>
    )
}