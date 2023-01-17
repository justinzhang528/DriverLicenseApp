import React from 'react';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonContent,
  IonNavLink,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel
} from '@ionic/react';

import StudyRegulationPage from './StudyRegulationPage';
import StudySignPage from './StudySignPage';

function StudyPage() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Study</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonNavLink routerDirection="forward" component={() => <StudyRegulationPage />}>
          <IonItem button detail lines="none" class="ion-item-border">
              <IonLabel>Regulations</IonLabel>
              {/* <img src="../../public/assets/imgs/word.png"/> */}
          </IonItem>
        </IonNavLink><br></br>
        <IonNavLink routerDirection="forward" component={() => <StudySignPage />}>
          <IonItem button detail lines="none" class="ion-item-border">
              <IonLabel>Signs</IonLabel>
              {/* <img src="../../public/assets/imgs/word.png"/> */}
          </IonItem>
        </IonNavLink>
      </IonContent>
    </>
  );
}

export default StudyPage;