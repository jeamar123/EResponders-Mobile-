
app
  .service('responderService',[
    function service( ) {
      console.log("responderService Running !");

      var responders = [];
      var selectedResponderDetails = [];
      var mapInitialize = false;

      var hospitals = [
        {name : 'Northern Mindanao Medical Hospital',distance : '8km', latitude: 8.485588 ,  longitude: 124.649402, img: 'nortminmedhospital.jpg'},
        {name : 'Polymedic General Hospital',        distance : '12km', latitude: 8.482575 , longitude: 124.645616, img: 'nortminmedhospital.jpg'},
        {name : 'Cagayan de Oro Medical Center',     distance : '19km', latitude: 8.485771 ,  longitude: 124.646881, img: 'nortminmedhospital.jpg'},
      ];

      var fireStations = [
        {name : 'Fire Station 1',   distance : '8km', latitude: 8.485588 ,  longitude: 124.649402, img: 'nortminmedhospital.jpg'},
        {name : 'Fire Station 2',   distance : '12km', latitude: 8.482575 , longitude: 124.645616, img: 'nortminmedhospital.jpg'},
        {name : 'Fire Station 3',   distance : '19km', latitude: 8.485771 ,  longitude: 124.646881, img: 'nortminmedhospital.jpg'},
      ];

      var policeStations = [
        {name : 'Police Station 1', distance : '8km', latitude: 8.485588 ,  longitude: 124.649402, img: 'nortminmedhospital.jpg'},
        {name : 'Police Station 2', distance : '12km', latitude: 8.482575 , longitude: 124.645616, img: 'nortminmedhospital.jpg'},
        {name : 'Police Station 3', distance : '19km', latitude: 8.485771 ,  longitude: 124.646881, img: 'nortminmedhospital.jpg'},
      ];

      responders = responders.concat(hospitals); 
      responders = responders.concat(fireStations); 
      responders = responders.concat(policeStations); 

      // ADD

      var addResponders = function(newObj) {
          responders = newObj;
      };

      var addSelectedResponderDetails = function(newObj) {
          selectedResponderDetails = newObj;
      };

      var addHospital = function(newObj) {
          hospitals = newObj;
      };

      var addFireStation = function(newObj) {
          fireStations = newObj;
      };

      var addPoliceStation = function(newObj) {
          policeStations = newObj;
      };

      var setMapInitialize = function(bol) {
          mapInitialize = bol;
      };


      // GET

      var getResponders = function(){
          return responders;
      };

      var getSelectedResponderDetails = function(){
          return selectedResponderDetails;
      };

      var getHospitals = function() {
          return hospitals;
      };

      var getFireStations = function() {
          return fireStations;
      };

      var getPoliceStations = function() {
          return policeStations;
      };

      var getMapInitialize = function() {
          return mapInitialize;
      };

      return {
        addResponders: addResponders,
        addSelectedResponderDetails: addSelectedResponderDetails,
        addHospital: addHospital,
        addFireStation: addFireStation,
        addPoliceStation: addPoliceStation,
        getResponders: getResponders,
        getSelectedResponderDetails: getSelectedResponderDetails,
        getHospitals: getHospitals,
        getFireStations: getFireStations,
        getPoliceStations: getPoliceStations,
        setMapInitialize: setMapInitialize,
        getMapInitialize: getMapInitialize
      };
    }
]);
