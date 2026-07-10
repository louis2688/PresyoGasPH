"use client";

import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import type { MapMarkerModel } from "./mapTypes";
import type { PriceTier } from "@/lib/mapPins";
import { TIER_HEX } from "@/lib/mapPins";
import { LocateFixed, MapPinned, Maximize2, Minimize2 } from "lucide-react";

const CARTO_TILE =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const TILE_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const DEFAULT_CENTER: L.LatLngTuple = [14.5995, 120.9842];
const DEFAULT_ZOOM = 11;

export type JumpTarget = {
  label: string;
  center: [number, number];
  zoom: number;
};

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (ch) => {
    const esc: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return esc[ch] ?? ch;
  });
}

function createPillIcon(
  label: string,
  tier: PriceTier,
  selected: boolean,
): L.DivIcon {
  const bg = TIER_HEX[tier];
  const w = Math.min(132, 34 + label.length * 7);
  const h = 26;
  const ring = selected
    ? "box-shadow:0 0 0 3px rgba(56,189,248,.95),0 4px 14px rgba(0,0,0,.45);"
    : "box-shadow:0 2px 12px rgba(0,0,0,.45);";
  const html = `<div style="background:${bg};color:#fff;font:700 11px system-ui,-apple-system,sans-serif;padding:5px 11px;border-radius:999px;border:2px solid #fff;${ring}white-space:nowrap">${escapeHtml(label)}</div>`;
  return L.divIcon({
    html,
    className: "",
    iconSize: [w, h],
    iconAnchor: [w / 2, h / 2],
  });
}

function ClusterMarkers({
  markers,
  selectedId,
  onStationClick,
}: {
  markers: MapMarkerModel[];
  selectedId: string | null;
  onStationClick: (id: string) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const group = L.markerClusterGroup({
      maxClusterRadius: 72,
      spiderfyOnMaxZoom: true,
      zoomToBoundsOnClick: true,
      showCoverageOnHover: false,
      removeOutsideVisibleBounds: true,
      animateAddingMarkers: false,
      iconCreateFunction(cl) {
        const count = cl.getChildCount();
        const large = count >= 10;
        const size = large ? 52 : 42;
        const bg = large ? "#eab308" : "#22c55e";
        const fs = large ? 15 : 13;
        const html = `<div style="width:${size}px;height:${size}px;background:${bg};border-radius:999px;border:3px solid #fff;color:#fff;font-weight:700;font-size:${fs}px;font-family:system-ui;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 14px rgba(0,0,0,.4)">${count}</div>`;
        return L.divIcon({
          html,
          className: "",
          iconSize: [size, size],
          iconAnchor: [size / 2, size / 2],
        });
      },
    });

    markers.forEach((m) => {
      const icon = createPillIcon(m.label, m.tier, selectedId === m.id);
      const marker = L.marker([m.lat, m.lng], { icon });
      marker.on("click", (e) => {
        L.DomEvent.stopPropagation(e);
        onStationClick(m.id);
      });
      group.addLayer(marker);
    });

    map.addLayer(group);

    if (markers.length === 0) {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    } else if (markers.length === 1) {
      map.setView([markers[0].lat, markers[0].lng], 14);
    } else {
      const b = L.latLngBounds(
        markers.map((m) => [m.lat, m.lng] as L.LatLngTuple),
      );
      map.fitBounds(b, { padding: [52, 52], maxZoom: 13 });
    }

    return () => {
      map.removeLayer(group);
    };
  }, [map, markers, selectedId, onStationClick]);

  return null;
}

function MapFloatingChrome({
  shellRef,
  jumpTargets,
}: {
  shellRef: React.RefObject<HTMLDivElement | null>;
  jumpTargets: JumpTarget[];
}) {
  const map = useMap();
  const userMarkerRef = useRef<L.Layer | null>(null);
  const portalEl = map.getContainer();
  const [fullscreen, setFullscreen] = useState(false);
  const [jumpValue, setJumpValue] = useState("");

  useEffect(() => {
    const onFs = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = shellRef.current;
    if (!el) return;
    if (!document.fullscreenElement) void el.requestFullscreen?.().catch(() => {});
    else void document.exitFullscreen?.();
  }, [shellRef]);

  const locateUser = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        if (userMarkerRef.current) {
          map.removeLayer(userMarkerRef.current);
        }
        const dot = L.circleMarker([lat, lng], {
          radius: 9,
          fillColor: "#3b82f6",
          fillOpacity: 1,
          color: "#ffffff",
          weight: 3,
        });
        dot.bindTooltip("You are here", {
          direction: "top",
          offset: [0, -6],
          opacity: 0.95,
          className: "presyo-map-tip",
        });
        map.addLayer(dot);
        userMarkerRef.current = dot;
        map.flyTo([lat, lng], 14);
      },
      () => alert("Could not get your location. Check browser permissions."),
      { enableHighAccuracy: true, timeout: 12000 },
    );
  }, [map]);

  const onJump = useCallback(
    (label: string) => {
      const j = jumpTargets.find((t) => t.label === label);
      if (!j) return;
      map.flyTo(j.center as L.LatLngTuple, j.zoom ?? 13);
      setJumpValue("");
    },
    [jumpTargets, map],
  );

  return createPortal(
    <div className="pointer-events-none absolute right-3 top-3 z-[600]">
      <div className="pointer-events-auto inline-flex max-w-[calc(100vw-1.5rem)] flex-row flex-wrap items-center gap-1 rounded-xl bg-transparent p-0 shadow-none ring-0">
        <label className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-300 bg-transparent px-2 py-1 text-[11px] font-semibold leading-none text-slate-900 hover:border-slate-400 md:text-xs">
          <MapPinned className="size-3.5 shrink-0 text-sky-700 md:size-4" aria-hidden />
          <select
            value={jumpValue}
            onChange={(e) => {
              const v = e.target.value;
              setJumpValue(v);
              if (v) onJump(v);
            }}
            className="max-w-[118px] cursor-pointer bg-transparent py-0 text-[11px] text-slate-900 outline-none md:max-w-[168px] md:text-xs"
          >
            <option value="">Jump to area</option>
            {jumpTargets.map((t) => (
              <option key={t.label} value={t.label}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={toggleFullscreen}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-transparent px-2 py-1 text-[11px] font-semibold leading-none text-slate-900 hover:border-slate-400 hover:bg-black/[0.06] md:text-xs"
          title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          {fullscreen ? (
            <Minimize2 className="size-3.5 md:size-4" aria-hidden />
          ) : (
            <Maximize2 className="size-3.5 md:size-4" aria-hidden />
          )}
          <span className="hidden sm:inline">
            {fullscreen ? "Exit" : "Fullscreen"}
          </span>
        </button>
        <button
          type="button"
          onClick={locateUser}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-transparent px-2 py-1 text-[11px] font-semibold leading-none text-slate-900 hover:border-slate-400 hover:bg-black/[0.06] md:text-xs"
          title="Find my location"
        >
          <LocateFixed className="size-3.5 text-emerald-700 md:size-4" aria-hidden />
          <span className="hidden sm:inline">Find me</span>
        </button>
      </div>
    </div>,
    portalEl,
  );
}

function LeafletStationMapInner({
  markers,
  selectedId,
  onStationClick,
  jumpTargets,
}: {
  markers: MapMarkerModel[];
  selectedId: string | null;
  onStationClick: (id: string) => void;
  jumpTargets: JumpTarget[];
}) {
  const shellRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={shellRef}
      className="relative isolate z-0 h-full min-h-[380px] w-full overflow-hidden rounded-3xl ring-1 ring-slate-200"
    >
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        className="relative z-0 h-full min-h-[380px] w-full rounded-3xl [&_.leaflet-control-zoom]:border-none [&_.leaflet-control-zoom]:shadow-lg [&_.leaflet-control-zoom-leaflet-bar]:rounded-xl [&_.leaflet-control-zoom-leaflet-bar]:overflow-hidden [&_.leaflet-control-zoom-leaflet-bar]:bg-white [&_.leaflet-control-zoom-leaflet-bar]:ring-1 [&_.leaflet-control-zoom-leaflet-bar]:ring-slate-200 [&_.leaflet-control-zoom-leaflet-bar_a]:text-slate-800 [&_.leaflet-container]:z-0 [&_.leaflet-container]:rounded-3xl [&_.leaflet-container]:bg-[#dbeafe] [&_.leaflet-control-attribution]:max-w-[calc(100%-12rem)] [&_.leaflet-control-attribution]:rounded-lg [&_.leaflet-control-attribution]:border [&_.leaflet-control-attribution]:border-white/60 [&_.leaflet-control-attribution]:bg-white/90 [&_.leaflet-control-attribution]:text-[10px]"
        scrollWheelZoom
      >
        <TileLayer
          attribution={TILE_ATTR}
          url={CARTO_TILE}
          maxZoom={20}
          subdomains="abcd"
        />
        <ZoomControl position="bottomleft" />
        <ClusterMarkers
          markers={markers}
          selectedId={selectedId}
          onStationClick={onStationClick}
        />
        <MapFloatingChrome shellRef={shellRef} jumpTargets={jumpTargets} />
      </MapContainer>
    </div>
  );
}

export default LeafletStationMapInner;
