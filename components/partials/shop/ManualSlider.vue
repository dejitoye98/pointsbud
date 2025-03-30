<template>
    <div class="manual-slider-container">
      <div class="slider-controls" v-if="showControls">
        <button 
          class="control-arrow prev-arrow" 
          @click="scrollLeft"
          :disabled="atLeftEdge"
          :class="{ disabled: atLeftEdge }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button 
          class="control-arrow next-arrow" 
          @click="scrollRight"
          :disabled="atRightEdge"
          :class="{ disabled: atRightEdge }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
      
      <div 
        ref="sliderTrack" 
        class="slider-track"
        @mousedown="startDrag"
        @touchstart="startDrag"
        @mouseup="endDrag"
        @touchend="endDrag"
        @mouseleave="endDrag"
        @mousemove="onDrag"
        @touchmove="onDrag"
      >
        <div ref="sliderContent" class="slider-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      scrollAmount: {
        type: Number,
        default: 300
      },
      showControls: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        isDragging: false,
        startX: 0,
        scrollLeft: 0,
        atLeftEdge: true,
        atRightEdge: false
      };
    },
    mounted() {
      this.checkEdges();
      window.addEventListener('resize', this.checkEdges);
      this.$nextTick(() => {
        this.$refs.sliderTrack.addEventListener('scroll', this.handleScroll, { passive: true });
        this.checkEdges();
      });
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkEdges);
      if (this.$refs.sliderTrack) {
        this.$refs.sliderTrack.removeEventListener('scroll', this.handleScroll);
      }
    },
    methods: {
      startDrag(e) {
        this.isDragging = true;
        this.startX = this.getClientX(e);
        this.scrollLeft = this.$refs.sliderTrack.scrollLeft;
        this.$refs.sliderTrack.style.cursor = 'grabbing';
        this.$refs.sliderTrack.style.userSelect = 'none';
      },
      endDrag() {
        this.isDragging = false;
        this.$refs.sliderTrack.style.cursor = 'grab';
        this.$refs.sliderTrack.style.removeProperty('user-select');
      },
      onDrag(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        
        const x = this.getClientX(e);
        const walk = (x - this.startX) * 1.5; // The multiplier determines the speed
        this.$refs.sliderTrack.scrollLeft = this.scrollLeft - walk;
      },
      getClientX(e) {
        // Support both mouse and touch events
        return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      },
      scrollLeft() {
        this.$refs.sliderTrack.scrollBy({ 
          left: -this.scrollAmount, 
          behavior: 'smooth' 
        });
      },
      scrollRight() {
        this.$refs.sliderTrack.scrollBy({ 
          left: this.scrollAmount, 
          behavior: 'smooth' 
        });
      },
      handleScroll() {
        this.checkEdges();
      },
      checkEdges() {
        const track = this.$refs.sliderTrack;
        if (!track) return;
        
        this.atLeftEdge = track.scrollLeft <= 0;
        this.atRightEdge = Math.floor(track.scrollLeft + track.clientWidth) >= track.scrollWidth - 1;
      }
    }
  };
  </script>
  
  <style scoped>
  .manual-slider-container {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  
  .slider-track {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    scroll-behavior: smooth;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    cursor: grab;
    -webkit-overflow-scrolling: touch;
    padding: 10px 0;
  }
  
  .slider-track::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }
  
  .slider-content {
    display: flex;
    gap: 20px;
    padding: 0 10px;
  }
  
  .slider-controls {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    z-index: 10;
    pointer-events: none;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
  }
  
  .control-arrow {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #E53945;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
    transition: opacity 0.2s ease, transform 0.2s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .control-arrow:hover {
    transform: scale(1.1);
  }
  
  .control-arrow.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    .control-arrow {
      width: 36px;
      height: 36px;
    }
    
    .slider-controls {
      padding: 0 10px;
    }
  }
  </style>