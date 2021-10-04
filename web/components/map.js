import React from 'react'
import mapStyles from '../data/map-styles'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const Map = ({ marker }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  })

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '400px',
        maxHeight: `800px`,
      }}
      mapContainerClassName="rounded-lg"
      center={{ lat: 40.8309715, lng: -111.9024321 }}
      zoom={11}
      options={{
        styles: mapStyles,
      }}
    >
      {/* JME */}
      <Marker
        icon="https://jmillsent.vercel.app/images/jme-pin.png"
        position={{ lat: 40.8664457, lng: -111.9247221 }}
      />
      {/* Airport */}
      <Marker
        icon={`https://jmillsent.vercel.app/images/pin-slc-airport.png`}
        position={{ lat: 40.7899404, lng: -111.9790706 }}
      />
    </GoogleMap>
  ) : (
    <></>
  )
}

export default Map
