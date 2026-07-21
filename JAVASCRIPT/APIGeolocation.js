// ============================================================================
// 1. QUICK FEATURE-DETECTION CHECK
// ============================================================================
if ("geolocation" in navigator) {
  console.log(
    "Geolocation is supported! Ready to initialize configurations...",
  );
} else {
  console.log("Geolocation is not supported by this browser.");
}

// ============================================================================
// 2. CONFIGURATION OPTIONS OBJECT (Defined First)
// ============================================================================
var locationOptions = {
  enableHighAccuracy: true, // Forces physical GPS usage (More accurate, high battery drain)
  timeout: 10000, // Throws a timeout error if location takes longer than 10 seconds
  maximumAge: 0, // 0 forces the device to pull a fresh coordinate instead of a cached one
};

// ============================================================================
// 3. CALLBACK FUNCTIONS (Defined Second)
// ============================================================================

// A. The Success Handler Callback
function onSuccess(position) {
  // Core Position Meta
  var timeRecorded = position.timestamp; // DOMHighResTimeStamp (Unix epoch milliseconds)
  var allCoords = position.coords; // References the deep GeolocationCoordinates Object

  // Core Coordinate Values (Always available on success)
  var lat = position.coords.latitude; // Decimal degrees latitude value
  var lng = position.coords.longitude; // Decimal degrees longitude value
  var acc = position.coords.accuracy; // Margin of error radius in meters

  // Hardware Dependent Values (May return null if device lacks sensors)
  var alt = position.coords.altitude; // Height in meters above sea level
  var altAcc = position.coords.altitudeAccuracy; // Altitude accuracy margin of error in meters
  var head = position.coords.heading; // Clockwise degrees from true north (0-360)
  var spd = position.coords.speed; // Speed velocity in meters per second

  console.log(
    `User is at Lat: ${lat}, Lng: ${lng} within a radius of ${acc} meters.`,
  );

  // ─── EXTRA ELEMENT ADDED: THE TOJSON() FIX ────────────────────────────────
  // Crucial: JSON.stringify(position) returns empty. You must use toJSON() to stringify or clone data!
  if (typeof position.toJSON === "function") {
    var serializableData = position.toJSON();
    console.log("Safely serialized location data object:", serializableData);
  }
}

// B. The Error Handler Callback
function onError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED: // code = 1
      console.error("User rejected the browser request to share location.");
      break;
    case error.POSITION_UNAVAILABLE: // code = 2
      console.error("Network offline or hardware satellite signal lost.");
      break;
    case error.TIMEOUT: // code = 3
      console.error("The request timed out before acquiring location data.");
      break;
    default:
      console.error(
        "An unknown location routing exception occurred.",
        error.message,
      );
  }
}

// ============================================================================
// 4. API CALL INVOCATIONS (Executed Last)
// ============================================================================

// Method 1: Request current position once
navigator.geolocation.getCurrentPosition(onSuccess, onError, locationOptions);

// Method 2: Set up a live tracking stream
var watchID = navigator.geolocation.watchPosition(
  onSuccess,
  onError,
  locationOptions,
);

// Method 3: Stop the tracking stream using its ID token variable
navigator.geolocation.clearWatch(watchID);

// ============================================================================
// 5. BONUS MASTER ACCESSIBILITY SPEC: PERMISSIONS QUERY API
// ============================================================================
// Check user authorization state non-intrusively without generating popups
if (navigator.permissions) {
  navigator.permissions.query({ name: "geolocation" }).then(function (status) {
    console.log("Current system permission state is: " + status.state);
    // Outputs: "granted" (allowed), "denied" (blocked), or "prompt" (will show popup on call)
  });
}

// =======================================================================================================================================
// REAL WORLD EXAMPLE
// =======================================================================================================================================

// 1. SYSTEM INITIALIZATION & STATE
const appState = {
  watchID: null,
  isTracking: false,
  routeHistory: [],
};

// UI Element Adjustments via DOM Style Object
const dashboard = document.getElementById("dashboard");
const mapButton = document.getElementById("toggle-map-btn");

// 2. CONFIGURATIONS & OPTIONS
const geoOptions = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 0,
};

// 3. CORE GEOLOCATION TRACKING HANDLERS
function onTrackingSuccess(position) {
  const { latitude, longitude, accuracy, speed } = position.coords;

  // Save location updates (using safe serialization for storage)
  if (typeof position.toJSON === "function") {
    appState.routeHistory.push(position.toJSON());
  }

  // Update Dashboard UI Styles and Elements dynamically
  document.getElementById("stats-display").textContent =
    `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)} (±${accuracy}m)`;

  document.getElementById("speed-display").textContent = speed
    ? `${(speed * 3.6).toFixed(1)} km/h`
    : "0.0 km/h";

  console.log(
    `%c[GPS Update] Coordinates received at ${position.timestamp}`,
    "color: #00ff00;",
  );
}

function onTrackingError(error) {
  console.error(`[GPS Error ${error.code}]: ${error.message}`);

  dashboard.style.borderColor = "red"; // Visual alert via Style object
  alert(
    "Failed to sync live location. Checking network or GPS hardware signal...",
  );
}

// 4. ACTION FUNCTIONS (Combining Location, Screen, and Geolocation APIs)
function startFitnessTracker() {
  console.time("TrackingSessionDuration");
  console.log("Initializing core fitness engine tracker modules...");

  // Check Screen Properties to optimize UI for mobile/desktop layouts
  if (
    screen.width < 768 ||
    (screen.orientation && screen.orientation.type.includes("portrait"))
  ) {
    dashboard.style.cssText = "width: 100%; font-size: 1.2rem; padding: 20px;";
  }

  // Request Non-Intrusive Permission Check
  if (navigator.permissions) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (status) {
        console.info(
          `Pre-flight Geolocation Permission Check Status: ${status.state}`,
        );

        if (status.state === "denied") {
          alert(
            "Please enable location permissions in your browser bar settings to use this app.",
          );
          return;
        }
      });
  }

  // Fire Tracker Engine
  appState.isTracking = true;
  appState.watchID = navigator.geolocation.watchPosition(
    onTrackingSuccess,
    onTrackingError,
    geoOptions,
  );
}

function stopAndSaveSession() {
  if (!appState.isTracking) return;

  // Kill Geolocation Watch Stream
  navigator.geolocation.clearWatch(appState.watchID);
  appState.isTracking = false;

  console.timeEnd("TrackingSessionDuration");
  console.groupCollapsed("Session Summary Data Elements");
  console.log(`Total checkpoints recorded: ${appState.routeHistory.length}`);
  console.table(appState.routeHistory.slice(0, 5)); // Inspect first 5 positions in table view
  console.groupEnd();

  // Redirect to summary sheet or refresh page view via Location/Window manipulation
  if (
    confirm("Workout complete! Do you want to load your profile summary page?")
  ) {
    window.location.href = `${window.location.origin}/profile/summary.html?items=${appState.routeHistory.length}`;
  } else {
    window.location.reload();
  }
}

// 5. INITIALIZE EVENT TRIGGER INTERFACES
document
  .getElementById("start-btn")
  .addEventListener("click", startFitnessTracker);
document
  .getElementById("stop-btn")
  .addEventListener("click", stopAndSaveSession);
