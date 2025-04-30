<template>
    <div class="book-rider-page">
      <header class="header">
        <div class="container">
          <div class="header-content">
            <div class="logo">
              <Logo />
              <h1>Book a Rider</h1>
            </div>
            <div class="user-actions">
              <button class="history-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                History
              </button>
            </div>
          </div>
        </div>
      </header>
  
      <div class="main-content">
        <div class="container">
          <div class="map-container">
            <div id="map" ref="mapContainer" class="map"></div>
            
            <!-- Map Controls -->
            <div class="map-controls">
              <button class="control-btn refresh-btn" @click="refreshRiders">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M23 4v6h-6"></path>
                  <path d="M1 20v-6h6"></path>
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
                  <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"></path>
                </svg>
                Refresh
              </button>
              <button class="control-btn locate-btn" @click="centerOnUserLocation">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                My Location
              </button>
            </div>
          </div>
  
          <div class="booking-panel">
            <div class="panel-tabs">
              <button 
                class="tab-btn" 
                :class="{ active: activeTab === 'riders' }" 
                @click="activeTab = 'riders'"
              >
                Available Riders
              </button>
              <button 
                class="tab-btn" 
                :class="{ active: activeTab === 'deliveries' }" 
                @click="activeTab = 'deliveries'"
              >
                Scheduled Deliveries
              </button>
            </div>
  
            <div class="tab-content" v-if="activeTab === 'riders' && !selectedRider">
              <div class="search-box">
                <input type="text" placeholder="Search riders..." v-model="searchQuery">
                <button class="search-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
  
              <div class="riders-list">
                <div 
                  v-for="rider in filteredRiders" 
                  :key="rider.id" 
                  class="rider-card"
                  @click="selectRider(rider)"
                >
                  <div class="rider-avatar">
                    <img :src="rider.avatar || '/images/default-avatar.png'" alt="Rider avatar">
                    <span class="status-badge" :class="rider.status"></span>
                  </div>
                  <div class="rider-info">
                    <h3>{{ rider.name }}</h3>
                    <div class="rider-details">
                      <span class="rating">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        {{ rider.rating.toFixed(1) }}
                      </span>
                      <span class="distance">{{ rider.distance }}km away</span>
                    </div>
                    <p class="last-active">Last active: {{ formatLastActive(rider.lastActive) }}</p>
                  </div>
                  <div class="rider-stats">
                    <div class="stat">
                      <span class="stat-value">{{ rider.completedDeliveries }}</span>
                      <span class="stat-label">Deliveries</span>
                    </div>
                    <div class="stat">
                      <span class="stat-value">{{ rider.responseTime }}m</span>
                      <span class="stat-label">Resp. Time</span>
                    </div>
                  </div>
                </div>
  
                <div v-if="filteredRiders.length === 0" class="no-riders">
                  <p>No riders available in your area.</p>
                  <button class="refresh-riders-btn" @click="refreshRiders">Refresh</button>
                </div>
              </div>
            </div>
  
            <div class="tab-content" v-if="activeTab === 'deliveries'">
              <div class="deliveries-list">
                <div v-if="scheduledDeliveries.length === 0" class="no-deliveries">
                  <p>You have no scheduled deliveries.</p>
                  <button class="book-rider-btn" @click="activeTab = 'riders'">Book a Rider</button>
                </div>
  
                <div v-else class="delivery-card" v-for="delivery in scheduledDeliveries" :key="delivery.id">
                  <div class="delivery-header">
                    <h3>Delivery #{{ delivery.id }}</h3>
                    <span :class="`status-pill ${delivery.status}`">{{ formatStatus(delivery.status) }}</span>
                  </div>
                  <div class="delivery-details">
                    <div class="detail-row">
                      <span class="detail-label">Rider:</span>
                      <span class="detail-value">{{ delivery.rider.name }}</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">Scheduled for:</span>
                      <span class="detail-value">{{ formatDate(delivery.scheduledTime) }}</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">From:</span>
                      <span class="detail-value">{{ delivery.pickup }}</span>
                    </div>
                    <div class="detail-row">
                      <span class="detail-label">To:</span>
                      <span class="detail-value">{{ delivery.dropoff }}</span>
                    </div>
                  </div>
                  <div class="delivery-actions">
                    <button class="track-btn" @click="trackDelivery(delivery)">Track</button>
                    <button 
                      class="cancel-btn" 
                      v-if="delivery.status === 'scheduled' || delivery.status === 'pending'"
                      @click="cancelDelivery(delivery)"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Rider detail view when a rider is selected -->
            <div class="rider-detail-panel" v-if="activeTab === 'riders' && selectedRider">
              <div class="panel-header">
                <button class="back-btn" @click="selectedRider = null">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Back
                </button>
                <h2>Rider Details</h2>
              </div>
              
              <div class="rider-detail">
                <div class="rider-profile">
                  <div class="rider-avatar large">
                    <img :src="selectedRider.avatar || '/images/default-avatar.png'" alt="Rider avatar">
                  </div>
                  <div class="rider-profile-info">
                    <h3>{{ selectedRider.name }}</h3>
                    <div class="rider-rating">
                      <div class="stars">
                        <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" :fill="i <= Math.round(selectedRider.rating) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </div>
                      <span class="rating-value">{{ selectedRider.rating.toFixed(1) }} ({{ selectedRider.ratingCount }} ratings)</span>
                    </div>
                  </div>
                </div>
  
                <div class="rider-stats-detail">
                  <div class="stat-detail">
                    <span class="stat-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </span>
                    <div class="stat-info">
                      <span class="stat-label">Response Time</span>
                      <span class="stat-value">{{ selectedRider.responseTime }} minutes</span>
                    </div>
                  </div>
                  <div class="stat-detail">
                    <span class="stat-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                    </span>
                    <div class="stat-info">
                      <span class="stat-label">Completed Deliveries</span>
                      <span class="stat-value">{{ selectedRider.completedDeliveries }}</span>
                    </div>
                  </div>
                  <div class="stat-detail">
                    <span class="stat-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                        <line x1="8" y1="2" x2="8" y2="18"></line>
                        <line x1="16" y1="6" x2="16" y2="22"></line>
                      </svg>
                    </span>
                    <div class="stat-info">
                      <span class="stat-label">Experience</span>
                      <span class="stat-value">{{ selectedRider.experience }} years</span>
                    </div>
                  </div>
                </div>
  
                <div class="booking-form">
                  <h3>Book this rider</h3>
                  
                  <div class="form-group">
                    <label for="pickup">Pickup Location</label>
                    <input type="text" id="pickup" v-model="bookingForm.pickup" placeholder="Enter pickup address">
                  </div>
                  
                  <div class="form-group">
                    <label for="dropoff">Dropoff Location</label>
                    <input type="text" id="dropoff" v-model="bookingForm.dropoff" placeholder="Enter destination address">
                  </div>
                  
                  <div class="form-group">
                    <label for="schedule">Schedule For</label>
                    <input type="datetime-local" id="schedule" v-model="bookingForm.scheduledTime">
                  </div>
                  
                  <div class="form-group">
                    <label for="notes">Special Instructions</label>
                    <textarea id="notes" v-model="bookingForm.notes" placeholder="Any special instructions for the rider..."></textarea>
                  </div>
  
                  <div class="estimated-cost">
                    <span class="cost-label">Estimated Cost:</span>
                    <span class="cost-value">₦{{ estimatedCost.toFixed(2) }}</span>
                  </div>
                  
                  <button class="book-btn" @click="bookRider" :disabled="!isBookingFormValid">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Success Modal -->
      <div class="modal-overlay" v-if="showSuccessModal">
        <div class="modal success-modal">
          <div class="modal-content">
            <div class="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2>Booking Successful!</h2>
            <p>Your rider has been booked successfully. You can track your delivery in the "Scheduled Deliveries" tab.</p>
            <div class="modal-actions">
              <button class="confirm-btn" @click="closeSuccessModal">OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
// Google Maps implementation for the book-rider page
export default {
  data() {
    return {
      map: null,
      riders: [],
      markers: [],
      userMarker: null,
      userLocationInfoWindow: null,
      riderInfoWindows: [],
      userLocation: { lat: 9.0765, lng: 7.3986 }, // Default location (Abuja)
      // Other data properties...
    };
  },
  methods: {
    initMap() {
      // Initialize the map once the DOM is loaded
      this.$nextTick(() => {
        const mapContainer = this.$refs.mapContainer;
        if (!mapContainer) return;
        
        // Create map instance
        this.map = new google.maps.Map(mapContainer, {
          center: this.userLocation,
          zoom: 13,
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });
        
        // Create info window for user location
        this.userLocationInfoWindow = new google.maps.InfoWindow({
          content: "<div style='font-weight: 500;'>Your location</div>"
        });
        
        // Add user marker
        this.addUserMarker();
        
        // Add rider markers
        this.updateRiderMarkers();
        
        // Listen for map idle event to ensure markers render properly
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          this.updateRiderMarkers();
        });
      });
    },
    
    addUserMarker() {
      if (!this.map) return;
      
      // Remove previous user marker if exists
      if (this.userMarker) {
        this.userMarker.setMap(null);
      }
      
      // Create marker for user location
      this.userMarker = new google.maps.Marker({
        position: this.userLocation,
        map: this.map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#3498db',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          scale: 8
        },
        zIndex: 9999 // Ensure user marker is on top
      });
      
      // Add click event listener
      this.userMarker.addListener('click', () => {
        this.userLocationInfoWindow.open(this.map, this.userMarker);
      });
      
      // Create pulsing effect for user marker (optional)
      this.addPulsingEffect();
    },
    
    addPulsingEffect() {
      // Skip animation if no marker exists
      if (!this.userMarker) return;
      
      // Create a dot that will be used for the pulse animation
      const pulsingDot = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#3498db',
        fillOpacity: 0.3,
        strokeWeight: 0,
        scale: 10,
      };
      
      // Create a pulsing marker
      const pulseMarker = new google.maps.Marker({
        position: this.userLocation,
        map: this.map,
        icon: pulsingDot,
        zIndex: 9998 // Just below the user marker
      });
      
      // Animation interval
      let direction = 1;
      let scale = 10;
      
      // Store interval ID for cleanup
      this.pulseInterval = setInterval(() => {
        scale += direction;
        
        // Reverse direction when reaching min/max scale
        if (scale >= 20) direction = -1;
        if (scale <= 10) direction = 1;
        
        // Update icon
        pulseMarker.setIcon({
          ...pulsingDot,
          scale: scale
        });
      }, 100);
    },
    
    updateRiderMarkers() {
      if (!this.map) return;
      
      // Clear all existing markers and info windows
      this.markers.forEach(marker => {
        marker.setMap(null);
      });
      this.riderInfoWindows.forEach(infoWindow => {
        infoWindow.close();
      });
      
      this.markers = [];
      this.riderInfoWindows = [];
      
      // Create markers for all riders
      this.riders.forEach(rider => {
        if (!rider.location) return;
        
        // Determine color based on status
        let statusColor;
        if (rider.status === 'online') {
          statusColor = '#2ecc71'; // Green
        } else if (rider.status === 'busy') {
          statusColor = '#f1c40f'; // Yellow
        } else {
          statusColor = '#686868'; // Gray for offline
        }
        
        // Create a custom SVG marker
        const markerIcon = {
          url: this.createRiderMarkerSVG(rider.avatar, statusColor),
          scaledSize: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(20, 20)
        };
        
        // Create the marker
        const marker = new google.maps.Marker({
          position: rider.location,
          map: this.map,
          icon: markerIcon,
          title: rider.name,
          optimized: false // Better performance for custom HTML markers
        });
        
        // Create info window content
        const infoWindowContent = `
          <div class="rider-info-window">
            <h3>${rider.name}</h3>
            <div class="rating">
              <span style="color: #f1c40f;">★</span> ${rider.rating.toFixed(1)}
            </div>
            <div class="distance">${rider.distance}km away</div>
            <button 
              style="
                background-color: #E53945; 
                color: white; 
                border: none; 
                padding: 6px 12px; 
                border-radius: 4px; 
                margin-top: 8px;
                cursor: pointer;
                width: 100%;
              "
              onclick="window.selectRiderFromMap(${rider.id})"
            >
              Select Rider
            </button>
          </div>
        `;
        
        // Create info window
        const infoWindow = new google.maps.InfoWindow({
          content: infoWindowContent,
          maxWidth: 200
        });
        
        // Store info window reference
        this.riderInfoWindows.push(infoWindow);
        
        // Add click event listener
        marker.addListener('click', () => {
          // Close all other info windows
          this.riderInfoWindows.forEach(window => window.close());
          
          // Open this info window
          infoWindow.open(this.map, marker);
        });
        
        // Store marker reference
        this.markers.push(marker);
      });
    },
    
    // Helper function to create SVG marker for rider
    createRiderMarkerSVG(avatarUrl, statusColor) {
      // Use a default avatar if not provided
      const avatar = avatarUrl || '/images/default-avatar.png';
      
      // Create SVG as a data URL
      const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
          <defs>
            <pattern id="avatar" patternUnits="userSpaceOnUse" width="40" height="40">
              <image href="${avatar}" width="40" height="40" />
            </pattern>
          </defs>
          <circle cx="20" cy="20" r="19" fill="url(#avatar)" stroke="white" stroke-width="2"/>
          <circle cx="30" cy="30" r="5" fill="${statusColor}" stroke="white" stroke-width="2"/>
        </svg>
      `;
      
      // Convert SVG to base64 data URL
      return 'data:image/svg+xml;base64,' + btoa(svgContent);
    },
    
    centerOnUserLocation() {
      if (!this.map) return;
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            
            // Update user location
            this.userLocation = pos;
            
            // Center map and update user marker
            this.map.setCenter(pos);
            this.map.setZoom(15);
            this.addUserMarker();
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    },
    
    refreshRiders() {
      // Reload riders data and update markers
      //this.loadRiders();
    },
    
    // Method to select a rider from the map popup
    selectRiderFromMap(riderId) {
      const rider = this.riders.find(r => r.id === riderId);
      if (rider) {
        this.selectRider(rider);
      }
    },
    
    // Calculate route between user and rider (optional)
    calculateRoute(destination) {
      if (!this.map || !window.google || !google.maps.DirectionsService) return;
      
      const directionsService = new google.maps.DirectionsService();
      
      // Remove previous directions if any
      if (this.directionsRenderer) {
        this.directionsRenderer.setMap(null);
      }
      
      // Create new directions renderer
      this.directionsRenderer = new google.maps.DirectionsRenderer({
        map: this.map,
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#E53945',
          strokeWeight: 5,
          strokeOpacity: 0.7
        }
      });
      
      // Calculate route
      directionsService.route(
        {
          origin: this.userLocation,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING
        },
        (response, status) => {
          if (status === 'OK') {
            this.directionsRenderer.setDirections(response);
          } else {
            console.error('Directions request failed:', status);
          }
        }
      );
    }
  },
  mounted() {
    // Define global function to handle map popup button clicks
    window.selectRiderFromMap = (riderId) => {
      this.selectRiderFromMap(riderId);
    };
    
    // Initialize map
    this.initMap();
    
    // Load rider data
    //this.loadRiders();
  },
  beforeDestroy() {
    // Clean up
    if (this.pulseInterval) {
      clearInterval(this.pulseInterval);
    }
    
    // Clean up markers
    if (this.userMarker) {
      this.userMarker.setMap(null);
    }
    
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    
    // Remove global function
    delete window.selectRiderFromMap;
    
    // Clean up directions renderer if exists
    if (this.directionsRenderer) {
      this.directionsRenderer.setMap(null);
    }
  }
};
  </script>
  <style lang="scss" scoped>
  // Variables
  $primary: #E53945;
  $secondary: #f79939;
  $charcoal: #36454F;
  $border-grey: #E0E0E0;
  $background-light: #f9f9f9;
  $light-grey: #f5f5f5;
  $faint: #686868;
  $success-green: #2ecc71;
  $warning-yellow: #f1c40f;
  $info-blue: #3498db;
  
  // Global styles
  .book-rider-page {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: $charcoal;
    line-height: 1.6;
    background-color: $background-light;
    min-height: 100vh;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  // Header
  .header {
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 50;
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      
      h1 {
        font-size: 20px;
        font-weight: 600;
        margin: 0;
      }
    }
    
    .user-actions {
      .history-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border: 1px solid $border-grey;
        border-radius: 20px;
        background: none;
        cursor: pointer;
        transition: all 0.2s;
        
        &:hover {
          background-color: $light-grey;
        }
      }
    }
  }
  
  // Main content
  .main-content {
    padding: 24px 0 40px;
    
    .container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      
      @media (min-width: 992px) {
        flex-direction: row;
        align-items: flex-start;
      }
    }
  }
  
  // Map
  .map-container {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    flex: 1;
    
    @media (min-width: 992px) {
      flex: 2;
      position: sticky;
      top: 80px;
    }
    
    .map {
      height: 300px;
      background-color: #e5e3df;
      
      @media (min-width: 768px) {
        height: 400px;
      }
      
      @media (min-width: 992px) {
        height: calc(100vh - 120px);
        max-height: 700px;
      }
    }
    
    .map-controls {
      position: absolute;
      top: 12px;
      right: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      
      .control-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        background-color: white;
        border: none;
        border-radius: 4px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        transition: all 0.2s;
        
        &:hover {
          background-color: $light-grey;
        }
      }
    }
  }
  
  // Booking panel
  .booking-panel {
    flex: 1;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    
    @media (min-width: 992px) {
      flex: 1;
      max-width: 400px;
    }
    
    .panel-tabs {
      display: flex;
      border-bottom: 1px solid $border-grey;
      
      .tab-btn {
        flex: 1;
        padding: 16px;
        background: none;
        border: none;
        cursor: pointer;
        font-weight: 500;
        color: $faint;
        transition: all 0.2s;
        
        &:hover {
          background-color: $light-grey;
        }
        
        &.active {
          color: $primary;
          border-bottom: 2px solid $primary;
        }
      }
    }
    
    .tab-content {
      padding: 16px;
      max-height: 600px;
      overflow-y: auto;
    }
  }
  
  // Search box
  .search-box {
    display: flex;
    margin-bottom: 16px;
    
    input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid $border-grey;
      border-right: none;
      border-radius: 8px 0 0 8px;
      font-size: 14px;
      
      &:focus {
        outline: none;
        border-color: $primary;
        & + .search-btn {
          border-color: $primary;
        }
      }
    }
    
    .search-btn {
      padding: 12px 16px;
      background-color: $light-grey;
      border: 1px solid $border-grey;
      border-radius: 0 8px 8px 0;
      cursor: pointer;
      
      &:hover {
        background-color: darken($light-grey, 5%);
      }
    }
  }
  
  // Rider list
  .riders-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    .no-riders {
      text-align: center;
      padding: 32px 0;
      
      p {
        margin-bottom: 16px;
        color: $faint;
      }
      
      .refresh-riders-btn {
        padding: 10px 20px;
        background-color: $primary;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s;
        
        &:hover {
          background-color: darken($primary, 10%);
        }
      }
    }
  }
  
  // Rider card
  .rider-card {
    display: flex;
    background-color: $light-grey;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .rider-avatar {
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 16px;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .status-badge {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid white;
        
        &.online {
          background-color: $success-green;
        }
        
        &.busy {
          background-color: $warning-yellow;
        }
        
        &.offline {
          background-color: $faint;
        }
      }
      
      &.large {
        width: 80px;
        height: 80px;
      }
    }
    
    .rider-info {
      flex: 1;
      
      h3 {
        margin: 0 0 6px;
        font-size: 16px;
      }
      
      .rider-details {
        display: flex;
        gap: 12px;
        font-size: 13px;
        margin-bottom: 6px;
        
        .rating {
          display: flex;
          align-items: center;
          gap: 4px;
          color: $warning-yellow;
        }
        
        .distance {
          color: $faint;
        }
      }
      
      .last-active {
        font-size: 12px;
        color: $faint;
        margin: 0;
      }
    }
    
    .rider-stats {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 8px;
      
      .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .stat-value {
          font-weight: 600;
          font-size: 14px;
        }
        
        .stat-label {
          font-size: 11px;
          color: $faint;
        }
      }
    }
  }
  
  // Deliveries list
  .deliveries-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    .no-deliveries {
      text-align: center;
      padding: 32px 0;
      
      p {
        margin-bottom: 16px;
        color: $faint;
      }
      
      .book-rider-btn {
        padding: 10px 20px;
        background-color: $primary;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s;
        
        &:hover {
          background-color: darken($primary, 10%);
        }
      }
    }
  }
  
  // Delivery card
  .delivery-card {
    background-color: $light-grey;
    border-radius: 8px;
    padding: 16px;
    
    .delivery-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      
      h3 {
        margin: 0;
        font-size: 16px;
      }
      
      .status-pill {
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
        
        &.pending {
          background-color: rgba($info-blue, 0.1);
          color: $info-blue;
        }
        
        &.scheduled {
          background-color: rgba($warning-yellow, 0.1);
          color: darken($warning-yellow, 10%);
        }
        
        &.in-progress {
          background-color: rgba($primary, 0.1);
          color: $primary;
        }
        
        &.completed {
          background-color: rgba($success-green, 0.1);
          color: $success-green;
        }
        
        &.cancelled {
          background-color: rgba($faint, 0.1);
          color: $faint;
        }
      }
    }
    
    .delivery-details {
      margin-bottom: 16px;
      
      .detail-row {
        display: flex;
        margin-bottom: 6px;
        font-size: 14px;
        
        .detail-label {
          width: 120px;
          color: $faint;
        }
        
        .detail-value {
          font-weight: 500;
        }
      }
    }
    
    .delivery-actions {
      display: flex;
      gap: 8px;
      
      button {
        flex: 1;
        padding: 8px 0;
        border-radius: 6px;
        border: none;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      
      .track-btn {
        background-color: $info-blue;
        color: white;
        
        &:hover {
          background-color: darken($info-blue, 10%);
        }
      }
      
      .cancel-btn {
        background-color: $light-grey;
        border: 1px solid $border-grey;
        color: $charcoal;
        
        &:hover {
          background-color: darken($light-grey, 5%);
        }
      }
    }
  }
  
  // Rider detail panel
  .rider-detail-panel {
    padding: 0;
    
    .panel-header {
      display: flex;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid $border-grey;
      
      .back-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        background: none;
        border: none;
        cursor: pointer;
        color: $primary;
        font-weight: 500;
        padding: 0;
        margin-right: 16px;
      }
      
      h2 {
        margin: 0;
        font-size: 18px;
      }
    }
  }
  
  .rider-detail {
    padding: 16px;
    
    .rider-profile {
      display: flex;
      margin-bottom: 24px;
      
      .rider-profile-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        h3 {
          margin: 0 0 8px;
          font-size: 18px;
        }
        
        .rider-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          
          .stars {
            display: flex;
            color: $warning-yellow;
          }
          
          .rating-value {
            font-size: 14px;
            color: $faint;
          }
        }
      }
    }
    
    .rider-stats-detail {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 0;
      border-top: 1px solid $border-grey;
      border-bottom: 1px solid $border-grey;
      margin-bottom: 24px;
      
      .stat-detail {
        display: flex;
        align-items: center;
        gap: 12px;
        
        .stat-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: $light-grey;
          border-radius: 8px;
          color: $primary;
        }
        
        .stat-info {
          display: flex;
          flex-direction: column;
          
          .stat-label {
            font-size: 12px;
            color: $faint;
          }
          
          .stat-value {
            font-weight: 500;
          }
        }
      }
    }
    
    .booking-form {
      h3 {
        margin-top: 0;
        margin-bottom: 16px;
        font-size: 18px;
      }
      
      .form-group {
        margin-bottom: 16px;
        
        label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
        }
        
        input, textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid $border-grey;
          border-radius: 8px;
          font-size: 14px;
          
          &:focus {
            outline: none;
            border-color: $primary;
          }
        }
        
        textarea {
          min-height: 80px;
          resize: vertical;
        }
      }
      
      .estimated-cost {
        display: flex;
        justify-content: space-between;
        padding: 16px;
        background-color: $light-grey;
        border-radius: 8px;
        margin-bottom: 16px;
        
        .cost-label {
          font-weight: 500;
        }
        
        .cost-value {
          font-weight: 600;
          font-size: 18px;
          color: $primary;
        }
      }
      
      .book-btn {
        width: 100%;
        padding: 14px;
        background-color: $primary;
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
        
        &:hover {
          background-color: darken($primary, 10%);
        }
        
        &:disabled {
          background-color: lighten($primary, 20%);
          cursor: not-allowed;
        }
      }
    }
  }
  
  // Modal
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    
    .modal {
      background-color: white;
      border-radius: 12px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      
      .modal-content {
        padding: 24px;
        text-align: center;
        
        .success-icon {
          color: $success-green;
          margin-bottom: 16px;
        }
        
        h2 {
          margin-top: 0;
          margin-bottom: 16px;
          font-size: 20px;
        }
        
        p {
          margin-bottom: 24px;
          color: $faint;
        }
        
        .modal-actions {
          .confirm-btn {
            padding: 12px 24px;
            background-color: $primary;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
            
            &:hover {
              background-color: darken($primary, 10%);
            }
          }
        }
      }
    }
  }
  </style>