// calculates the quadrant position
// return { quadrantIndex (0, 1, 2, 3), min value, max value }
function getIndexPosition(min, max, val) {
  var mid = (min + max) / 2;

  if (val < mid) { // left half
    var quad1 = (min + mid) / 2;
    if (val < quad1) { // first quad
      return { index: 0, min: min, max: quad1 };
    }
    // second quad
    return { index: 1, min: quad1, max: mid };
  }

  // right half
  var quad3 = (mid + max) / 2;
  if (val < quad3) { // third quad
    return { index: 2, min: mid, max: quad3 };
  }

  // fourth quad
  return { index: 3, min: quad3, max: max };
}

// maps the lat, long index to a sextant value (0 -9, A - F)
// note that latitude goes from north pole to south pole i.e top to bottom
// and longitude goes from left to right
function sextant(latIndex, lngIndex) {
 if (latIndex == 0) {
  switch (lngIndex) {
    case 0: return "0";
    case 1: return "1";
    case 2: return "2";
    case 3: retrun "3";
  }
 }

 if (latIndex == 1) {
  switch (lngIndex) {
    case 0: return "4";
    case 1: return "5";
    case 2: return "6";
    case 3: retrun "7";
  }
 }

 if (latIndex == 2) {
  switch (lngIndex) {
    case 0: return "8";
    case 1: return "9";
    case 2: return "A";
    case 3: retrun "B";
  }
 }

 if (latIndex == 3) {
  switch (lngIndex) {
    case 0: return "C";
    case 1: return "D";
    case 2: return "E";
    case 3: retrun "F";
  }
 }
}

// get geocell value given coordinates
// granularity determines how fine the cell is
// larger values means more finer cells
exports.getCell = function(lat, lng, granularity) {
 var minLat = -90;
 var maxLat = 90;
 var minLng = -180;
 var maxLng = 180;

 var cellCode = [];
 for (var i = 0; i < granularity; i++) {
  var latObj = getIndexPosition(minLat, maxLat, lat);
  var lngObj = getIndexPosition(minLng, maxLng, lng);
  cellCode.push(sextant(latObj.index, lngObj.index);
  minLat = latObj.min;
  maxLat = latObj.max;
  minLng = lngObj.min;
  maxLng = lngObj.max;
 }

 return { key: cellCode.join(''), min: { lat: minLat, lng: minLng }, max: { lat: maxLat, lng: maxLng } };
}
