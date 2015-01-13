var ss = require('simple-statistics');
var inside = require('turf-inside');

/**
* Calculates the standard deviation value of a field for points within a set of polygons.
*
* @module turf/deviation
* @param {FeatureCollection} polyFC a FeatureCollection of {@link Polygon} features
* @param {FeatureCollection} pointFC a FeatureCollection of {@link Point} features
* @param {String} inField the field in `pointFC` from which to aggregate
* @param {String} outField the field to append to polyFC representing deviation
* @return {FeatureCollection} a FeatureCollection of Polygon features with appended field representing deviation
* @example
* var poly1 = turf.polygon([[
*   [-97.807159, 30.270335],
*   [-97.807159, 30.369913],
*   [-97.612838, 30.369913],
*   [-97.612838, 30.270335],
*   [-97.807159, 30.270335]
* ]]);
* var poly2 = turf.polygon([[
*   [-97.825698, 30.175405],
*   [-97.825698, 30.264404],
*   [-97.630691, 30.264404],
*   [-97.630691, 30.175405],
*   [-97.825698, 30.175405]
* ]]);
* var polyFC = turf.featurecollection([poly1, poly2]);
* var pt1 = turf.point(-97.709655, 30.311245,
*   {population: 500});
* var pt2 = turf.point(-97.766647, 30.345028,
*   {population: 400});
* var pt3 = turf.point(-97.765274, 30.294646,
*   {population: 600});
* var pt4 = turf.point(-97.753601, 30.216355,
*   {population: 500});
* var pt5 = turf.point(-97.667083, 30.208047,
*   {population: 200});
* var ptFC = turf.featurecollection([pt1, pt2, pt3, pt4, pt5]);
*
* var inField = 'population';
* var outField = 'pop_deviation';
*
* var deviated = turf.deviation(
*   polyFC, ptFC, inField, outField);
*
* var result = turf.featurecollection(
*   ptFC.features.concat(deviated.features));
*
* //=result
*/

module.exports = function(polyFC, ptFC, inField, outField, done){
  polyFC.features.forEach(function(poly){
    if(!poly.properties){
      poly.properties = {};
    }
    var values = [];
    ptFC.features.forEach(function(pt){
      if (inside(pt, poly)) {
        values.push(pt.properties[inField]);
      }
    });
    poly.properties[outField] = ss.standard_deviation(values);
  })

  return polyFC;
}
