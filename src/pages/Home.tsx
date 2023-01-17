import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonNavLink, IonButton, IonIcon } from '@ionic/react';
import { book, pencil } from 'ionicons/icons';
import StudyPage from '../components/StudyPage';
import MockTestPage from '../components/MockTestPage';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="container">
          <div className="content-center">
            <IonNavLink routerDirection="forward" component={() => <StudyPage />}>
              <IonButton color="light" shape="round" class="card-btn">
                <IonIcon icon={book} />&nbsp;&nbsp;Study
              </IonButton>
            </IonNavLink><br></br><br></br>
            <IonNavLink routerDirection="forward" component={() => <MockTestPage />}>
              <IonButton color="light" shape="round" class="card-btn">
                <IonIcon icon={pencil} />&nbsp;&nbsp;Mock Test
              </IonButton>
            </IonNavLink>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
