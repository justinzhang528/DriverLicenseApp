import React, { useState } from 'react';
import {star,trashBin} from 'ionicons/icons';
import {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonCard,
    IonButtons,
    IonBackButton,
    IonIcon,
    useIonToast
} from '@ionic/react';
import { AdMob } from '@capacitor-community/admob';

function RuleBookmarkPage() {
    const [presentToast] = useIonToast();
    const showToast = () => {
        presentToast({
          message: 'Removed From Bookmark',
          duration: 300,
          position: 'bottom'
        });
      };

    const getRuleBookmarkedItems=()=>{
        const str = localStorage.getItem('RuleBookmarkedItems');
        if(str === null || str === 'NaN' || str === '')
            return [];
        return (str || '{}').split(',').map(Number);
    }    
    const [RuleBookmarkedItems, setRuleBookmarkedItems] = useState(getRuleBookmarkedItems());

    const getImgPath = (name: string) => {
        return window.location.origin + "/../images/sign/" + name + ".png";
    }

    const zeroPad = (num: number, places: number) => {
        return String(num).padStart(places, '0');
    }
    
    const onDeleteClick=(n: number)=>{
        const newItems = RuleBookmarkedItems.filter(i => i !== n);
        setRuleBookmarkedItems(newItems);
        showToast();
    }

    const onClickBackButton=()=>{
        localStorage.setItem('RuleBookmarkedItems',RuleBookmarkedItems.toString());
        if(localStorage.getItem('isAdsFree') === 'true'){
            return;
        }
        AdMob.resumeBanner();
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                <IonButtons onClick={onClickBackButton} slot="start">
                    <IonBackButton></IonBackButton>
                </IonButtons>
                <IonTitle>
                    <IonIcon icon={star}></IonIcon>&nbsp;&nbsp;Rule Bookmark
                </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {RuleBookmarkedItems.map((i) => (
                    <div className="ion-text-center" key={i}>
                        <IonCard>
                            <IonIcon size='large' style={{float: 'right', margin: '4px'}} icon={trashBin} onClick={() => onDeleteClick(i)}/>
                            <h4>&nbsp;</h4>
                            <img src={getImgPath(zeroPad(i,3))} style={{width: '50%'}}></img>
                            <img src={getImgPath(zeroPad(i,3) + 'w')} style={{width: '75%'}}></img>
                        </IonCard>
                    </div>
                ))}
            </IonContent>
        </>
    );
}
export default RuleBookmarkPage;