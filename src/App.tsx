import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Main from './main'
import { useEffect } from 'react';
import {AdMob} from '@capacitor-community/admob';
import { LocalNotifications } from '@capacitor/local-notifications';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    AdMob.initialize({
      requestTrackingAuthorization: true,
      initializeForTesting: true,
    });
  }, []);
  
  const scheduleNotificationEveryDay = async () => {
    // Set the date and time for the notification
    const notificationDate = new Date();
    notificationDate.setHours(21);
    notificationDate.setMinutes(0);
    notificationDate.setSeconds(0);

    // Schedule the notification
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'DriverLicense',
          body: 'Time to Study!',
          id: 1,
          schedule: { at: notificationDate, every: 'day'},
        },
      ]
    });
  }  
  
  const scheduleNotificationOnSpecificTime = async (hour: number, day: number) => {
    // Set the date and time for the notification
    const notificationDate = new Date();
    notificationDate.setHours(hour);
    notificationDate.setMinutes(0);
    notificationDate.setSeconds(0);

    // Schedule the notification
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'DriverLicense',
          body: 'Time to Study!',
          id: 1,
          schedule: { at: notificationDate, on: {weekday: day}},
        },
      ]
    });
  } 

  LocalNotifications.requestPermissions().then(permission => {
    if(permission){
        console.log('Permission granted');
        scheduleNotificationEveryDay();
        scheduleNotificationOnSpecificTime(10,7);
        scheduleNotificationOnSpecificTime(10,1);
    }else{
        console.log('Permission not granted');
    }
  });

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Main />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
);}

export default App;
