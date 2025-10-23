export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
}

export interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export const getCurrentLocation = (
  onSuccess: (location: LocationData) => void,
  onError: (error: GeolocationPositionError) => void,
  options: GeolocationOptions = {}
): void => {
  const defaultOptions: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000, // 5 minutes
    ...options
  };

  if (!navigator.geolocation) {
    onError({
      code: 0,
      message: 'Geolocation is not supported by this browser',
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3
    } as GeolocationPositionError);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      onSuccess({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        address: 'Current Location' // In real app, reverse geocode this
      });
    },
    onError,
    defaultOptions
  );
};

export const getDefaultLocation = (): LocationData => ({
  latitude: 37.7749,
  longitude: -122.4194,
  address: 'San Francisco, CA (Demo Location)'
});

export const isGeolocationSupported = (): boolean => {
  return 'geolocation' in navigator;
};

export const getGeolocationPermissionStatus = async (): Promise<PermissionState | 'not-supported'> => {
  if (!isGeolocationSupported()) {
    return 'not-supported';
  }

  try {
    const permission = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
    return permission.state;
  } catch (error) {
    return 'prompt';
  }
};
