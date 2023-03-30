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

function TrueFalseRuleResultPage() {
    const [dataCounts] = useState(signImg.dataCounts);
    const [problems] = useState(JSON.parse(localStorage.getItem('trueFalseRuleProblems') || '{}'));
    const [chooseValues] = useState((localStorage.getItem('userTrueFalseRuleValues')  || '{}').split(','));

    const getTotalScore = () => {
        let score = 0;
        let n = 0;
        for (var problem of problems) {
            if(problem.rightAns == chooseValues[n]){
                score += 1;
            }
            n += 1;
          }
        return score;
    }

    const showRightAnswer = (i:number) => {
        if(problems[i].rightAns !== chooseValues[i]){                                
            return <h5 style={{color: 'red'}}>Right Answer: {problems[i].rightAns}</h5>
        }
        return <p></p>
    }

    const showResultIcon = (i:number) => {
        if(problems[i].rightAns === chooseValues[i]){                                
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
                {Array.from({length: dataCounts}, (_, i) => (
                    <div key={i}>
                        <IonCard>
                            <h4>{i+1}/{dataCounts}</h4>                  
                            <IonItem color="transparent" lines="none">
                                <img src={problems[i].signPath} className="center round-border-img" style={{width: '65%'}}/>
                            </IonItem><br></br>
                            <IonItem color="transparent" class="center" lines="none" >
                                <img src={problems[i].descPath} style={{width: '90%'}}/>
                            </IonItem><br></br>
                            <h5>Your Answer: {chooseValues[i]} {showResultIcon(i)}</h5>
                            {showRightAnswer(i)}
                        </IonCard>
                    </div>
                ))}
            </IonContent>
        </>
    );
}
export default TrueFalseRuleResultPage;