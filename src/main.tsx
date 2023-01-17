import React from 'react';
import { IonNav } from '@ionic/react';

import Home from './pages/Home';

function Example() {
  return <IonNav root={() => <Home />}></IonNav>;
}
export default Example;