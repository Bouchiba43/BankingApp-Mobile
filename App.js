import React from 'react';
import { registerRootComponent } from 'expo';
import Navigation from './components/config/routes/Navigation'; // Adjust the path accordingly

export default function App() {
  return <Navigation />;
}

registerRootComponent(App);
