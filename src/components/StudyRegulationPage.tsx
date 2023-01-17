import React, { useState } from 'react';
import {newspaper,accessibility} from 'ionicons/icons';
import signImg from "../json/signPath.json";
import {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonCard,
    IonButtons,
    IonBackButton,
    IonIcon
} from '@ionic/react';

function StudyRegulationPage() {
    const [dataCounts] = useState(signImg.dataCounts);
    const zeroPad = (num: number, places: number) => {
        return String(num).padStart(places, '0');
    };
    const getImgPath = (name: string) => {
        return window.location.origin + "/../images/sign/" + name + ".png";
    }
    return (
        <>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton></IonBackButton>
                </IonButtons>
                <IonTitle>
                    <IonIcon icon={newspaper}></IonIcon>&nbsp;&nbsp;Study Regulations
                </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {Array.from({length: dataCounts}, (_, i) => (
                    <div className="ion-text-center" key={i}>
                        <IonCard>          
                            <h4>No. {zeroPad(i+1,3)}</h4>
                            <img src={getImgPath(zeroPad(i+1,3))} style={{width: '50%'}}></img>
                            <img src={getImgPath(zeroPad(i+1,3) + 'w')} style={{width: '75%'}}></img>
                        </IonCard>
                    </div>
                ))}
            </IonContent>
        </>
    );
}
export default StudyRegulationPage;