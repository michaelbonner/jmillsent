import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  })

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '600px',
      }}
      mapContainerClassName="rounded-xl"
      center={{ lat: 40.8309715, lng: -111.9024321 }}
      zoom={11}
      options={{
        mapId: '4bdce153715e1d3',
      }}
    >
      {/* JME */}
      <Marker
        animation={'DROP'}
        icon={{
          url: 'https://www.jmillsent.com/images/jme-pin.png',
          scaledSize: new google.maps.Size(47, 65),
        }}
        position={{ lat: 40.8664457, lng: -111.9247221 }}
      />
      {/* Airport */}
      <Marker
        icon={{
          url: `https://www.jmillsent.com/images/pin-slc-airport.png`,
          scaledSize: new google.maps.Size(33, 35),
        }}
        position={{ lat: 40.7899404, lng: -111.9790706 }}
        size={{ width: 33, height: 35 }}
      />
    </GoogleMap>
  ) : (
    <></>
  )
}

export default Map
