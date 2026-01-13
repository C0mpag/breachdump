import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Autocomplete, DrawingManager, GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Quote } from "../types";
import { clampToZero, formatArea } from "../utils/quoteUtils";

type MapSelectorProps = {
  quote: Quote;
  onChange: (updates: Partial<Quote>) => void;
  onApplyAreaToMaterial: (materialId: string) => void;
};

const containerStyle = {
  width: "100%",
  height: "320px",
};

const defaultCenter = { lat: -33.8688, lng: 151.2093 };

const MapSelector = ({ quote, onChange, onApplyAreaToMaterial }: MapSelectorProps) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const libraries = useMemo(() => ["drawing", "places", "geometry"] as const, []);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey ?? "",
    libraries: [...libraries],
  });
  const mapRef = useRef<google.maps.Map | null>(null);
  const polygonRef = useRef<google.maps.Polygon | null>(null);
  const [searchValue, setSearchValue] = useState(quote.address);
  const [selectedMaterial, setSelectedMaterial] = useState(quote.materials[0]?.id ?? "");
  const [drawingEnabled, setDrawingEnabled] = useState(false);

  useEffect(() => {
    setSearchValue(quote.address);
  }, [quote.address]);

  useEffect(() => {
    if (!quote.materials.find((material) => material.id === selectedMaterial)) {
      setSelectedMaterial(quote.materials[0]?.id ?? "");
    }
  }, [quote.materials, selectedMaterial]);

  const updateArea = (area: number) => {
    onChange({ measuredAreaM2: clampToZero(area) });
  };

  const handlePolygonComplete = (polygon: google.maps.Polygon) => {
    polygonRef.current?.setMap(null);
    polygonRef.current = polygon;
    setDrawingEnabled(false);

    const path = polygon.getPath();
    const area = google.maps.geometry.spherical.computeArea(path);
    updateArea(area);
  };

  const handleClear = () => {
    polygonRef.current?.setMap(null);
    polygonRef.current = null;
    updateArea(0);
  };

  const handlePlaceChanged = useCallback(
    (autocomplete: google.maps.places.Autocomplete | null) => {
      if (!autocomplete) return;
      const place = autocomplete.getPlace();
      if (!place.geometry?.location) return;
      const location = place.geometry.location;
      mapRef.current?.panTo(location);
      mapRef.current?.setZoom(18);
      const formattedAddress = place.formatted_address ?? place.name ?? "";
      if (formattedAddress) {
        onChange({ address: formattedAddress });
        setSearchValue(formattedAddress);
      }
    },
    [onChange]
  );

  if (!apiKey) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <h2 className="text-base font-semibold">Map area selector</h2>
        <p className="mt-2">
          Add a Google Maps API key in <code>VITE_GOOGLE_MAPS_API_KEY</code> to enable polygon
          drawing and Places search. You can still enter the area manually below.
        </p>
        <label className="mt-4 block text-sm font-medium">
          Manual area (m²)
          <input
            type="number"
            min={0}
            className="mt-1 w-full rounded-lg border border-amber-200 px-3 py-2"
            value={quote.measuredAreaM2}
            onChange={(event) => updateArea(Number(event.target.value))}
          />
        </label>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Map Area Selector</h2>
          <p className="text-sm text-slate-500">Draw the job site and capture square metres.</p>
        </div>
        <div className="text-right text-sm font-semibold text-emerald-700">{formatArea(quote.measuredAreaM2)}</div>
      </div>

      {loadError && (
        <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          Unable to load Google Maps. Check your API key and enabled libraries.
        </div>
      )}

      {isLoaded && !loadError && (
        <div className="mt-4 space-y-3">
          <Autocomplete
            onLoad={(autocomplete) => {
              if (!autocomplete) return;
              autocomplete.addListener("place_changed", () => handlePlaceChanged(autocomplete));
            }}
          >
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Search address"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </Autocomplete>

          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={13}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            <DrawingManager
              onPolygonComplete={handlePolygonComplete}
              options={{
                drawingControl: false,
                polygonOptions: {
                  fillColor: "#10b981",
                  fillOpacity: 0.25,
                  strokeColor: "#059669",
                  strokeWeight: 2,
                  clickable: false,
                },
                drawingMode: drawingEnabled ? google.maps.drawing.OverlayType.POLYGON : null,
              }}
            />
          </GoogleMap>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white"
              onClick={() => setDrawingEnabled(true)}
            >
              Draw area
            </button>
            <button
              type="button"
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
              onClick={handleClear}
            >
              Clear drawing
            </button>
            <label className="text-xs font-medium text-slate-600">
              Area type
              <select
                className="ml-2 rounded border border-slate-200 px-2 py-1"
                value={quote.areaType}
                onChange={(event) => onChange({ areaType: event.target.value })}
              >
                {["Turf", "Mulch", "Paving", "Garden Bed", "Irrigation"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <label className="text-xs font-medium text-slate-600">
              Manual area override (m²)
              <input
                type="number"
                min={0}
                className="mt-1 w-full rounded border border-slate-200 px-2 py-1"
                value={quote.measuredAreaM2}
                onChange={(event) => updateArea(Number(event.target.value))}
              />
            </label>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-slate-600">
                Attach area to material line
                <select
                  className="mt-1 w-full rounded border border-slate-200 px-2 py-1"
                  value={selectedMaterial}
                  onChange={(event) => setSelectedMaterial(event.target.value)}
                >
                  {quote.materials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.name || "Untitled item"}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() => selectedMaterial && onApplyAreaToMaterial(selectedMaterial)}
                disabled={!selectedMaterial}
              >
                Apply area
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapSelector;
