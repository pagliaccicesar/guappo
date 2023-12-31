

/*   galeria del mapa    */

// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.

(function() {
    var map, popup, Popup;
  
    /** Initializes the map and the custom popup. */
    map = new google.maps.Map(document.getElementById("map"), {      
      center: { lat: -33.437069, lng: -70.658189},
      zoom: 15
    });
  
    Popup = createPopupClass();
    popup = new Popup(
      new google.maps.LatLng(-33.437069, -70.658189),
      document.getElementById("content")
    );
    popup.setMap(map);
  })();
  
  /**
   * Returns the Popup class.
   *
   * Unfortunately, the Popup class can only be defined after
   * google.maps.OverlayView is defined, when the Maps API is loaded.
   * This function should be called by initMap.
   */
  function createPopupClass() {
    /**
     * A customized popup on the map.
     * @param {!google.maps.LatLng} position
     * @param {!Element} content The bubble div.
     * @constructor
     * @extends {google.maps.OverlayView}
     */
    function Popup(position, content) {
      this.position = position;
  
      content.classList.add("popup-bubble");
  
      // This zero-height div is positioned at the bottom of the bubble.
      var bubbleAnchor = document.createElement("div");
      bubbleAnchor.classList.add("popup-bubble-anchor");
      bubbleAnchor.appendChild(content);
  
      // This zero-height div is positioned at the bottom of the tip.
      this.containerDiv = document.createElement("div");
      this.containerDiv.classList.add("popup-container");
      this.containerDiv.appendChild(bubbleAnchor);
  
      // Optionally stop clicks, etc., from bubbling up to the map.
      google.maps.OverlayView.preventMapHitsAndGesturesFrom(this.containerDiv);
    }
    // ES5 magic to extend google.maps.OverlayView.
    Popup.prototype = Object.create(google.maps.OverlayView.prototype);
  
    /** Called when the popup is added to the map. */
    Popup.prototype.onAdd = function() {
      // Manually add insert HTML markup into the DOM tree provided
      // by `getPanes` api.
      this.getPanes().floatPane.appendChild(this.containerDiv);
    };
  
    /** Called when the popup is removed from the map. */
    Popup.prototype.onRemove = function() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    };
  
    /** Called each frame when the popup needs to draw itself. */
    Popup.prototype.draw = function() {
      var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
  
      // Hide the popup when it is far out of view.
      var display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
          ? "block"
          : "none";
  
      if (display === "block") {
        this.containerDiv.style.left = divPosition.x + "px";
        this.containerDiv.style.top = divPosition.y + "px";
      }
      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    };
  
    return Popup;
  }
  
  
  