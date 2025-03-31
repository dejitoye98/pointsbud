<template>
    <div class="landing">
      <div class="landing__container">
        <div class="landing__content">
          <h1 class="landing__title">👋 You're not alone. You're just working.</h1>
          <p class="landing__subtitle">Jump into a quiet room with others doing their thing.</p>
          
          <form class="landing__form" @submit.prevent="joinRoom">
            <div class="landing__form-group">
              <input
                ref="nameInput"
                v-model="user.name"
                type="text"
                class="landing__input"
                placeholder="Jess"
                @input="resetFunFactTimeout"
              >
              <label class="landing__label">Your name</label>
            </div>
            
            <div class="landing__form-group">
              <input
                v-model="user.funFact"
                type="text"
                class="landing__input"
                :placeholder="funFactPlaceholder"
                @input="resetFunFactTimeout"
              >
              <label class="landing__label">Fun fact or emoji</label>
            </div>
            
            <div class="landing__form-group">
              <textarea
                v-model="user.activity"
                class="landing__textarea"
                placeholder="Finishing a pitch deck..."
                @keydown.enter="handleEnterKey"
              ></textarea>
              <label class="landing__label">What are you working on?</label>
            </div>
            
            <button
              type="submit"
              class="landing__button"
              :class="{ 'landing__button--active': isFormValid }"
              :disabled="!isFormValid"
            >
              🔵 Join the Room
            </button>
          </form>
        </div>
        
        <div class="landing__stats">
          <div class="landing__stats-item">
            <span class="landing__stats-icon">🌎</span>
            <span class="landing__stats-text">
              <span class="landing__stats-count">{{ stats.onlineUsers }}</span> people online now
              <span class="landing__live-indicator"></span>
            </span>
          </div>
          <div class="landing__stats-item">
            <span class="landing__stats-icon">🛋️</span>
            <span class="landing__stats-text">
              <span class="landing__stats-count">{{ stats.activeRooms }}</span> rooms active
            </span>
          </div>
          <div class="landing__stats-item">
            <span class="landing__stats-icon">⏱️</span>
            <span class="landing__stats-text">Avg focus time: {{ stats.avgFocusTime }} mins</span>
          </div>
          
          <!-- Live activity feed -->
          <div class="landing__live-feed">
            <div class="landing__live-feed-title">Recent joins <span class="landing__live-indicator"></span></div>
            <ul class="landing__live-feed-list">
              <li v-for="(activity, index) in recentActivities" :key="index" class="landing__live-feed-item"
                  :style="{ animationDelay: index * 0.2 + 's' }">
                <span class="landing__live-feed-name">{{ activity.name }}</span>
                <span class="landing__live-feed-activity">{{ activity.activity }}</span>
                <span class="landing__live-feed-time">{{ activity.time }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Joining modal that appears after form submission -->
      <div v-if="isJoining" class="landing__joining">
        <div class="landing__joining-content">
          <h2 class="landing__joining-title">Joining room...</h2>
          <div class="landing__joining-avatars">
            <div v-for="i in 5" :key="i" class="landing__joining-avatar"
                 :style="{ animationDelay: i * 0.2 + 's' }">
              <div class="landing__avatar-circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RoommateLandingPage',
    data() {
      return {
        user: {
          name: '',
          funFact: '',
          activity: ''
        },
        funFactPlaceholder: 'Likes rainy days ☔️',
        funFactSuggestions: [
          'Likes rainy days ☔️',
          'Coffee enthusiast ☕',
          'Night owl 🦉',
          'Podcast junkie 🎧',
          'Plant parent 🌱'
        ],
        funFactTimeout: null,
        stats: {
          onlineUsers: 178,
          activeRooms: 12,
          avgFocusTime: 32
        },
        recentActivities: [
          { name: 'Alex', activity: 'Working on thesis', time: '2m ago' },
          { name: 'Maya', activity: 'Coding a new website', time: '5m ago' },
          { name: 'Sam', activity: 'Preparing for interview', time: '7m ago' },
          { name: 'Taylor', activity: 'Editing photos', time: '12m ago' },
        ],
        isJoining: false,
        statUpdateInterval: null
      }
    },
    computed: {
      isFormValid() {
        return this.user.activity.trim().length > 0
      }
    },
    mounted() {
      // Focus on name input when component loads
      this.$nextTick(() => {
        this.$refs.nameInput.focus()
      })
      
      // Set timeout to suggest fun fact
      this.setFunFactTimeout()
      
      // Simulate live updates to stats
      this.startLiveUpdates()
    },
    beforeDestroy() {
      // Clean up intervals
      clearTimeout(this.funFactTimeout)
      clearInterval(this.statUpdateInterval)
    },
    methods: {
      setFunFactTimeout() {
        this.funFactTimeout = setTimeout(() => {
          if (!this.user.funFact) {
            const randomIndex = Math.floor(Math.random() * this.funFactSuggestions.length)
            this.funFactPlaceholder = this.funFactSuggestions[randomIndex]
          }
        }, 5000)
      },
      resetFunFactTimeout() {
        clearTimeout(this.funFactTimeout)
        this.setFunFactTimeout()
      },
      handleEnterKey(e) {
        // Prevent default Enter key behavior in textarea
        // but allow form submission if valid
        if (this.isFormValid) {
          e.preventDefault()
          this.joinRoom()
        }
      },
      startLiveUpdates() {
        // Simulate fluctuating user counts to create "live" feeling
        this.statUpdateInterval = setInterval(() => {
          // Random fluctuation in user count (±5)
          const userDelta = Math.floor(Math.random() * 11) - 5
          this.stats.onlineUsers = Math.max(150, this.stats.onlineUsers + userDelta)
          
          // Occasionally change room count
          if (Math.random() > 0.7) {
            const roomDelta = Math.random() > 0.5 ? 1 : -1
            this.stats.activeRooms = Math.max(5, this.stats.activeRooms + roomDelta)
          }
          
          // Occasionally add new activity
          if (Math.random() > 0.85) {
            this.addRandomActivity()
          }
        }, 3000)
      },
      addRandomActivity() {
        const names = ['Jamie', 'Riley', 'Jordan', 'Casey', 'Quinn', 'Morgan', 'Blake']
        const activities = ['Studying for finals', 'Writing a blog post', 'Researching topics', 'Making presentation slides', 'Drafting emails']
        const times = ['just now', '1m ago', '2m ago']
        
        const newActivity = {
          name: names[Math.floor(Math.random() * names.length)],
          activity: activities[Math.floor(Math.random() * activities.length)],
          time: times[Math.floor(Math.random() * times.length)]
        }
        
        // Add to beginning, remove from end if too many
        this.recentActivities.unshift(newActivity)
        if (this.recentActivities.length > 6) {
          this.recentActivities.pop()
        }
      },
      joinRoom() {
        if (!this.isFormValid) return
        
        // Save user info to session
        this.saveUserSession()
        
        // Show joining animation
        this.isJoining = true
        
        // Simulate joining a room (would connect to backend in real implementation)
        setTimeout(() => {
          this.$router.push('/room')
        }, 1500)
      },
      saveUserSession() {
        // Save to localStorage for demo purposes
        // In production, would use Supabase/Firebase as recommended
        const sessionData = {
          name: this.user.name || 'Anonymous',
          funFact: this.user.funFact || this.funFactPlaceholder,
          activity: this.user.activity
        }
        
        localStorage.setItem('roommate_session', JSON.stringify(sessionData))
        
        // Would also send to API in real implementation
        console.log('Saved session:', sessionData)
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  // BEM convention applied throughout
  
  .landing {
    // Block: Main landing page container
    position: relative;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #333;
    
    &__container {
      // Element: Inner container with max width
      width: 100%;
      max-width: 1200px;
      padding: 2rem;
      display: flex;
      gap: 3rem;
      
      @media (max-width: 768px) {
        flex-direction: column;
        gap: 2rem;
      }
    }
    
    &__content {
      // Element: Left side content container
      flex: 1;
      opacity: 0;
      animation: fadeIn 0.6s ease-out forwards;
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    }
    
    &__title {
      // Element: Main heading
      font-size: 2.25rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #333;
      line-height: 1.2;
    }
    
    &__subtitle {
      // Element: Subheading text
      font-size: 1.125rem;
      color: #666;
      margin-bottom: 2rem;
    }
    
    &__form {
      // Element: Form container
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      margin-bottom: 2rem;
      max-width: 500px;
    }
    
    &__form-group {
      // Element: Input group with label
      position: relative;
    }
    
    &__input, &__textarea {
      // Element: Common styles for inputs
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 0.5rem;
      background-color: white;
      transition: all 0.2s;
      
      &:focus {
        outline: none;
        border-color: #4D7AE8;
        box-shadow: 0 0 0 2px rgba(77, 122, 232, 0.1);
      }
      
      &::placeholder {
        color: #aaa;
      }
    }
    
    &__textarea {
      // Element: Specific styles for textarea
      min-height: 80px;
      resize: vertical;
    }
    
    &__label {
      // Element: Form labels
      display: block;
      margin-bottom: 0.25rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #555;
    }
    
    &__button {
      // Element: Submit button
      padding: 0.75rem 1rem;
      font-size: 1rem;
      font-weight: 500;
      border: none;
      border-radius: 0.5rem;
      background-color: #eee;
      color: #888;
      cursor: not-allowed;
      transition: all 0.2s;
      margin-top: 0.5rem;
      
      // Modifier: Active state of button
      &--active {
        background-color: #4D7AE8;
        color: white;
        cursor: pointer;
        
        &:hover {
          background-color: #3D6AD8;
        }
      }
    }
    
    &__stats {
      // Element: Stats container
      flex: 0 0 320px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      
      @media (max-width: 768px) {
        flex: auto;
      }
    }
    
    &__stats-item {
      // Element: Individual stat item
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1rem;
      padding: 0.75rem;
      background-color: #f9f9f9;
      border-radius: 0.5rem;
    }
    
    &__stats-icon {
      // Element: Stat icon
      font-size: 1.25rem;
    }
    
    &__stats-text {
      // Element: Stat text
      color: #444;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    &__stats-count {
      // Element: Number that updates
      font-weight: 600;
      position: relative;
      
      &::after {
        content: "";
        position: absolute;
        height: 2px;
        bottom: -2px;
        left: 0;
        width: 100%;
        background-color: #4D7AE8;
        opacity: 0;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease-out, opacity 0.3s;
      }
      
      &.updated::after {
        opacity: 0.6;
        transform: scaleX(1);
      }
    }
    
    &__live-indicator {
      // Element: Pulsing dot to indicate live data
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #4CAF50;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #4CAF50;
        animation: pulse 2s infinite;
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          70% {
            transform: scale(2);
            opacity: 0;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      }
    }
    
    &__live-feed {
      // Element: Live feed of recent joins
      margin-top: 1rem;
      border-radius: 0.5rem;
      overflow: hidden;
      background-color: #f9f9f9;
    }
    
    &__live-feed-title {
      // Element: Live feed header
      padding: 0.75rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #444;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    &__live-feed-list {
      // Element: List of recent activities
      list-style: none;
      padding: 0;
      margin: 0;
      max-height: 240px;
      overflow-y: auto;
    }
    
    &__live-feed-item {
      // Element: Single activity item
      padding: 0.75rem;
      border-bottom: 1px solid #eee;
      font-size: 0.875rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      animation: slideInFade 0.5s ease-out forwards;
      
      @keyframes slideInFade {
        from {
          opacity: 0;
          transform: translateY(-5px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      &:last-child {
        border-bottom: none;
      }
    }
    
    &__live-feed-name {
      // Element: User name in feed
      font-weight: 600;
      color: #333;
    }
    
    &__live-feed-activity {
      // Element: User activity in feed
      color: #666;
    }
    
    &__live-feed-time {
      // Element: Time indicator
      color: #999;
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }
    
    &__joining {
      // Element: Joining overlay
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.95);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
      animation: fadeInFast 0.3s ease-out forwards;
      
      @keyframes fadeInFast {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    }
    
    &__joining-content {
      // Element: Joining content wrapper
      text-align: center;
    }
    
    &__joining-title {
      // Element: Joining title
      font-size: 1.75rem;
      margin-bottom: 1.5rem;
      color: #333;
    }
    
    &__joining-avatars {
      // Element: Avatar animations container
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
    
    &__joining-avatar {
      // Element: Individual animated avatar
      opacity: 0;
      animation: popIn 0.5s ease-out forwards;
      
      @keyframes popIn {
        0% {
          opacity: 0;
          transform: scale(0.5);
        }
        70% {
          opacity: 1;
          transform: scale(1.1);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    }
    
    &__avatar-circle {
      // Element: Avatar circle
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f0f0f0;
      border: 2px solid #4D7AE8;
      position: relative;
      overflow: hidden;
      
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(135deg, transparent 0%, transparent 50%, rgba(77, 122, 232, 0.1) 50%, rgba(77, 122, 232, 0.3) 100%);
      }
    }
  }
  </style>