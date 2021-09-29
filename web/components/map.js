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
      center={{ lat: 40.8309715, lng: -111.9024321 }}
      zoom={11}
      options={{
        styles: mapStyles,
      }}
    >
      <Marker
        icon={marker.icon}
        position={{ lat: marker.lat, lng: marker.lng }}
      />
    </GoogleMap>
  ) : (
    <></>
  )
}

export default Map
