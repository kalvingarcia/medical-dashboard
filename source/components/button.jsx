import React, { cloneElement } from "react";
import {createUseStyles} from "react-jss";

import useRippleEffect from '../hooks/ripple';

const useStyles = createUseStyles((theme) => ({
    button: {
        outline: "none",
        border: "none",

        minWidth: "fit-content",
        minHeight: "fit-content",
        minWidth: "fit-content",
        maxWidth: "fit-content",
        position: "relative",
        overflow: "hidden",
        clipPath: "inset(0 0 0 0 round 2000px)",
        borderRadius: "2000px",
        padding: "11px 16px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "9px",

        backgroundColor: ({filled}) => filled? theme.button : "transparent",
        color: theme.text,
        fontSize: "14px",
        fontWeight: "bold",

        transition: "background-color 300ms ease-in-out, color 300ms ease-in-out, border-color 300ms ease-in-out",

        "&::after": {
            content: "''",
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
            opacity: 0,
            transition: "opacity 300ms ease-in-out",

            backgroundColor: theme.text
        },
        "&:hover": {
            "&::after": {
                opacity: 0.3
            }
        },
        "& .ripple": {
            backgroundColor: theme.text
        }
    }
}));

export default function Button({icon, filled = false, onPress, children}) {
    const [rippleExpand, rippleFade] = useRippleEffect();
    const styles = useStyles({filled});

    return (
        <button className={styles.button} onMouseDown={rippleExpand} onMouseUp={rippleFade} onClick={onPress}>
            {icon? cloneElement(icon, {isInButton: true}) : ""}
            {children}
        </button>
    );
}