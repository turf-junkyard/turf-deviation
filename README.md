turf-deviation
==============
[![build status](https://secure.travis-ci.org/Turfjs/turf-deviation.png)](http://travis-ci.org/Turfjs/turf-deviation)

Calculates the standard deviation value of a field for points within a set of polygons.

###Install

```sh
npm install turf-deviation
```

###Parameters

|name|description|
|---|---|
|polyFC|a FeatureCollection of polygons|
|pointFC|a FeatureCollection of points|
|inField|field from pointFC to aggregate|
|outField|field to append to polyFC representing deviation|

###Usage

```js
deviation(polyFC, ptFC, inField, outField)
```

###Example

```javascript
var deviation = require('turf-deviation')
var point = require('turf-point')
var polygon = require('turf-polygon')
var featurecollection = require('turf-featurecollection')

var poly1 = polygon([[[0,0],[10,0],[10,10], [0,10]]])
var poly2 = polygon([[[10,0],[20,10],[20,20], [20,0]]])
var polyFC = featurecollection([poly1, poly2])
var pt1 = point(1,1, {population: 500})
var pt2 = point(1,3, {population: 400})
var pt3 = point(14,2, {population: 600})
var pt4 = point(13,1, {population: 500})
var pt5 = point(19,7, {population: 200})
var ptFC = featurecollection([pt1, pt2, pt3, pt4, pt5])

var inField = 'population'
var outField = 'pop_deviation'

var deviated = deviation(polyFC, ptFC, inField, outField)

console.log(deviated.features[0].properties.pop_deviation)
console.log(deviated.features[1].properties.pop_deviation)
```