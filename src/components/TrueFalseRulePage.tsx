import React, { useState } from 'react';
import {checkmarkDoneCircle} from 'ionicons/icons';
import { IonNavLink, IonHeader, IonTitle, IonToolbar, IonContent, IonButtons, IonButton, IonBackButton, IonRadioGroup, IonRadio, IonItem, IonIcon, useIonAlert, useIonToast  } from '@ionic/react';
import { chevronForward } from 'ionicons/icons';
import signImg from "../json/signPath.json";
import TrueFalseRuleResultPage from './TrueFalseRuleResultPage';
import { AdMob } from '@capacitor-community/admob';

function TrueFalseRulePage() {
  const [dataCounts] = useState(signImg.dataCounts);
  const [selectedValue, setSelectedValue] = useState('0');
  const [problemNum, setProblemNum] = useState(1);
  const [chooseValues] = useState<string[]>([]);
  const zeroPad = (num: number, places: number) => {
    return String(num).padStart(places, '0');
  };

  // generate a random array of 2 numbers, ranging from 0 to 'count', 'exist' must exist in array
  const generateRandomArray = (count: number, exist: number) => {
    let array = Array.from({length: count}, (_, i) => i + 1);
    const existIndex = array.indexOf(exist);
    array.splice(existIndex, 1);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    array.splice(Math.floor(Math.random() * 3), 0, exist);
    return array.slice(0, 2);
  }

  const generateTrueFalseProblem = () => {
    let result = [];
    
    for(let i = 1; i <= dataCounts; i++){
      
      let choiceArray = generateRandomArray(dataCounts, i);
      const json = {
        sn: i,
        signPath: window.location.origin + "/../images/sign/" + zeroPad(i, 3) + '.png',
        descPath: window.location.origin + "/../images/sign/" + zeroPad(choiceArray[0], 3) + 'w.png',
        rightAns: choiceArray[0] === i ? 'True' : 'False'
      }
      result.push(json);
    }
    return result;
  }

  const [problems] = useState(generateTrueFalseProblem());
  const [presentToast] = useIonToast();
  const [presentAlert] = useIonAlert();

  const showToast = () => {
    presentToast({
      message: 'ကျေးဇူးပြု၍ အဖြေရွေးပါ',
      duration: 1000,
      position: 'bottom'
    });
  };

  const showFinishAlert = (header: string, subHeader: string, message: string, buttonText: string) => {
    presentAlert({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: buttonText,
          role: 'confirm',
          handler: () => {
            setSelectedValue('0');
            setProblemNum(1);
            localStorage.setItem('trueFalseRuleProblems',JSON.stringify(problems));
            localStorage.setItem('userTrueFalseRuleValues',chooseValues.toString());
            chooseValues.splice(0);
            const navLink = document.querySelector('#goToTrueFalseRuleResultPage');
            (navLink as HTMLElement).click();
          },
        }
      ],
      backdropDismiss: false,
    });
  };

  const onNextButtonClick = () => {
    if(selectedValue === '0'){
      showToast();
      return;
    }
    chooseValues.push(selectedValue);
    if(problemNum>=dataCounts){
      showFinishAlert("Test Finish!", "", "", "View Result")
      return;
    }
    setSelectedValue('0'); 
    setProblemNum(problemNum+1);
  }

  const onBackButtonClick = () => {
    if(localStorage.getItem('isAdsFree') === 'true'){
      return;
    }
    AdMob.resumeBanner();
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
        <IonButtons onClick={onBackButtonClick} slot="start">
            <IonBackButton></IonBackButton>
        </IonButtons>
        <IonTitle>
          <IonIcon icon={checkmarkDoneCircle} />&nbsp;&nbsp;True/False Rule
        </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center">
        <h3>{problemNum}/{dataCounts} </h3>
        <IonRadioGroup class='content-center' value={selectedValue} onIonChange={(e) => setSelectedValue(e.detail.value)}>
          <IonItem color="transparent" lines="none">
            <img src={problems[problemNum-1].signPath} className="center round-border-img" style={{width: '65%'}}/>
          </IonItem><br></br>
          <IonItem color="transparent" class="center" lines="none">
            <img src={problems[problemNum-1].descPath} style={{width: '90%'}}/>
          </IonItem><br></br>
          <IonItem color="transparent" class="center ion-item-border" lines="none">           
            <h5 className="center">မှန်</h5>
            <IonRadio slot="end" mode="md" value="True"></IonRadio>
          </IonItem><br></br>
          <IonItem color="transparent" class="center ion-item-border" lines="none">
            <h5 className="center">မှား</h5>
            <IonRadio slot="end" mode="md" value="False"></IonRadio>
          </IonItem><br></br>
        </IonRadioGroup><br></br>
        <IonButton shape='round' color="light" onClick={ () => onNextButtonClick() }>
          <IonIcon icon={chevronForward} />
        </IonButton>
        <IonNavLink id='goToTrueFalseRuleResultPage' routerDirection="forward" component={() => <TrueFalseRuleResultPage />}>
        </IonNavLink>
      </IonContent>
    </>
  );
}
export default TrueFalseRulePage;