import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonNavLink, IonButton, IonIcon, IonToggle, CheckboxChangeEventDetail } from '@ionic/react';
import { book, heartOutline, heart, pencil } from 'ionicons/icons';
import StudyPage from '../components/StudyPage';
import MockTestPage from '../components/MockTestPage';
import {
  AdMob,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
} from '@capacitor-community/admob';

const Home: React.FC = () => {
  if(localStorage.getItem('life') === null){
    localStorage.setItem('life','5');
  }
  
  const getLifeIcons=()=>{
    const life = Number(localStorage.getItem('life'));
    const icons = []
    for(let i=0; i<5; i++){
      if(life>i)
        icons.push(heart);
      else
        icons.push(heartOutline);
    }
    return icons;
  }
  const [lifeIcons, setLifeIcons] = useState(getLifeIcons());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLifeIcons(getLifeIcons());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const [isShowBanner, setShowBanner] = useState(true);
  const showBanner = async () => {
    if(localStorage.getItem('isAdsFree') === 'true'){
      return;
    }
    const options: BannerAdOptions = {
      adId: 'ca-app-pub-3940256099942544/2934735716', // demo ad unit id,
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      isTesting: true,
    };
    await AdMob.showBanner(options);
    setShowBanner(false);
  };

  const onToggleChanged=(event: CustomEvent<CheckboxChangeEventDetail>)=>{
    if(event.detail.checked){
      AdMob.hideBanner();
    }else{
      AdMob.resumeBanner();
    }
    localStorage.setItem('isAdsFree',String(event.detail.checked));
  }

  if(isShowBanner)
    showBanner();

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
              <div>
                {Array.from({length: 5}, (_, i) => (
                  <IonIcon icon={lifeIcons[i]} size='large' key={i}></IonIcon>
                ))}
              </div><br></br><br></br>
              <IonNavLink routerDirection="forward" component={() => <StudyPage />}>
                <IonButton color="light" shape="round" class="card-btn">
                  <IonIcon icon={book} />&nbsp;&nbsp;Study
                </IonButton>
              </IonNavLink><br></br><br></br>
              <IonNavLink routerDirection="forward" component={() => <MockTestPage />}>
                <IonButton color="light" shape="round" class="card-btn">
                  <IonIcon icon={pencil} />&nbsp;&nbsp;Mock Test
                </IonButton>
              </IonNavLink><br></br><br></br>
                <h6>AdsFree</h6>
                <IonToggle onIonChange={onToggleChanged} color="success" enableOnOffLabels={true}></IonToggle>
            </div>
          </div>
        </IonContent>
      </IonPage>
  );
};

export default Home;
