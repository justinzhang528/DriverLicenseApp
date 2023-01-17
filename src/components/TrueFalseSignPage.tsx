import React from 'react';
import { IonButton } from '@ionic/react';

function TrueFalseSignPage() {
  return (
    <>
      <IonButton>TrueFalseSign</IonButton>
      <IonButton disabled={true}>Disabled</IonButton>
    </>
  );
}
export default TrueFalseSignPage;