<template>
<div class="survey-container">
<!-- Landing Page Section -->
<div v-if="currentStep === 'landing'" class="landing-card">
  <div class="header">
    <h1>Pointsbud Survey</h1>
    <div class="sub-header">Win Food Vouchers in Abule Oja!</div>
  </div>
  
  <div class="content">
    <div class="offer-details">
      <div class="icon-container">
        <i class="fas fa-gift"></i>
      </div>
      <p>Complete our quick survey and get a chance to win delicious food vouchers redeemable at popular restaurants in Abule Oja!</p>
    </div>
    
    <div class="steps">
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-text">Answer 6 simple questions</div>
      </div>
      <div class="step">
        <div class="step-number">2</div>
        <div class="step-text">Submit your contact details</div>
      </div>
      <div class="step">
        <div class="step-number">3</div>
        <div class="step-text">Get your voucher instantly!</div>
      </div>
    </div>
    
    <div class="call-to-action">
      <button @click="startSurvey" class="primary-button">Start Survey Now</button>
      <p class="time-estimate">Takes only 2 minutes!</p>
    </div>
  </div>
  
  <div class="footer">
    <p>Limited time offer. Vouchers available while supplies last.</p>
    <div class="logos">
      <span>Participating restaurants:</span>
      <div class="restaurant-logos">
        <div class="logo-placeholder"></div>
        <div class="logo-placeholder"></div>
        <div class="logo-placeholder"></div>
      </div>
    </div>
  </div>
</div>

<!-- Question Section -->
<div v-else-if="currentStep === 'questions'" class="survey-card">
  <div class="survey-header">
    <h2>Pointsbud Survey</h2>
    <div class="progress-bar">
      <div class="progress-indicator" :style="{ width: progressPercentage + '%' }"></div>
    </div>
    <p class="question-counter">Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</p>
  </div>

  <div class="question-container">
    <div class="question">
      <h3>{{ questions[currentQuestionIndex].text }}</h3>
      
      <div class="options">
        <label 
          v-for="(option, index) in questions[currentQuestionIndex].options" 
          :key="index" 
          class="option"
          :class="{ selected: answers[currentQuestionIndex] === option }"
        >
          <input 
            type="radio" 
            :name="'question_' + currentQuestionIndex" 
            :value="option" 
            style="opacity: 0;"
            v-model="answers[currentQuestionIndex]" 
            class="hidden-radio"
          />
          <div class="radio-button">
            <div class="inner-circle" v-if="answers[currentQuestionIndex] === option"></div>
          </div>
          <div class="option-text">{{ option }}</div>
        </label>
        
        <!-- Text input for "Other" option if selected -->
        <div v-if="questions[currentQuestionIndex].allowOther && answers[currentQuestionIndex] === 'Other (specify)'" class="other-input">
          <input 
            type="text" 
            v-model="otherAnswer" 
            placeholder="Please specify..." 
            class="other-text-input"
          />
        </div>
      </div>
    </div>

    <div class="navigation-buttons">
      <button 
        v-if="currentQuestionIndex > 0" 
        @click="previousQuestion" 
        class="secondary-button"
      >
        Previous
      </button>
      <button 
        @click="nextQuestion" 
        class="primary-button" 
        :disabled="!answers[currentQuestionIndex]"
      >
        {{ currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next' }}
      </button>
    </div>
  </div>
</div>

<!-- Contact Information Section -->
<div v-else-if="currentStep === 'contact'" class="survey-card">
  <div class="survey-header">
    <h2>Almost Done!</h2>
    <p>Enter your WhatsApp number to see if you've won a voucher</p>
  </div>

  <div class="contact-form">
    <div class="input-group">
      <label for="phoneNumber">WhatsApp Number</label>
      <input 
        type="tel" 
        id="phoneNumber" 
        v-model="contactInfo.phoneNumber" 
        placeholder="+234 8012345678"
        class="form-input"
      />
    </div>

    <div class="agree-terms" @click="contactInfo.agreedToTerms = !contactInfo.agreedToTerms">
      <input 
        type="checkbox" 
        id="agreeTerms" 
        v-model="contactInfo.agreedToTerms"
      />
      <label for="agreeTerms">I agree to receive promotional messages from Pointsbud</label>
    </div>

    <button 
      @click="submitContactInfo" 
      class="primary-button" 
      :disabled="!contactInfo.phoneNumber || !contactInfo.agreedToTerms"
    >
      Get My Voucher
    </button>
  </div>
</div>

<!-- Results Section -->

<!-- Results Section with Redemption Button -->
<div v-else-if="currentStep === 'results'" class="survey-card results-card">
  <div class="confetti-animation">
    <div v-for="n in 20" :key="n" class="confetti-piece" :style="getRandomConfettiStyle()"></div>
  </div>
  
  <div class="result-header">
    <h2>Congratulations!</h2>
    <p>You've won a food voucher worth:</p>
  </div>

  <div class="voucher">
    <div class="voucher-amount">₦{{ voucherAmount }}</div>
    <div class="voucher-code">Code: {{ voucherCode }}</div>
  </div>

  <div class="voucher-info">
    <p>Your voucher has been sent to your WhatsApp number.</p>
    <p>Valid at participating restaurants in Abule Oja for the next 30 days.</p>
  </div>

  <!-- New Redemption Button -->
  <div class="redemption-section">
    <a 
      :href="redemptionWhatsappUrl" 
      target="_blank" 
      class="redemption-button"
    >
      Redeem Voucher Now
      <svg width="128" height="129" viewBox="0 0 128 129" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_6_2)">
        <path d="M2.73155 63.728C2.72855 74.5665 5.56055 85.1495 10.9456 94.4775L2.21655 126.348L34.8326 117.796C43.8537 122.707 53.9613 125.281 64.2326 125.281H64.2596C98.1671 125.281 125.769 97.69 125.783 63.7765C125.79 47.343 119.396 31.89 107.779 20.264C96.1636 8.63895 80.7161 2.23345 64.2571 2.22595C30.3456 2.22595 2.74605 29.816 2.73205 63.728" fill="url(#paint0_linear_6_2)"/>
        <path d="M0.535 63.708C0.5315 74.9365 3.465 85.898 9.042 95.56L0 128.574L33.7855 119.715C43.0945 124.79 53.5755 127.466 64.2405 127.47H64.268C99.392 127.47 127.985 98.8865 128 63.759C128.006 46.735 121.382 30.7265 109.35 18.684C97.3165 6.643 81.3165 0.007 64.268 0C29.138 0 0.549 28.58 0.535 63.708ZM20.6555 93.896L19.394 91.8935C14.091 83.4615 11.292 73.7175 11.296 63.712C11.307 34.5145 35.069 10.76 64.288 10.76C78.438 10.766 91.736 16.282 101.738 26.29C111.739 36.299 117.243 49.604 117.24 63.755C117.227 92.9525 93.464 116.71 64.268 116.71H64.247C54.7405 116.705 45.417 114.152 37.286 109.327L35.351 108.18L15.302 113.437L20.6555 93.896Z" fill="url(#paint1_linear_6_2)"/>
        <path d="M48.339 37.074C47.146 34.4225 45.8905 34.369 44.756 34.3225C43.827 34.2825 42.765 34.2855 41.704 34.2855C40.642 34.2855 38.9165 34.685 37.458 36.2775C35.998 37.8715 31.884 41.7235 31.884 49.558C31.884 57.3925 37.5905 64.9645 38.386 66.028C39.1825 67.0895 49.4025 83.6814 65.5885 90.0644C79.0405 95.3689 81.778 94.3139 84.6975 94.0479C87.6175 93.7829 94.1195 90.197 95.446 86.4785C96.7735 82.7605 96.7735 79.5735 96.3755 78.9075C95.9775 78.244 94.9155 77.8454 93.323 77.0494C91.7305 76.2534 83.901 72.4005 82.4415 71.869C80.9815 71.338 79.92 71.073 78.858 72.6675C77.796 74.2595 74.7465 77.8455 73.817 78.9075C72.8885 79.972 71.959 80.1044 70.367 79.3079C68.7735 78.5089 63.645 76.8294 57.5605 71.4049C52.8265 67.1839 49.6305 61.9715 48.7015 60.377C47.7725 58.785 48.602 57.922 49.4005 57.1285C50.116 56.415 50.9935 55.269 51.7905 54.3395C52.5845 53.4095 52.8495 52.746 53.3805 51.684C53.912 50.621 53.646 49.691 53.2485 48.8945C52.8495 48.098 49.755 40.2225 48.339 37.074Z" fill="white"/>
        </g>
        <defs>
        <linearGradient id="paint0_linear_6_2" x1="6180.54" y1="12414.5" x2="6180.54" y2="2.22595" gradientUnits="userSpaceOnUse">
        <stop stop-color="#1FAF38"/>
        <stop offset="1" stop-color="#60D669"/>
        </linearGradient>
        <linearGradient id="paint1_linear_6_2" x1="6400" y1="12857.4" x2="6400" y2="0" gradientUnits="userSpaceOnUse">
        <stop stop-color="#F9F9F9"/>
        <stop offset="1" stop-color="white"/>
        </linearGradient>
        <clipPath id="clip0_6_2">
        <rect width="128" height="129" fill="white"/>
        </clipPath>
        </defs>
      </svg>
    </a>
  </div>

  <div class="share-section">
    <p>Share this survey with friends:</p>
    <div class="social-buttons">
      <a 
        :href="whatsappShareUrl" 
        target="_blank" 
        class="social-button whatsapp"
      >
        <svg width="128" height="129" viewBox="0 0 128 129" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_6_2)">
          <path d="M2.73155 63.728C2.72855 74.5665 5.56055 85.1495 10.9456 94.4775L2.21655 126.348L34.8326 117.796C43.8537 122.707 53.9613 125.281 64.2326 125.281H64.2596C98.1671 125.281 125.769 97.69 125.783 63.7765C125.79 47.343 119.396 31.89 107.779 20.264C96.1636 8.63895 80.7161 2.23345 64.2571 2.22595C30.3456 2.22595 2.74605 29.816 2.73205 63.728" fill="url(#paint0_linear_6_2)"/>
          <path d="M0.535 63.708C0.5315 74.9365 3.465 85.898 9.042 95.56L0 128.574L33.7855 119.715C43.0945 124.79 53.5755 127.466 64.2405 127.47H64.268C99.392 127.47 127.985 98.8865 128 63.759C128.006 46.735 121.382 30.7265 109.35 18.684C97.3165 6.643 81.3165 0.007 64.268 0C29.138 0 0.549 28.58 0.535 63.708ZM20.6555 93.896L19.394 91.8935C14.091 83.4615 11.292 73.7175 11.296 63.712C11.307 34.5145 35.069 10.76 64.288 10.76C78.438 10.766 91.736 16.282 101.738 26.29C111.739 36.299 117.243 49.604 117.24 63.755C117.227 92.9525 93.464 116.71 64.268 116.71H64.247C54.7405 116.705 45.417 114.152 37.286 109.327L35.351 108.18L15.302 113.437L20.6555 93.896Z" fill="url(#paint1_linear_6_2)"/>
          <path d="M48.339 37.074C47.146 34.4225 45.8905 34.369 44.756 34.3225C43.827 34.2825 42.765 34.2855 41.704 34.2855C40.642 34.2855 38.9165 34.685 37.458 36.2775C35.998 37.8715 31.884 41.7235 31.884 49.558C31.884 57.3925 37.5905 64.9645 38.386 66.028C39.1825 67.0895 49.4025 83.6814 65.5885 90.0644C79.0405 95.3689 81.778 94.3139 84.6975 94.0479C87.6175 93.7829 94.1195 90.197 95.446 86.4785C96.7735 82.7605 96.7735 79.5735 96.3755 78.9075C95.9775 78.244 94.9155 77.8454 93.323 77.0494C91.7305 76.2534 83.901 72.4005 82.4415 71.869C80.9815 71.338 79.92 71.073 78.858 72.6675C77.796 74.2595 74.7465 77.8455 73.817 78.9075C72.8885 79.972 71.959 80.1044 70.367 79.3079C68.7735 78.5089 63.645 76.8294 57.5605 71.4049C52.8265 67.1839 49.6305 61.9715 48.7015 60.377C47.7725 58.785 48.602 57.922 49.4005 57.1285C50.116 56.415 50.9935 55.269 51.7905 54.3395C52.5845 53.4095 52.8495 52.746 53.3805 51.684C53.912 50.621 53.646 49.691 53.2485 48.8945C52.8495 48.098 49.755 40.2225 48.339 37.074Z" fill="white"/>
          </g>
          <defs>
          <linearGradient id="paint0_linear_6_2" x1="6180.54" y1="12414.5" x2="6180.54" y2="2.22595" gradientUnits="userSpaceOnUse">
          <stop stop-color="#1FAF38"/>
          <stop offset="1" stop-color="#60D669"/>
          </linearGradient>
          <linearGradient id="paint1_linear_6_2" x1="6400" y1="12857.4" x2="6400" y2="0" gradientUnits="userSpaceOnUse">
          <stop stop-color="#F9F9F9"/>
          <stop offset="1" stop-color="white"/>
          </linearGradient>
          <clipPath id="clip0_6_2">
          <rect width="128" height="129" fill="white"/>
          </clipPath>
          </defs>
        </svg>
      </a>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
name: 'PointsbudSurvey',
mounted() {
this.initDeviceId();
},
data() {
return {
  deviceId: '',
  currentStep: 'landing',
  currentQuestionIndex: 0,
  answers: Array(5).fill(null),
  otherAnswer: '',
  contactInfo: {
    phoneNumber: '',
    agreedToTerms: false
  },
  voucherAmount: 0,
  voucherCode: '',
  questions: [
    {
      text: 'How much of an issue is waiting in long lines when picking up food from your favorite spots?',
      options: ['Not an issue', 'Minor issue', 'Major issue']
    },
    {
      text: 'Would you prefer to pick up your food at a scheduled time, instead of waiting in line?',
      options: ['Yes', 'No', 'Maybe']
    },
    {
      text: 'If a service allowed you to skip the line for a small fee, would you use it regularly?',
      options: ['Yes', 'No', 'Occasionally']
    },
    {
      text: 'What would make you choose a faster food pickup option over the usual process?',
      options: ['Guaranteed shorter wait times', 'Ability to track order progress in real-time', 'Priority pickup option', 'Other (specify)'],
      allowOther: true
    },
    {
      text: 'If you could track your food pickup via WhatsApp and know exactly when it\'s ready, would that make your experience better?',
      options: ['Yes', 'No', 'Maybe']
    }
  ]
}
},
computed: {
  redemptionWhatsappUrl() {
    const message = encodeURIComponent(`Redeem Voucher ${this.voucherCode}`);
    return `https://wa.me/2348097000001?text=${message}`;
  },

progressPercentage() {
  return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
},
whatsappShareUrl() {
  const message = encodeURIComponent(
    "I just won a ₦" + this.voucherAmount + " food voucher from Pointsbud! Answer 6 quick questions and you could win too. Check it out: https://shop.pointsbud.com/survey"
  );
  return `https://wa.me/?text=${message}`;
}
},
methods: {
  sendSurveyData() {
  // Prepare survey data payload
  const surveyData = {
    voucher_value: this.voucherAmount,
    voucher_code:  this.voucherCode,
    amount: this.voucherAmount,
    phone: this.contactInfo.phoneNumber,
    answers: this.answers,
    device_id: this.deviceId
  };
  
  // Send data to server
  this.$api.post('/waitlist/demo', surveyData)
    .then(response => {
      console.log('Survey data sent successfully:', response);
      // Mark the survey as completed in localStorage
      localStorage.setItem('pointsbud_survey_completed', 'true');
    })
    .catch(error => {
      console.error('Error sending survey data:', error);
    });
},
initDeviceId() {
  // Check if deviceId already exists in localStorage
  let deviceId = localStorage.getItem('pointsbud_device_id');
  
  // If no deviceId exists, create and store a new one
  if (!deviceId) {
    deviceId = 'device_' + Math.random().toString(36).substring(2, 15) + 
               Math.random().toString(36).substring(2, 15);
    localStorage.setItem('pointsbud_device_id', deviceId);
  }
  
  // Set the deviceId in the component data
  this.deviceId = deviceId;
  
  // Check if user has already completed the survey
  const hasCompletedSurvey = localStorage.getItem('pointsbud_survey_completed');
  if (hasCompletedSurvey) {
    console.log('User has already completed the survey');
    // You could redirect or show a message that they've already taken the survey
  }
},
startSurvey() {
  // Check if user has already completed the survey
  const hasCompletedSurvey = localStorage.getItem('pointsbud_survey_completed');
  if (hasCompletedSurvey) {
    // Show a message that they've already taken the survey
    alert('You have already completed this survey and received a voucher. Thank you!');
    return;
  }
  
  this.currentStep = 'questions';
},
nextQuestion() {
  // If current answer is "Other", save the text input value
  if (this.answers[this.currentQuestionIndex] === 'Other (specify)') {
    this.answers[this.currentQuestionIndex] = 'Other: ' + this.otherAnswer;
  }
  
  if (this.currentQuestionIndex < this.questions.length - 1) {
    this.currentQuestionIndex++;
  } else {
    this.currentStep = 'contact';
  }
},
previousQuestion() {
  if (this.currentQuestionIndex > 0) {
    this.currentQuestionIndex--;
  }
},
submitContactInfo() {
  // Generate random voucher
  this.generateVoucher();
  
  // In a real application, you would save the survey data and contact info
  console.log('Survey answers:', this.answers);
  console.log('Contact info:', this.contactInfo);
  
  // Show results
  this.currentStep = 'results';
  
  // Send survey data to the server
  this.sendSurveyData();
},
generateVoucher() {
  // Generate random number between 0 and 1
  const randomValue = Math.random();
  
  // Determine voucher amount based on probability
  if (randomValue < 0.05) {
    // 5% chance of winning ₦3000
    this.voucherAmount = 1500;
  } else if (randomValue < 0.15) {
    // 10% chance of winning ₦1500
    this.voucherAmount = 1000;
  } else if (randomValue < 0.35) {
    // 20% chance of winning ₦500
    this.voucherAmount = 500;
  } else if (randomValue < 0.60) {
    // 25% chance of winning ₦200
    this.voucherAmount = 200;
  } else {
    // The rest (40%) win ₦100
    this.voucherAmount = 100;
  }
  
  // Generate random voucher code
  this.voucherCode = 'PB' + Math.floor(1000000 + Math.random() * 9000000);
},
getRandomConfettiStyle() {
  const colors = ['#FF4E50', '#FF8A00', '#FFCE00', '#3498db', '#2ecc71'];
  const left = Math.random() * 100;
  const animationDelay = Math.random() * 5;
  const size = Math.floor(Math.random() * 15) + 5;
  
  return {
    left: `${left}%`,
    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    width: `${size}px`,
    height: `${size}px`,
    animationDelay: `${animationDelay}s`
  };
}
}
}
</script>

<style lang="scss" scoped>
.survey-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
  font-family: 'Poppins', sans-serif;
  padding: 20px;
}

// Shared Card Styles
.landing-card, .survey-card {
  width: 100%;
  max-width: 600px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

// Landing Page Styles
.landing-card {
  .header {
    background: linear-gradient(90deg, #FF8A00, #FF4E50);
    color: white;
    padding: 30px;
    text-align: center;
    
    h1 {
      margin: 0;
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    
    .sub-header {
      font-size: 1.2rem;
      margin-top: 10px;
      font-weight: 400;
    }
  }
  
  .content {
    padding: 30px;
    
    .offer-details {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
      
      .icon-container {
        font-size: 2.5rem;
        color: #FF6B00;
        margin-right: 20px;
        flex-shrink: 0;
      }
      
      p {
        font-size: 1.1rem;
        line-height: 1.6;
        margin: 0;
        color: #444;
      }
    }
    
    .steps {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      
      .step {
        text-align: center;
        flex: 1;
        padding: 0 10px;
        
        .step-number {
          background-color: #FF6B00;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin: 0 auto 15px;
          font-size: 1.2rem;
        }
        
        .step-text {
          font-size: 0.95rem;
          color: #555;
          line-height: 1.4;
        }
      }
    }
    
    .call-to-action {
      text-align: center;
      margin-top: 20px;
      
      .time-estimate {
        margin-top: 15px;
        font-size: 0.9rem;
        color: #777;
      }
    }
  }
  
  .footer {
    background-color: #f8f9fa;
    padding: 20px 30px;
    border-top: 1px solid #eee;
    
    p {
      text-align: center;
      margin: 0 0 15px;
      font-size: 0.9rem;
      color: #666;
    }
    
    .logos {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      span {
        font-size: 0.85rem;
        color: #777;
        margin-bottom: 10px;
      }
      
      .restaurant-logos {
        display: flex;
        justify-content: center;
        gap: 15px;
        
        .logo-placeholder {
          width: 40px;
          height: 40px;
          background-color: #eee;
          border-radius: 8px;
        }
      }
    }
  }
}

// Question Styles
.survey-card {
  .survey-header {
    background: linear-gradient(90deg, #FF8A00, #FF4E50);
    color: white;
    padding: 20px 30px;
    text-align: center;
    
    h2 {
      margin: 0 0 15px;
      font-size: 1.8rem;
      font-weight: 600;
    }
    
    p {
      margin: 10px 0 0;
      font-size: 1rem;
    }
    
    .progress-bar {
      height: 6px;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 3px;
      overflow: hidden;
      margin: 15px 0 5px;
      
      .progress-indicator {
        height: 100%;
        background-color: white;
        border-radius: 3px;
        transition: width 0.3s ease;
      }
    }
    
    .question-counter {
      font-size: 0.85rem;
      opacity: 0.8;
      margin: 5px 0 0;
    }
  }
  
  .question-container {
    padding: 30px;
    
    .question {
      h3 {
        margin: 0 0 20px;
        font-size: 1.25rem;
        color: #333;
        line-height: 1.4;
        font-weight: 500;
      }
      
      .options {
        .option {
          display: flex;
          align-items: center;
          padding: 14px 18px;
          margin-bottom: 12px;
          background-color: #f8f9fa;
          border: 1px solid #eee;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          
          &:hover {
            background-color: #f0f2f5;
          }
          
          &.selected {
            background-color: rgba(255, 107, 0, 0.08);
            border-color: #FF6B00;
          }
          
          .radio-button {
            width: 22px;
            height: 22px;
            border: 2px solid #bbb;
            border-radius: 50%;
            margin-right: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            
            .inner-circle {
              width: 12px;
              height: 12px;
              background-color: #FF6B00;
              border-radius: 50%;
            }
          }
          
          &.selected .radio-button {
            border-color: #FF6B00;
          }
          
          .option-text {
            font-size: 1.05rem;
            color: #444;
          }
        }
        
        .other-input {
          padding: 0 18px 18px;
          margin-top: -8px;
          
          .other-text-input {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.2s;
            
            &:focus {
              border-color: #FF6B00;
              outline: none;
            }
          }
        }
      }
    }
    
    .navigation-buttons {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      
      button {
        padding: 12px 25px;
      }
      
      .secondary-button {
        background-color: transparent;
        color: #555;
        border: 1px solid #ddd;
        
        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
  }
}

// Contact Form Styles
.contact-form {
  padding: 30px;
  
  .input-group {
    margin-bottom: 20px;
    
    label {
      display: block;
      margin-bottom: 8px;
      font-size: 0.95rem;
      color: #555;
      font-weight: 500;
    }
    
    .form-input {
      width: 100%;
      padding: 14px 16px;
      border: 1px solid #ddd;
      border-radius: 10px;
      font-size: 1rem;
      transition: border-color 0.2s;
      
      &:focus {
        border-color: #FF6B00;
        outline: none;
      }
    }
  }
  
  .agree-terms {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
    cursor: pointer;
    
    input[type="checkbox"] {
      margin-right: 10px;
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
    
    label {
      font-size: 0.9rem;
      color: #555;
      cursor: pointer;
      user-select: none;
    }
  }
  
  .hidden-radio {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  button {
    width: 100%;
  }
}

// Results Styles
.results-card {
  position: relative;
  text-align: center;
  padding: 40px 30px;
  
  .confetti-animation {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 0;
    
    .confetti-piece {
      position: absolute;
      top: -20px;
      border-radius: 4px;
      animation: confetti-fall 8s linear infinite;
    }
  }
  
  .result-header {
    position: relative;
    z-index: 1;
    margin-bottom: 25px;
    
    h2 {
      font-size: 2rem;
      color: #333;
      margin: 0 0 5px;
    }
    
    p {
      font-size: 1.1rem;
      color: #666;
      margin: 0;
    }
  }
  
  .voucher {
    position: relative;
    z-index: 1;
    background: linear-gradient(135deg, #FF8A00, #FF4E50);
    color: white;
    padding: 30px;
    border-radius: 15px;
    margin: 0 auto 30px;
    max-width: 300px;
    box-shadow: 0 10px 20px rgba(255, 107, 0, 0.2);
    
    .voucher-amount {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 10px;
    }
    
    .voucher-code {
      font-size: 1rem;
      opacity: 0.8;
      letter-spacing: 1px;
    }
  }
  
  .voucher-info {
    position: relative;
    z-index: 1;
    margin-bottom: 30px;
    
    p {
      margin: 8px 0;
      font-size: 0.95rem;
      color: #666;
    }
  }
  
  .share-section {
    position: relative;
    z-index: 1;
    
    p {
      font-size: 1rem;
      color: #555;
      margin-bottom: 15px;
    }
    
    .social-buttons {
      display: flex;
      justify-content: center;
      gap: 15px;
      
              .social-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: white;
        cursor: pointer;
        border: none;
        text-decoration: none;
        transition: transform 0.2s, box-shadow 0.2s;
        
        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        }
        
        &.whatsapp {
          background-color: #25D366;
        }
      }
    }
  }
}

// Button Styles
.primary-button {
  background: linear-gradient(90deg, #FF8A00, #FF4E50);
  color: white;
  border: none;
  padding: 15px 40px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 15px rgba(255, 106, 0, 0.3);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
}

.secondary-button {
  background-color: white;
  color: #555;
  border: 1px solid #ddd;
  padding: 15px 30px;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
}

// Animation for Confetti
@keyframes confetti-fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(1000px) rotate(720deg);
    opacity: 0;
  }
}

// Mobile Responsiveness
@media (max-width: 768px) {
  .landing-card, .survey-card {
    .header, .survey-header {
      padding: 20px;
      
      h1 {
        font-size: 2rem;
      }
      
      .sub-header {
        font-size: 1rem;
      }
    }
    
    .content, .question-container, .contact-form {
      padding: 20px;
    }
    
    .content {
      .steps {
        flex-direction: column;
        gap: 25px;
        
        .step {
          display: flex;
          align-items: center;
          text-align: left;
          
          .step-number {
            margin: 0 15px 0 0;
          }
        }
      }
    }
  }
}

.redemption-section {
  position: relative;
  z-index: 1;
  margin-bottom: 30px;
  
  .redemption-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #25D366;
    color: white;
    padding: 14px 28px;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    margin: 0 auto;
    max-width: 280px;
    transition: transform 0.3s, box-shadow 0.3s;
    box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 7px 15px rgba(37, 211, 102, 0.4);
    }
    
    .whatsapp-icon {
      width: 24px;
      height: 24px;
    }
  }
}
</style>