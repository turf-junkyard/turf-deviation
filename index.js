var ss = require('simple-statistics');
var inside = require('turf-inside');

/**
* Calculates the standard deviation value of a field for points within a set of polygons.
*
* @module turf/deviation
* @param {FeatureCollection} polyFC - a FeatureCollection of polygons
* @param {FeatureCollection} pointFC - a FeatureCollection of points
* @param {String} inField - the field from PointFC from which to aggregate
* @param {String} outField - the field to append to polyFC representing deviation
* @result {FeatureCollection} deviated - a FeatureCollection of polygons with appended field representing deviation
* @example
* var poly1 = turf.polygon([[[0,0],[10,0],[10,10], [0,10]]]);
* var poly2 = turf.polygon([[[10,0],[20,10],[20,20], [20,0]]]);
* var polyFC = turf.featurecollection([poly1, poly2]);
* var pt1 = turf.point(1,1, {population: 500});
* var pt2 = turf.point(1,3, {population: 400});
* var pt3 = turf.point(14,2, {population: 600});
* var pt4 = turf.point(13,1, {population: 500});
* var pt5 = turf.point(19,7, {population: 200});
* var ptFC = turf.featurecollection([pt1, pt2, pt3, pt4, pt5]);
*
* var inField = 'population';
* var outField = 'pop_deviation';
*
* var deviated = turf.deviation(polyFC, ptFC, inField, outField);
*
* //=deviated
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
