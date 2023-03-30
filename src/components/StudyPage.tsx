import React from 'react';
import { book, accessibility, newspaper, star } from 'ionicons/icons';
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

import StudyRulePage from './StudyRulePage';
import StudySignPage from './StudySignPage';
import RuleBookmarkPage from './RuleBookmarkPage';
import SignBookmarkPage from './SignBookmarkPage';
import { AdMob, AdOptions } from '@capacitor-community/admob';

function StudyPage() {

  const showInterstitial = async () => {
    if(localStorage.getItem('isAdsFree') === 'true'){
      return;
    }
    AdMob.hideBanner();
    const options: AdOptions = {
      adId: 'ca-app-pub-3940256099942544/4411468910', // demo ad unit id
      isTesting: true,
    };
    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>
            <IonIcon icon={book} />&nbsp;&nbsp;Study
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonNavLink onClick={showInterstitial} routerDirection="forward" component={() => <StudyRulePage />}>
          <IonItem button detail lines="none" class="ion-item-border">
            <IonIcon icon={newspaper} />&nbsp;&nbsp;
            <IonLabel>Rule</IonLabel>
            {/* <img src="../../public/assets/imgs/word.png"/> */}
          </IonItem>
        </IonNavLink><br></br>
        <IonNavLink onClick={showInterstitial} routerDirection="forward" component={() => <StudySignPage />}>
          <IonItem button detail lines="none" class="ion-item-border">            
            <IonIcon icon={accessibility} />&nbsp;&nbsp;
            <IonLabel>Sign</IonLabel>
            {/* <img src="../../public/assets/imgs/word.png"/> */}
          </IonItem>
        </IonNavLink><br></br>
        <IonNavLink onClick={showInterstitial} routerDirection="forward" component={() => <RuleBookmarkPage />}>
          <IonItem button detail lines="none" class="ion-item-border">            
            <IonIcon icon={star} />&nbsp;&nbsp;
            <IonLabel>Rule Bookmark</IonLabel>
            {/* <img src="../../public/assets/imgs/word.png"/> */}
          </IonItem>
        </IonNavLink><br></br>
        <IonNavLink onClick={showInterstitial} routerDirection="forward" component={() => <SignBookmarkPage />}>
          <IonItem button detail lines="none" class="ion-item-border">            
            <IonIcon icon={star} />&nbsp;&nbsp;
            <IonLabel>Sign Bookmark</IonLabel>
            {/* <img src="../../public/assets/imgs/word.png"/> */}
          </IonItem>
        </IonNavLink>
      </IonContent>
    </>
  );
}

export default StudyPage;