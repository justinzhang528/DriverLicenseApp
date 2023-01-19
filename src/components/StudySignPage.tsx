import React, { useState } from 'react';
import {accessibility, starOutline, star} from 'ionicons/icons';
import signImg from "../json/signPath.json";
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

function StudySignPage() {    
    const [presentToast] = useIonToast();
    const showToast = (msg: string) => {
        presentToast({
          message: msg,
          duration: 500,
          position: 'bottom'
        });
      };

    const [dataCounts] = useState(signImg.dataCounts);

    const getSignBookmarkedItems=()=>{
        const str = localStorage.getItem('signBookmarkedItems');
        if(str === null || str === 'NaN' || str === '')
            return [];
        return (str || '{}').split(',').map(Number);
    }    
    const [signBookmarkedItems, setBookmarkedItems] = useState(getSignBookmarkedItems());

    const getIconNames = () => {
        const result: string[] = [];
        for(let i=0; i< dataCounts; i++){
            if(signBookmarkedItems.includes(i+1)){                
                result.push(star);
            }else{
                result.push(starOutline);
            }
        }
        return result;
    }
    const [iconNames] = useState(getIconNames());

    const toggleNumberInArray = (arr: number[], num: number) =>{
        const index = signBookmarkedItems.indexOf(num);
        if (index === -1) {
            return [...arr, num];
        } else {
            return [...arr.slice(0, index), ...arr.slice(index + 1)];
        }
    }

    const zeroPad = (num: number, places: number) => {
        return String(num).padStart(places, '0');
    }

    const getImgPath = (name: string) => {
        return window.location.origin + "/../images/sign/" + name + ".png";
    }

    const onClickBookmarkIcon = (n: number) => {
        if(signBookmarkedItems.includes(n)){
            iconNames[n-1] = starOutline;
            showToast('Removed From Bookmark');
        }else{
            iconNames[n-1] = star;
            showToast('Added To Bookmark');
        }
        setBookmarkedItems(toggleNumberInArray(signBookmarkedItems, n));
    }

    const onClickBackButton=()=>{
        localStorage.setItem('signBookmarkedItems',signBookmarkedItems.toString());
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                <IonButtons onClick={onClickBackButton} slot="start">
                    <IonBackButton></IonBackButton>
                </IonButtons>
                <IonTitle>
                    <IonIcon icon={accessibility}></IonIcon>&nbsp;&nbsp;Study Sign
                </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {Array.from({length: dataCounts}, (_, i) => (
                    <div className="ion-text-center" key={i}>
                        <IonCard>
                            <IonIcon size='small' style={{float: 'right', margin: '4px'}} icon={iconNames[i]} onClick={() => onClickBookmarkIcon(i+1)}/>
                            <h4>&nbsp;{i+1}/{dataCounts}</h4>
                            <img src={getImgPath(zeroPad(i+1,3))} style={{width: '50%'}}></img>
                            <img src={getImgPath(zeroPad(i+1,3) + 'w')} style={{width: '75%'}}></img>
                        </IonCard>
                    </div>
                ))}
            </IonContent>
        </>
    );
}
export default StudySignPage;