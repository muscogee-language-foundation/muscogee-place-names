const map = new Map<string, string>();
map.set("Florida", "Ekvn Fvske");
map.set("Muscogee", "Mvskoke");
/*
  The first value in the set is what is transformed into a regex
  Therefore we need to double escape special characters
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
*/
map.set(`Muscogee \\(Creek\\) Nation`, "Mvskoke Etvlwv");
map.set(`Muscogee \\(Creek\\) Nation Reservation`, "Mvskoke Etvlwv Emekvnv");
map.set("Muscogee Creek Nation", "Mvskoke Etvlwv");
map.set("Muscogee Nation", "Mvskoke Etvlwv");
map.set("Checotah", "Cokotv");
map.set("New York", "Nuyaka");
map.set("Muskogee", "Mvskoke");
map.set("Tulsa", "Tvlse");
map.set("Okfuskee", "Okfvske");
map.set("Arkansas", "Akensv");
map.set("Okmulgee", "Okmvlke");
map.set("Atlanta", "Pvkvn Huere");
map.set("Chattahoochee River", "Cvto-Hocce Hvcce");
map.set("Conecuh River", "Koha Anaka");
map.set("Etowah", "Etvlwv");
map.set("North Canadian River", " Oktah Hvcce");
map.set("United States", "Wvcenv Emekvnv");
map.set("Tallahatchie River", "Tvlwv Hvcce");
map.set("Tallahassee", "Tvlvhasse");
map.set("Seminole", "Semvnole");
map.set("Ogeechee River", "Okece");
map.set("Red River", "Uecate Hvcce");
map.set("Chattanooga", "Cvto Nuka");
map.set("Waxahatchee", "Wase Hvcce");

const tempArr = Array.from(map);

tempArr.sort((a, b) => {
  const wordOne = a[0].length;
  const wordTwo = b[0].length;

  return wordOne > wordTwo ? -1 : wordTwo > wordOne ? 1 : 0;
});

export const sortedMap = new Map(tempArr);
