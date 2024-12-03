import React, { useCallback, useState } from 'react';
import {createRoot} from 'react-dom/client';
import {createUseStyles} from 'react-jss';

import Themer from './components/themer';
import Header from './components/header';
import Footer from './components/footer';

import icons from './assets/fonts/Icons.ttf';
import manrope from './assets/fonts/Manrope.ttf';
import PatientList from './components/patient-list';
import DiagnosticHistory from './components/diagnostic-history';

// Global Styles Creation
const useStyles = createUseStyles({
    content: {
        width: "100%",
        height: "1036px",
        padding: "18px",
        display: "flex"
    },
    '@global': {
        "@font-face": [
            {
                fontFamily: "icons",
                src: `url('${icons}')`
            },
            {
                fontFamily: "manrope",
                src: `url('${manrope}')`
            }
        ],
        "html, body": {
            margin: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden"
        },
        body: {
            backgroundColor: "#F6F7F8",
            fontFamily: "manrope",
            "& *": {
                boxSizing: "border-box",
                fontFamily: "manrope",
            }
        }
    }
});

function App() {
    // Global Styles Injected
    const styles = useStyles();

    const [diagnosticData, setDiagnosticData] = useState([]);
    const setPatientData = useCallback((entryData) => {
        setDiagnosticData(entryData.diagnosis_history);
    }, []);

    return (
        <Themer>
            <Header />
            <main className={styles.content}>
                <PatientList returnPatientData={setPatientData}/>
                <div>
                    <DiagnosticHistory diagnosticData={diagnosticData} />
                </div>
            </main>
            <Footer />
        </Themer>
    );
}

createRoot(document.getElementById("root")).render(<App />);