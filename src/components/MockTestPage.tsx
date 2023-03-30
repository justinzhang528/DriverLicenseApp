import React, { useState } from 'react';
import {pencil,listCircle,checkmarkDoneCircle} from 'ionicons/icons';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonContent,
  IonNavLink,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonIcon
} from '@ionic/react';

import MultiChocieRulePage from './MultiChocieRulePage';
import MultiChoiceSignPage from './MultiChoiceSignPage';
import TrueFalseRulePage from './TrueFalseRulePage';
import TrueFalseSignPage from './TrueFalseSignPage';
import { AdMob, RewardAdOptions } from '@capacitor-community/admob';

function MockTestPage() {

  const showRewardVideo = async () => {
    if(localStorage.getItem('isAdsFree') === 'true'){
      return;
    }
    AdMob.hideBanner();
    const options: RewardAdOptions = {
      adId: 'ca-app-pub-3940256099942544/1712485313', // demo ad unit id
      isTesting: true,
    };
    await AdMob.prepareRewardVideoAd(options);
    await AdMob.showRewardVideoAd();
  };

  const reduceLife=()=>{
    let life = Number(localStorage.getItem('life'));
    if(life>0)
      life = life - 1;
    localStorage.setItem('life',String(life));
  }

  const onEnterMockTest=()=>{
    const life = Number(localStorage.getItem('life'));
    if(life<=0)
      showRewardVideo();
      
    reduceLife();
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>
            <IonIcon icon={pencil}></IonIcon>&nbsp;&nbsp;Mock Test
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonNavLink onClick={onEnterMockTest} routerDirection="forward" component={() => <MultiChocieRulePage />}>
          <IonItem button detail lines="none" class="ion-item-border">
              <IonIcon icon={listCircle}></IonIcon>&nbsp;&nbsp;
              <IonLabel>Multiple Chocie - Rule</IonLabel>
              {/* <img src="../../public/assets/imgs/word.png"/> */}
          </IonItem>
        </IonNavLink><br></br>
        <IonNavLink onClick={onEnterMockTest} routerDirection="forward" component={() => <MultiChoiceSignPage />}>
          <IonItem button detail lines="none" class="ion-item-border">
            <IonIcon icon={listCircle}></IonIcon>&nbsp;&nbsp;
            <IonLabel>Multiple Chocie - Sign</IonLabel>
            {/* <img src="../../public/assets/imgs/word.png"/> */}
          </IonItem>
        </IonNavLink><br></br>
        <IonNavLink onClick={onEnterMockTest} routerDirection="forward" component={() => <TrueFalseRulePage />}>
          <IonItem button detail lines="none" class="ion-item-border">
            <IonIcon icon={checkmarkDoneCircle}></IonIcon>&nbsp;&nbsp;
              <IonLabel>True/False - Rule</IonLabel>  
            {/* <img src="../../public/assets/imgs/word.png"/> */}
          </IonItem>
        </IonNavLink><br></br>
        <IonNavLink onClick={onEnterMockTest} routerDirection="forward" component={() => <TrueFalseSignPage />}>
          <IonItem button detail lines="none" class="ion-item-border">
            <IonIcon icon={checkmarkDoneCircle}></IonIcon>&nbsp;&nbsp;
            <IonLabel>True/False - Sign</IonLabel>
            {/* <img src="../../public/assets/imgs/word.png"/> */}
          </IonItem>
        </IonNavLink>
      </IonContent>
    </>
  );
}

export default MockTestPage;