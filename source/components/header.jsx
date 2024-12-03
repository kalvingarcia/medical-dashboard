import React from 'react';
import {createUseStyles} from 'react-jss';
import parse from 'html-react-parser';

import Button from './button';
import Icon from './icon';

import logo from '../assets/images/logo.svg';
import doctor from '../assets/images/doctor.png';

const useStyles = createUseStyles((theme) => ({
    header: {
        margin: "18px",
        width: "calc(100% - 2 * 18px)",
        height: "72px",
        display: "flex",
        alignContent: "center",
        justifyContent: "space-between",
        borderRadius: "2000px",
        backgroundColor: theme.background
    },
    logo: {
        padding: "12px",
        marginLeft: "20px",
        height: "100%",
        "& svg": {
            height: "100%"
        }
    },
    navigation: {
        display: "flex",
        gap: "8px",
        "& > *": {
            alignSelf: "center"
        }
    },
    profile: {
        padding: "12px",
        display: "flex",
        alignItems: "center",
        gap: "8px",

        "& .picture": {
            height: "44px",
            width: "44px",
            objectFit: "contain",

            "& img": {
                width: "100%"
            }
        },
        "& .information": {
            display: "flex",
            flexDirection: "column",

            "& .name": {
                fontWeight: "bold"
            },
            "& .title": {
                opacity: 0.5
            }
        },
        "& .divider": {
            marginLeft: "5px",
            marginRight: "5px",
            width: "1pt",
            height: "100%",
            backgroundColor: theme.text,
            opacity: 0.25
        }
    }
}));

export default function Header({}) {
    const styles = useStyles();
    return (
        <header className={styles.header}>
            <div className={styles.logo}>{parse(logo)}</div>
            <div className={styles.navigation}>
                <Button icon={<Icon icon="home" />}>Overview</Button>
                <Button icon={<Icon icon="group" />} filled>Patients</Button>
                <Button icon={<Icon icon="calendar" />}>Schedule</Button>
                <Button icon={<Icon icon="chat" />}>Message</Button>
                <Button icon={<Icon icon="card" />}>Transactions</Button>
            </div>
            <div className={styles.profile}>
                <div className="picture">
                    <img src={doctor} />
                </div>
                <div className="information">
                    <span className="name">Dr. Jose Simmons</span>
                    <span className="title">General Practitioner</span>
                </div>
                <div className="divider" />
                <Icon icon="settings" button />
            </div>
        </header>
    );
}