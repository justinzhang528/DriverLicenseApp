import React from 'react';
import {pencil,listCircle,checkmarkCircle} from 'ionicons/icons';
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

import MultiChocieRegulationPage from './MultiChocieRegulationPage';
import MultiChoiceSignPage from './MultiChoiceSignPage';
import TrueFalseRegulationPage from './TrueFalseRegulationPage';
import TrueFalseSignPage from './TrueFalseSignPage';

function MockTestPage() {
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
        <IonNavLink routerDirection="forward" component={() => <MultiChocieRegulationPage />}>
          <IonItem button detail lines="none" class="ion-item-border">
              <IonIcon icon={listCircle}></IonIcon>&nbsp;&nbsp;
              <IonLabel>Multiple Chocie - Regulation</IonLabel>
              {/* <img src="../../public/assets/imgs/word.png"/> */}
          </IonItem>
        </IonNavLink><br></br>
        <IonNavLink routerDirection="forward" component={() => <MultiChoiceSignPage />}>
          <IonItem button detail lines="none" class="ion-item-border">
            <IonIcon icon={listCircle}></IonIcon>&nbsp;&nbsp;
            <IonLabel>Multiple Chocie - Sign</IonLabel>
            {/* <img src="../../public/assets/imgs/word.png"/> */}
          </IonItem>
        </IonNavLink><br></br>
        <IonNavLink routerDirection="forward" component={() => <TrueFalseRegulationPage />}>
          <IonItem button detail lines="none" class="ion-item-border">
            <IonIcon icon={checkmarkCircle}></IonIcon>&nbsp;&nbsp;
              <IonLabel>True/False - Regulation</IonLabel>  
            {/* <img src="../../public/assets/imgs/word.png"/> */}
          </IonItem>
        </IonNavLink><br></br>
        <IonNavLink routerDirection="forward" component={() => <TrueFalseSignPage />}>
          <IonItem button detail lines="none" class="ion-item-border">
            <IonIcon icon={checkmarkCircle}></IonIcon>&nbsp;&nbsp;
            <IonLabel>True/False - Sign</IonLabel>
            {/* <img src="../../public/assets/imgs/word.png"/> */}
          </IonItem>
        </IonNavLink>
      </IonContent>
    </>
  );
}

export default MockTestPage;