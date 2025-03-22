<template>
    <div class="bookmark-badge-container" :class="{ 'active': isActive, 'clicked': isClicked }">
      <div class="badge-pulse-wrapper" @mouseenter="startPulse" @mouseleave="stopPulse">
        <div class="badge-content" @click="handleClick">
          <div class="badge-icon-wrapper">
            <div class="badge-icon-pulse"></div>
            <div class="badge-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
          </div>
          <div class="badge-text">
            <p class="primary-text">Tap 'Bookmark' to save {{business?.name}}</p>
            <p class="reward-text">and instantly score <span class="points">5 Points!</span></p>
          </div>
          <div class="confetti-container" v-if="showConfetti">
            <div v-for="n in 30" :key="n" class="confetti" :style="getConfettiStyle(n)"></div>
          </div>
          <div class="glow-effect"></div>
        </div>
      </div>
      <div class="badge-cta" v-if="isClicked">
        <button @click="closePopup" class="close-btn">×</button>
        <div class="points-earned">
          <div class="points-icon">🎉</div>
          <div class="points-text">+5 Points Added!</div>
        </div>
        <p class="follow-up">Get quick access to your favourite spots by bookmarking more restaurants!</p>
        <button @click="exploreMore" class="explore-btn">Explore More</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['business'],
    data() {
      return {
        isPulsing: false,
        pulseInterval: null,
        isActive: false,
        isClicked: false,
        showConfetti: false,
        colors: ['#FFC700', '#FF0040', '#00FFFF', '#00FF00', '#FF8800']
      }
    },
    mounted() {
      // Start subtle animation to draw attention
      setTimeout(() => {
        this.isActive = true;
        this.startPulse();
      }, 1000);
      
      // Auto-stop pulsing after a while if no interaction
      setTimeout(() => {
        if (!this.isClicked) {
          this.stopPulse();
        }
      }, 8000);
    },
    beforeDestroy() {
      this.stopPulse();
    },
    methods: {
      startPulse() {
        if (this.isPulsing) return;
        this.isPulsing = true;
        this.isActive = true;
      },
      stopPulse() {
        if (!this.isClicked) {
          this.isPulsing = false;
          this.isActive = false;
        }
      },
      handleClick() {
        if (this.isClicked) return;
        
        // Show confetti
        this.showConfetti = true;
        this.isClicked = true;
        
        // Trigger haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate([15, 10, 15]);
        }
        
        // Emit event for parent component
        this.$emit('bookmark-clicked');
        
        // Hide confetti after animation
        setTimeout(() => {
          this.showConfetti = false;
        }, 2500);
      },
      closePopup() {
        this.isClicked = false;
        this.isActive = false;
        this.isPulsing = false;
      },
      exploreMore() {
        this.$emit('explore-more');
        this.closePopup();
      },
      getConfettiStyle(n) {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDelay = Math.random();
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        const randomDuration = 0.5 + Math.random() * 1;
        
        return {
          '--x': `${randomX}%`,
          '--y': `${randomY}%`,
          '--delay': `${randomDelay}s`,
          '--color': randomColor,
          '--duration': `${randomDuration}s`
        };
      }
    }
  }
  </script>
  
  <style scoped>
  .bookmark-badge-container {
    position: relative;
    width: 100%;
    max-width: 450px;
    margin: 10px auto;
    font-family: 'DM Sans', sans-serif;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    transform: scale(0.98);
    opacity: 0.95;
  }
  
  .bookmark-badge-container.active {
    transform: scale(1);
    opacity: 1;
  }
  
  .badge-pulse-wrapper {
    position: relative;
    overflow: hidden;
  }
  
  .badge-content {
    display: flex;
    align-items: center;
    background: linear-gradient(135deg, #0A1F36, #0D2845);
    padding: 12px 15px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    position: relative;
    cursor: pointer;
    overflow: hidden;
    z-index: 1;
    transition: all 0.3s ease;
  }
  
  .bookmark-badge-container.active .badge-content {
    box-shadow: 0 6px 20px rgba(255, 199, 0, 0.15);
  }
  
  .badge-content:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 199, 0, 0.25);
  }
  
  .badge-icon-wrapper {
    position: relative;
    margin-right: 12px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .badge-icon {
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, #FFC700, #FF8800);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    box-shadow: 0 2px 5px rgba(255, 136, 0, 0.3);
  }
  
  .badge-icon svg {
    width: 18px;
    height: 18px;
    color: #0A1F36;
  }
  
  .badge-icon-pulse {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(255, 199, 0, 0.6);
    z-index: 1;
    animation: pulse 2s infinite;
    opacity: 0;
  }
  
  .bookmark-badge-container.active .badge-icon-pulse {
    opacity: 1;
  }
  
  .badge-text {
    flex: 1;
  }
  
  .primary-text {
    color: white;
    font-weight: 600;
    font-size: 14px;
    margin: 0;
    line-height: 1.3;
  }
  
  .reward-text {
    color: #cccccc;
    font-size: 13px;
    margin: 2px 0 0;
  }
  
  .points {
    color: #FFC700;
    font-weight: 700;
    position: relative;
    display: inline-block;
  }
  
  .bookmark-badge-container.active .points {
    animation: shimmer 3s infinite;
  }
  
  .glow-effect {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 199, 0, 0.15) 0%, rgba(255, 199, 0, 0) 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }
  
  .bookmark-badge-container.active .glow-effect {
    opacity: 0.6;
    animation: pulse-glow 3s infinite;
  }
  
  /* Confetti */
  .confetti-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10;
  }
  
  .confetti {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: var(--color);
    top: 0;
    left: var(--x);
    opacity: 0;
    transform: translateY(0);
    animation: confetti-fall var(--duration) ease-in forwards;
    animation-delay: var(--delay);
  }
  
  /* CTA section that appears after click */
  .badge-cta {
    background: white;
    border-radius: 12px;
    padding: 15px;
    margin-top: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    position: relative;
    animation: slide-up 0.4s ease forwards;
  }
  
  .close-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 24px;
    height: 24px;
    background: #f2f2f2;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #666;
  }
  
  .points-earned {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }
  
  .points-icon {
    font-size: 22px;
    margin-right: 10px;
  }
  
  .points-text {
    font-weight: 700;
    color: #0D2845;
    font-size: 16px;
  }
  
  .follow-up {
    color: #555;
    font-size: 13px;
    margin: 0 0 15px;
  }
  
  .explore-btn {
    background: linear-gradient(135deg, #0A1F36, #0D2845);
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    transition: all 0.2s ease;
  }
  
  .explore-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(13, 40, 69, 0.2);
  }
  
  /* Animations */
  @keyframes pulse {
    0% {
      transform: scale(0.8);
      opacity: 0.7;
    }
    70% {
      transform: scale(1.5);
      opacity: 0;
    }
    100% {
      transform: scale(0.8);
      opacity: 0;
    }
  }
  
  @keyframes shimmer {
    0% {
      text-shadow: 0 0 5px rgba(255, 199, 0, 0.3);
    }
    50% {
      text-shadow: 0 0 15px rgba(255, 199, 0, 0.8);
    }
    100% {
      text-shadow: 0 0 5px rgba(255, 199, 0, 0.3);
    }
  }
  
  @keyframes pulse-glow {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 0.2;
    }
  }
  
  @keyframes confetti-fall {
    0% {
      opacity: 1;
      transform: translateY(0) rotate(0deg);
    }
    100% {
      opacity: 0;
      transform: translateY(100px) rotate(720deg);
    }
  }
  
  @keyframes slide-up {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Mobile Optimization */
  @media (max-width: 480px) {
    .badge-content {
      padding: 10px 12px;
    }
    
    .badge-icon-wrapper {
      width: 35px;
      height: 35px;
      margin-right: 10px;
    }
    
    .primary-text {
      font-size: 13px;
    }
    
    .reward-text {
      font-size: 12px;
    }
  }
  </style>