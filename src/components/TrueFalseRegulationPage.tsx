import React from 'react';
import { IonButton } from '@ionic/react';

function TrueFalseRegulationPage() {
  return (
    <>
      <IonButton>TrueFalseRegulation</IonButton>
      <IonButton disabled={true}>Disabled</IonButton>
    </>
  );
}
export default TrueFalseRegulationPage;