import { writeFileSync } from "fs";
import { encodeBase32 } from "geohashing";

function gen(minLong = 1, minLat = 1, maxLong = 1.2, maxLat = 1.2) {
  const long = Number(
    (Math.random() * (maxLong - minLong) + minLong).toFixed(12)
  );
  const lat = Number((Math.random() * (maxLat - minLat) + minLat).toFixed(12));

  return [long, lat];
}

function generateGeoData(bbox, count = 0) {
  const cordsMap = new Map();

  for (let i = 0; i < count; i++) {
    let res;

    do {
      res = gen(bbox[0], bbox[1], bbox[2], bbox[3]);
    } while (cordsMap.has(res));

    cordsMap.set(res, 1);
  }

  const geoData = {
    type: "FeatureCollection",
    features: [],
  };

  for (const cords of Array.from(cordsMap.keys())) {
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

function generateGeoHashJsonOut(bbox, count = 0) {
  const cordsArr = [];

  for (let i = 0; i < count; i++) {
    let res;

    do {
      res = gen(bbox[0], bbox[1], bbox[2], bbox[3]);
    } while (cordsArr.includes(res.toString()));

    cordsArr.push(encodeBase32(res[1], res[0]));
  }

  writeFileSync("geoHashData.json", JSON.stringify(cordsArr, null, 2));
}

const bbox = [34.2654333839, 29.5013261988, 35.8363969256, 33.2774264593];

generateGeoData(bbox, 100);
generateGeoHashJsonOut(bbox, 5000);
