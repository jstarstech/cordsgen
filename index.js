import { writeFileSync } from "fs";
import { encodeBase32, decodeBase32 } from "geohashing";

function gen(minLong = 1, minLat = 1, maxLong = 1.2, maxLat = 1.2) {
  const long = Number(
    (Math.random() * (maxLong - minLong) + minLong).toFixed(12)
  );
  const lat = Number((Math.random() * (maxLat - minLat) + minLat).toFixed(12));

  return [long, lat];
}

function generateGeoData() {
  const bbox = [34.2654333839, 29.5013261988, 35.8363969256, 33.2774264593];
  const cordsArr = new Map();

  for (let i = 0; i < 1000; i++) {
    let res;

    do {
      res = gen(bbox[0], bbox[1], bbox[2], bbox[3]);
    } while (cordsArr.has(res));

    cordsArr.set(res, 1);
  }

  const geoData = {
    type: "FeatureCollection",
    features: [],
  };

  for (const cords of Array.from(cordsArr.keys())) {
    const feature = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: cords,
      },
    };

    geoData.features.push(feature);
  }

  writeFileSync("geoData.json", JSON.stringify(geoData, null, 2));
}

function generateGeoHashJsonOut(count = 0) {
  const bbox = [34.2654333839, 29.5013261988, 35.8363969256, 33.2774264593];
  const cordsArr = [];

  for (let i = 0; i < count; i++) {
    let res;

    do {
      res = gen(bbox[0], bbox[1], bbox[2], bbox[3]);
    } while (cordsArr.includes(res));

    cordsArr.push(encodeBase32(res[1], res[0]));
  }

  console.log(JSON.stringify(cordsArr));
}

// generateGeoData();
generateGeoHashJsonOut(1000);
