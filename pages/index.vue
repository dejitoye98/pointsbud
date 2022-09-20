<template>
  <div>
    <navbar page='landing'></navbar>
    <div class="page">

        <div class="hero">
          <div class="hero__container">
            <h2>Take your</h2>
            <h2>marketing campaigns</h2>
            <h2>further</h2>
            <p>Don't be limited. Let independent affiliate marketers across the internet spread word about your brand/product/offerings in exchange for cash rewards</p>

            <button>Get started</button>
          </div>

        </div>


        <div class="how">
          <div class="how__container">
            <h3 class="how__header">How does it work?</h3>

            <div class="how__list">
              <div class="how__list__item">
                <div class="how__list__item__header">
                  <div class="how__list__item__header__number">
                    <div class="circle">
                      <p>1</p>
                    </div>
                  </div>
                  <div class="how__list__item__header__title">
                    <p>Register your marketing campaign with the link that you want customers to visit </p>
                  </div>
                </div>

                <div class="how__list__item__caption">
                  <span> Each marketer gets a unique link that redirects to your marketing campaign’s link. You’ll enter a budget and how much each marketer earns per click on the unique link given to them. The campaign ends when your budget is exhausted.</span>
                </div>
              </div>
              <div class="how__list__item">
                <div class="how__list__item__header">
                  <div class="how__list__item__header__number">
                    <div class="circle">
                      <p>2</p>
                    </div>
                  </div>
                  <div class="how__list__item__header__title">
                    <p>Afilliate marketers sign up to push your product </p>
                  </div>
                </div>

                <div class="how__list__item__caption">
                  <span> You can be picky and set criteria (age, profession, industry) for the kind of people you want as afiliate marketers</span>
                </div>
              </div>
              <div class="how__list__item">
                <div class="how__list__item__header">
                  <div class="how__list__item__header__number">
                    <div class="circle">
                      <p>3</p>
                    </div>
                  </div>
                  <div class="how__list__item__header__title">
                    <p>Track your campaign’s progress</p>
                  </div>
                </div>

                <div class="how__list__item__caption">
                  <span> You’ll get a full breakdown of how your marketing campaign is faring: the marketers pushing it, where the traffic is coming from, how much of your budget is spent, among other metrics</span>
                </div>
              </div>
              <div class="how__list__item">
                <div class="how__list__item__header">
                  <div class="how__list__item__header__number">
                    <div class="circle">
                      <p>4</p>
                    </div>
                  </div>
                  <div class="how__list__item__header__title">
                    <p>Alernatively...</p>
                  </div>
                </div>

                <div class="how__list__item__caption">
                  <span> Afilly can be used to start a rewards/referral program within your own app. We provide APIs that can be used to provide users with unique links and track events like registration, completed orders, whatever</span>
                </div>
              </div>
            </div>

            <div class="how__cta__container">
              <button class="how__cta" @click="signup">
                Sign up for free
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>


</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    signup() {
      this.$router.push({path:'/register'});
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  width: 90%;
  margin: auto;
}
.hero {
  &__container {
    //width: 90%;
    //margin: auto;

    h2 {
      font-weight: 700;
      font-size: 48px;
      line-height: 58px;
      display: flex;
      align-items: center;
      width: 500px;

      color: black;
      &:last-of-type {
        margin-bottom: 30px;
      }

    }
    p {
      color: #686868;
      width:600px;
      margin-bottom: 50px;
      font-size: 18px;
      line-height: 30px;
    }

    button {
      @include largebutton;
    }

  }
}

.how {
  &__container {
    padding: 120px 0px 60px 0;
  }

  &__header {
    width: 100%;
    text-align: center;
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 48px;
    //display: flex;
    //align-items: center;
    text-align: center;
    margin-bottom: 50px;

    color: #000000;
  }

  &__list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &__item {
      width: 45%;
      margin-bottom: 50px;
      &__header {
        display: flex;
        margin-bottom: 10px;
        align-items: center;
        &__title {
          font-weight: 700;
          font-size: 25px;
          line-height: 36px;
          display: flex;
          align-items: flex-end;

          color: black;
        }
        
        
      }
      &__caption {
        margin-left: 80px;
        font-weight: 400;
        font-size: 15px;
        line-height: 25px;
        display: flex;
        align-items: flex-end;

        color: $faint;
      }
    }
  }
  &__cta {

    &__container{
      width: 100%;
      margin: auto;
      display: flex;
      justify-content: center;
    }
      //background: $darkaccent;
      border-radius: 10px;
      color: white;
      padding: 15px 70px;
      text-align: center;
      margin: auto;
      margin-top: 40px;

      @include largebutton;
  }
}

.circle {
  background: $lightaccent;
  position: relative;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 30px;

  p {
    position: absolute;
    top: 12px;
    left: 20px;
  }
}

.finish-step {
  margin-top: 50px;
}
</style>
