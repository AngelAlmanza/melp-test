import type { LatLng } from "leaflet";
import { useMapEvents } from "react-leaflet";

type Props = {
  handleSetPosition: (position: LatLng) => void;
}

export const ShowMeBtn = ({ handleSetPosition }: Props) => {
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      handleSetPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  });

  return (
    <div>ShowMeBtn</div>
  )
}