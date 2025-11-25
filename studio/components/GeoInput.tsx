import { set, unset } from 'sanity'
import { Stack, TextInput, Card } from '@sanity/ui'
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export function GeopointInput(props: any) {
    const { value, onChange } = props
    const [address, setAddress] = useState('')

    // Search address using Nominatim
    const searchAddress = async () => {
        if (!address) return

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        )
        const data = await response.json()

        if (data[0]) {
            onChange(set({
                _type: 'geopoint',
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon),
            }))
        }
    }

    const MapClickHandler = () => {
        useMapEvents({
            click: (e) => {
                onChange(set({
                    _type: 'geopoint',
                    lat: e.latlng.lat,
                    lng: e.latlng.lng,
                }))
            },
        })
        return null
    }

    return (
        <Stack space={3}>
            <Stack space={2}>
                <TextInput
                    placeholder="Adresse suchen..."
                    value={address}
                    onChange={(e) => setAddress(e.currentTarget.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchAddress()}
                />
            </Stack>

            {value && (
                <Card style={{ height: '400px' }}>
                    <MapContainer
                        center={[value.lat, value.lng]}
                        zoom={13}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        <Marker position={[value.lat, value.lng]} />
                        <MapClickHandler />
                    </MapContainer>
                </Card>
            )}

            {value && (
                <TextInput
                    value={`${value.lat.toFixed(6)}, ${value.lng.toFixed(6)}`}
                    readOnly
                />
            )}
        </Stack>
    )
}