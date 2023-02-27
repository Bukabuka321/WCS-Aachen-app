import { useMemo } from "react";
import { ILocalLocation } from "../../types/interfaces";

export default function LocalMap(props: ILocalLocation) {
  const { latitude, longitude } = props;

  const center = useMemo(
    () => ({ lat: latitude, lng: longitude }),
    [latitude, longitude]
  );

  return <div>Map not implemented</div>;
}
