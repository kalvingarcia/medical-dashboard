import React, { useEffect, useState } from "react";
import {createUseStyles, useTheme} from "react-jss";
import {Chart} from "chart.js/auto";

const useStyles = createUseStyles((theme) => ({
    diagnosisHistory: {
        width: "766px",
        backgroundColor: theme.background
    },
    chart: {

    }
}));

function BloodPressure({pressureList}) {
    const theme = useTheme();
    const [datapoints, setDatapoints] = useState(6);
    const [context, setContext] = useState(undefined);
    useEffect(() => {
        if(context && pressureList.length > 0) {
            const chart = new Chart(context, {
                type: "line",
                data: {
                    labels: pressureList.reduce((monthList, {date}) => {
                        monthList.push(date);
                        return monthList;
                    }, []).slice(0, datapoints).reverse(),
                    datasets: [
                        {
                            label: "Systolic",
                            data: pressureList.reduce((systolicList, {blood_pressure}) => {
                                systolicList.push(blood_pressure.systolic.value);
                                return systolicList;
                            }, []).slice(0, datapoints).reverse(),
                            fill: false,
                            borderColor: theme.systolic,
                            backgroundColor: theme.systolic,
                        },
                        {
                            label: "Diastolic",
                            data: pressureList.reduce((diastolicList, {blood_pressure}) => {
                                diastolicList.push(blood_pressure.diastolic.value);
                                return diastolicList;
                            }, []).slice(0, datapoints).reverse(),
                            fill: false,
                            borderColor: theme.diastolic,
                            backgroundColor: theme.diastolic
                        }
                    ]
                },
                options: {
                    elements: {
                        point: {
                            pointStyle: "circle",
                            radius: 7,
                            
                        },
                        line: {
                            tension: 0.5
                        }
                    },
                    scales: {
                        x: {
                            drawTicks: false
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            titleColor: theme.text,
                            titleFont: {
                                family: "manrope",
                                size: 12
                            },
                            bodyColor: theme.text,
                            bodyFont: {
                                family: "manrope",
                                size: 12
                            },
                            backgroundColor: theme.active,
                            padding: 10,
                            caretSize: 0,
                            displayColors: false,
                        }
                    }
                }
            });

            return () => chart.destroy();
        }
    }, [context, pressureList]);

    const styles = useStyles();
    return (
        <div>
            <div className={styles.chart}>
                <div>
                    <span>Blood Pressure</span>
                    {/* <DropdownMenu /> */}
                </div>
                <canvas ref={element => setContext(element)}></canvas>
            </div>
            <div className={styles.values}>

            </div>
        </div>
    );
}

export default function DiagnosticHistory({diagnosticData}) {
    const pressureList = diagnosticData.reduce((filteredObjects, {month, year, blood_pressure}) => {
        filteredObjects.push({date: `${month.substr(0, 3)}, ${year}`, blood_pressure});
        return filteredObjects;
    }, []);
    console.log(pressureList);

    const styles = useStyles();
    return (
        <section className={styles.diagnosisHistory}>
            <span>Diagnosis History</span>
            <div>
                <BloodPressure pressureList={pressureList} />
                <div>
                    {/* <RespiratoryRate />
                    <Temperature />
                    <HeartRate /> */}
                </div>
            </div>
        </section>
    );
}