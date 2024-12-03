import React, {useCallback, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';

import Icon from './icon';
import useRippleEffect from '../hooks/ripple';

const useStyles = createUseStyles((theme) => ({
    patientList: {
        width: "367px",
        height: "100%",
        borderRadius: "16px",
        backgroundColor: theme.background,
        overflow: "hidden",
    },
    heading: {
        display: "flex",
        padding: "20px",
        alignItems: "center",
        justifyContent: "space-between",

        "& span": {
            fontWeight: "800",
            fontSize: "24px"
        }
    },
    list: {
        width: "100%",
        height: "calc(100% - 75px)",
        overflow: "auto",

        "& .patientEntry": {
            position: "relative",
            overflow: "hidden",
            clipPath: "inset(0 0 0 0)",
            width: "350px",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "12px",

            "&.active::before": {
                content: "''",
                width: "100%",
                height: "100%",
                position: "absolute",
                inset: 0,
                transition: "opacity 300ms ease-in-out",
    
                backgroundColor: theme.active,
            },
            "&::after": {
                content: "''",
                width: "100%",
                height: "100%",
                position: "absolute",
                inset: 0,
                opacity: 0,
                transition: "opacity 300ms ease-in-out",
    
                backgroundColor: theme.active
            },
            "&:hover": {
                "&::after": {
                    opacity: 0.3
                }
            },

            "& .picture": {
                position: "relative",
                width: "48px",
                height: "48px",
                objectFit: "contain",

                "& img": {
                    width: "100%"
                }
            },
            "& .information": {
                position: "relative",
                display: "flex",
                flexDirection: "column",

                "& .name": {
                    fontWeight: "bold",
                },
                "& .metadata": {
                    opacity: 0.5
                }
            },
            "& i": {
                marginLeft: "auto"
            },

            "& .ripple": {
                backgroundColor: theme.text
            }
        }
    }
}));

function EntrySkeleton() {
    return (
        <div className="patientEntry">
            <div className="picture" />
            <div className="information">

            </div>
            <Icon icon="more-horizontal" button />
        </div>
    );
}

function PatientEntry({entryData, active, onPress}) {
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [rippleExpand, rippleFade] = useRippleEffect();

    useEffect(() => {
        (async () => {
            setLoading(true);
            const imageURL = URL.createObjectURL(await fetch(entryData.profile_picture).then(response => response.blob()));
            setImage(imageURL);
            setLoading(false);
        })();
    }, [entryData.profile_picture]);
    
    return (loading?
        <EntrySkeleton />
        :
        <div className={["patientEntry", active? "active" : ""].join(" ")} onMouseDown={rippleExpand} onMouseUp={rippleFade} onClick={onPress}>
            <div className="picture">
                <img src={image} />
            </div>
            <div className="information">
                <span className="name">{entryData.name}</span>
                <span className="metadata">{entryData.gender}, {entryData.age}</span>
            </div>
            <Icon icon="more-horizontal" button />
        </div>
    );
}

export default function PatientList({returnPatientData}) {
    const [loading, setLoading] = useState(true);
    const [patientData, setPatientData] = useState([]);
    useEffect(() => {
        (async () => {
            setLoading(true);
            setPatientData(await fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
                method: "GET",
                headers: {"Authorization": `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`},
                redirect: "follow"
            }).then(response => response.json()).catch(error => console.log(error)?? []));
            setLoading(false);
        })();
    }, []);
    
    const [activePatient, setActivePatient] = useState(0);
    useEffect(() => {
        if(patientData.length > 0)
            returnPatientData(patientData[activePatient]);
    }, [loading]);
    
    const handlePatientClick = useCallback((entryData, patientNumber) => {
        setActivePatient(patientNumber);
        returnPatientData(entryData);
    }, [patientData]);
    
    const styles = useStyles();
    return (
        <section className={styles.patientList}>
            <div className={styles.heading}>
                <span>Patients</span>
                <Icon icon="search" button />
            </div>
            <div className={styles.list}>
                {patientData.map((entry, patientNumber) => (
                    <PatientEntry 
                        key={entry.phone_number}
                        entryData={entry}
                        active={activePatient === patientNumber}
                        onPress={() => handlePatientClick(entry, patientNumber)}
                    />
                ))}
            </div>
        </section>
    );
}