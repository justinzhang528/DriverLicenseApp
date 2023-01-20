import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonNavLink, IonButton, IonIcon } from '@ionic/react';
import { book, pencil } from 'ionicons/icons';
import StudyPage from '../components/StudyPage';
import MockTestPage from '../components/MockTestPage';
import {
  AdMob,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
} from '@capacitor-community/admob';

const Home: React.FC = () => {
  const showBanner = async (
    adSize: BannerAdSize,
    position: BannerAdPosition,
    margin: number ) => {
    const options: BannerAdOptions = {
      adId: 'ca-app-pub-3940256099942544/6300978111', // demo ad unit id
      adSize: adSize,
      position: position,
      margin: margin,
      isTesting: true,
    };
    await AdMob.showBanner(options);
  };
  
  showBanner(BannerAdSize.BANNER, BannerAdPosition.BOTTOM_CENTER, 0);

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
