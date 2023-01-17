import React, { useState } from 'react';
import { useIonRouter } from '@ionic/react';
import { IonHeader, IonTitle, IonToolbar, IonContent, IonButtons, IonButton, IonBackButton, IonRadioGroup, IonRadio, IonItem, useIonAlert, useIonToast  } from '@ionic/react';
import signImg from "../json/signPath.json";

function MultiChoiceSignPage() {
  const router = useIonRouter();
  const [dataCounts] = useState(signImg.dataCounts);
  const [selectedValue, setSelectedValue] = useState('0');
  const [score, setScore] = useState(0);
  const [problemNum, setProblemNum] = useState(1);
  const zeroPad = (num: number, places: number) => {
    return String(num).padStart(places, '0');
  };

  const generateRandomArray = (count: number, exist: number) => {
    let array = Array.from({length: count}, (_, i) => i + 1);
    const existIndex = array.indexOf(exist);
    array.splice(existIndex, 1);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    array.splice(Math.floor(Math.random() * 3), 0, exist);
    return array.slice(0, 4);
  }

  const generateChoiceProblem = () => {
    let result = [];
    
    for(let i = 1; i <= dataCounts; i++){
      
      let choiceArray = generateRandomArray(dataCounts, i);
      const json = {
        sn: i,
        signPath: window.location.origin + "/../images/sign/" + zeroPad(i, 3) + '.png',
        choice1Path: window.location.origin + "/../images/sign/" + zeroPad(choiceArray[0], 3) + 'w.png',
        choice2Path: window.location.origin + "/../images/sign/" + zeroPad(choiceArray[1], 3) + 'w.png',
        choice3Path: window.location.origin + "/../images/sign/" + zeroPad(choiceArray[2], 3) + 'w.png',
        choice4Path: window.location.origin + "/../images/sign/" + zeroPad(choiceArray[3], 3) + 'w.png',
        rightAns: choiceArray.indexOf(i) + 1
      }
      result.push(json);
    }
    return result;
  }

  const [problems] = useState(generateChoiceProblem());
  const [presentToast] = useIonToast();
  const [presentAlert] = useIonAlert();

  const showToast = () => {
    presentToast({
      message: 'ကျေးဇူးပြု၍ အဖြေရွေးပါ',
      duration: 1000,
      position: 'bottom'
    });
  };

  const nextHandler = () => {    
    setSelectedValue('0');
    if(problemNum==dataCounts){
      alert('ပြီးဆုံးပါပြီ'+' '+'စုစုပေါင်းရမှတ်: ' + score+' ');
      router.push('/mockTestpage');
      console.log('finish')
      return;
    }
    setProblemNum(problemNum+1);
  }

  const showAlert = (header: string, subHeader: string, message: string, buttonText: string) => {
    presentAlert({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: [
        {
          text: buttonText,
          role: 'confirm',
          handler: () => {
            nextHandler();
          },
        }
      ],
      backdropDismiss: false,
    });
  };

  const onOkButtonClick = () => {
    if(selectedValue == '0'){
      showToast();
      return;
    }    
    let headerMessage = 'မှားသည်';
    let subHeaderMessage = 'အဖြေမှန်: ' + problems[problemNum-1].rightAns;    
    let scoreMessage = 'ရမှတ်: ' + score;
    if(selectedValue == String(problems[problemNum-1].rightAns)){
      setScore(score + 1);
      headerMessage = 'မှန်သည်';
      subHeaderMessage = '';
      scoreMessage = 'ရမှတ်: ' + (score+1);
    }
    showAlert(headerMessage,subHeaderMessage,scoreMessage,'နောက်သို့');
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton></IonBackButton>
        </IonButtons>
        <IonTitle>Choice Sign</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <h3>No. {zeroPad(problemNum,3)} </h3>
        <IonRadioGroup class='content-center' value={selectedValue} onIonChange={(e) => setSelectedValue(e.detail.value)}>
          <IonItem color="transparent" lines="none">
            <img src={problems[problemNum-1].signPath} className="center round-border-img" style={{width: '65%'}}/>
          </IonItem><br></br>
          <IonItem color="transparent" class="center ion-item-border" lines="none" style={{width: '80%'}}>
            <img src={problems[problemNum-1].choice1Path}/>
            <IonRadio slot="end" mode="md" value="1"></IonRadio>
          </IonItem><br></br>
          <IonItem color="transparent" class="center ion-item-border" lines="none" style={{width: '80%'}}>
            <img src={problems[problemNum-1].choice2Path}/>
            <IonRadio slot="end" mode="md" value="2"></IonRadio>
          </IonItem><br></br>
          <IonItem color="transparent" class="center ion-item-border" lines="none" style={{width: '80%'}}>
            <img src={problems[problemNum-1].choice3Path}/>
            <IonRadio slot="end" mode="md" value="3"></IonRadio>
          </IonItem><br></br>
          <IonItem color="transparent" class="center ion-item-border" lines="none" style={{width: '80%'}}>
            <img src={problems[problemNum-1].choice4Path}/>
            <IonRadio slot="end" mode="md" value="4"></IonRadio>
          </IonItem>
        </IonRadioGroup><br></br>
        <IonButton shape='round' color="dark" onClick={ () => onOkButtonClick() }>အိုကေ</IonButton>
      </IonContent>
    </>
  );
}
export default MultiChoiceSignPage;