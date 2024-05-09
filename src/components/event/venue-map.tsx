'use client';

import React, { memo, useCallback, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import { LogoLoader } from '@/components/logo-loader';

const containerStyle = {
	width: '100%',
	height: '18rem'
};

const defaultMapOptions = {
	fullscreenControl: false,
	streetViewControl: false,
	mapTypeControl: false
};

type VenueMapProps = {
	lat: number;
	lng: number;
};

const VenueMap = ({ lat, lng }: VenueMapProps) => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!
	});

	const [_, setMap] = useState<google.maps.Map | null>(null);

	const onLoad = useCallback((map: google.maps.Map) => {
		map.setZoom(10);
		setMap(map);
	}, []);

	const onUnmount = useCallback((_: google.maps.Map) => {
		setMap(null);
	}, []);

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={{ lat, lng }}
			zoom={100}
			onLoad={onLoad}
			onUnmount={onUnmount}
			options={defaultMapOptions}
		>
			<Marker position={{ lat, lng }} />
		</GoogleMap>
	) : (
		<div className="h-72 flex items-center justify-center">
			<LogoLoader />
		</div>
	);
};

export default memo(VenueMap);
