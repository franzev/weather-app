import { useMemo, useTransition, useEffect, useState } from "react";

interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
}

const GEOLOCATION_REQUESTED_KEY = "weather-app-geolocation-requested";

const getGeolocationPromise = (): Promise<GeolocationCoordinates> => {
  return new Promise((resolve, reject) => {
    // Check if geolocation is supported
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        // Mark geolocation as requested
        localStorage.setItem(GEOLOCATION_REQUESTED_KEY, "true");
      },
      (error) => {
        // Mark geolocation as requested even if denied
        localStorage.setItem(GEOLOCATION_REQUESTED_KEY, "true");
        reject(new Error(error.message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0, // Don't use cached position
      }
    );
  });
};

export const useGeolocation = () => {
  const [isPending, startTransition] = useTransition();
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const hasRequested = useMemo(
    () =>
      typeof window !== "undefined" &&
      localStorage.getItem(GEOLOCATION_REQUESTED_KEY) !== null,
    []
  );

  useEffect(() => {
    if (hasRequested) {
      return;
    }

    startTransition(() => {
      getGeolocationPromise()
        .then((coords) => {
          setCoordinates(coords);
          setError(null);
        })
        .catch((err: unknown) => {
          setError(
            err instanceof Error ? err.message : "Failed to get location"
          );
          setCoordinates(null);
        });
    });
  }, [hasRequested, startTransition]);

  return {
    latitude: coordinates?.latitude ?? null,
    longitude: coordinates?.longitude ?? null,
    error,
    isLoading: isPending,
  };
};
