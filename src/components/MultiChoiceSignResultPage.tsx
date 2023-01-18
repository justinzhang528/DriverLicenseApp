import React, { useState } from 'react';
import {checkmark,close} from 'ionicons/icons';
import {flask} from 'ionicons/icons';
import signImg from "../json/signPath.json";
import {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonCard,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonItem
} from '@ionic/react';

function MultiChoiceSignResultPage() {
    const [dataCounts] = useState(signImg.dataCounts);
    const [choiceValues] = useState((localStorage.getItem('choiceValues')  || '{}').split(',').map(Number));
    const [problems] = useState(JSON.parse(localStorage.getItem('problems') || '{}'));
    console.log(choiceValues);
    console.log(problems);

    const zeroPad = (num: number, places: number) => {
        return String(num).padStart(places, '0');
    };

    const getImgPath = (name: string) => {
        return window.location.origin + "/../images/sign/" + name + ".png";
    }

    const getTotalScore = () => {
        let score = 0;
        let n = 0;
        for (var problem of problems) {
            if(problem.rightAns == choiceValues[n]){
                score += 1;
            }
            n += 1;
          }
        return score;
    }

    const showRightAnswer = (i:number) => {
        if(problems[i].rightAns != choiceValues[i]){                                
            return <h5 style={{color: 'red'}}>Right Answer: {problems[i].rightAns}</h5>
        }
        return <p></p>
    }

    const showResultIcon = (i:number) => {
        if(problems[i].rightAns === choiceValues[i]){                                
            return <IonIcon icon={checkmark} style={{color: 'green'}}/>
        }
        return <IonIcon icon={close} style={{color: 'red'}}/>
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton></IonBackButton>
                </IonButtons>
                <IonTitle>
                    <IonIcon icon={flask}></IonIcon>&nbsp;&nbsp;Result
                </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding ion-text-center">
                <h5>Total Score: {getTotalScore()}</h5>
                {Array.from({length: choiceValues.length}, (_, i) => (
                    <div key={i}>
                        <IonCard>
                            <h4>{i+1}/{choiceValues.length}</h4>                  
                            <IonItem color="transparent" lines="none">
                                <img src={problems[i].signPath} className="center round-border-img" style={{width: '65%'}}/>
                            </IonItem><br></br>
                            <IonItem color="transparent" class="center ion-item-border" lines="none" >
                                1.&nbsp;&nbsp;<img src={problems[i].choice1Path} style={{width: '90%'}}/>
                            </IonItem><br></br>
                            <IonItem color="transparent" class="center ion-item-border" lines="none" >
                                2.&nbsp;&nbsp;<img src={problems[i].choice2Path} style={{width: '90%'}}/>
                            </IonItem><br></br>
                            <IonItem color="transparent" class="center ion-item-border" lines="none" >
                                3.&nbsp;&nbsp;<img src={problems[i].choice3Path} style={{width: '90%'}}/>
                            </IonItem><br></br>
                            <IonItem color="transparent" class="center ion-item-border" lines="none" >
                                4.&nbsp;&nbsp;<img src={problems[i].choice4Path} style={{width: '90%'}}/>
                            </IonItem>
                            <h5>Your Answer: {choiceValues[i]} {showResultIcon(i)}</h5>
                            {showRightAnswer(i)}
                        </IonCard>
                    </div>
                ))}
            </IonContent>
        </>
    );
}
export default MultiChoiceSignResultPage;