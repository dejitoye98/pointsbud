<template>
  <div class="container">
    <div class="grid">
      <div class="grid__left">
        <div class="pictures">
          <div class="pictures__main">
            <img
              src="https://media1.popsugar-assets.com/files/thumbor/WiPM0C1KrFKgzf2i8GtiBw0lcn8/0x635:1728x1851/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2020/07/22/055/n/1922564/7b0e8b645f18d7958b54f9.39785796_/i/best-dsw-shoes-on-sale.jpg"
              alt
            />
          </div>

          <div class="pictures__more">
            <div>
              <img
                src="https://media1.popsugar-assets.com/files/thumbor/WiPM0C1KrFKgzf2i8GtiBw0lcn8/0x635:1728x1851/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2020/07/22/055/n/1922564/7b0e8b645f18d7958b54f9.39785796_/i/best-dsw-shoes-on-sale.jpg"
                alt
              />
            </div>
            <div>
              <img
                src="https://media1.popsugar-assets.com/files/thumbor/WiPM0C1KrFKgzf2i8GtiBw0lcn8/0x635:1728x1851/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2020/07/22/055/n/1922564/7b0e8b645f18d7958b54f9.39785796_/i/best-dsw-shoes-on-sale.jpg"
                alt
              />
            </div>
            <div>
              <img
                src="https://media1.popsugar-assets.com/files/thumbor/WiPM0C1KrFKgzf2i8GtiBw0lcn8/0x635:1728x1851/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2020/07/22/055/n/1922564/7b0e8b645f18d7958b54f9.39785796_/i/best-dsw-shoes-on-sale.jpg"
                alt
              />
            </div>
            <div>
              <img
                src="https://media1.popsugar-assets.com/files/thumbor/WiPM0C1KrFKgzf2i8GtiBw0lcn8/0x635:1728x1851/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2020/07/22/055/n/1922564/7b0e8b645f18d7958b54f9.39785796_/i/best-dsw-shoes-on-sale.jpg"
                alt
              />
            </div>
            <div>
              <img
                src="https://media1.popsugar-assets.com/files/thumbor/WiPM0C1KrFKgzf2i8GtiBw0lcn8/0x635:1728x1851/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2020/07/22/055/n/1922564/7b0e8b645f18d7958b54f9.39785796_/i/best-dsw-shoes-on-sale.jpg"
                alt
              />
            </div>
            <div>
              <img
                src="https://media1.popsugar-assets.com/files/thumbor/WiPM0C1KrFKgzf2i8GtiBw0lcn8/0x635:1728x1851/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2020/07/22/055/n/1922564/7b0e8b645f18d7958b54f9.39785796_/i/best-dsw-shoes-on-sale.jpg"
                alt
              />
            </div>
            <div>
              <img
                src="https://media1.popsugar-assets.com/files/thumbor/WiPM0C1KrFKgzf2i8GtiBw0lcn8/0x635:1728x1851/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2020/07/22/055/n/1922564/7b0e8b645f18d7958b54f9.39785796_/i/best-dsw-shoes-on-sale.jpg"
                alt
              />
            </div>
          </div>
        </div>

        <div class="variations">
          <div class="variations__section">
            <p class="varations__section__header">Colors</p>
            <div></div>
          </div>
          <div class="variations__section">
            <p class="varations__section__header">Sizes</p>
          </div>
        </div>
      </div>

      <div class="grid__right">
        <div class="details">
          <p class="details__name">Urbaneers Plattan</p>

          <p>
            <span>Seller:</span> Afflee
          </p>
          <p>
            <span>Category:</span> Entertainment
          </p>

          <p class="description">
            <span>Description:</span> Deji Atoyebi is a goat
          </p>
        </div>

        <div class="purchase">
          <div class="purchase__price">NGN 20,000</div>
          <button>Buy now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 90%;
  margin: auto;
}
.grid {
  padding: 60px 0px;
  display: grid;
  grid-template-columns: 49% 49%;
  justify-content: space-between;

  &__left {
  }

  .pictures {
    img {
      width: 100%;
    }
    &__main {
      // max-height: 400px;
    }
    &__more {
      margin-top: 20px;
      //max-height: 100px;
      display: grid;
      grid-template-columns: 19% 19% 19% 19% 19%;
      justify-content: space-between;
      div {
        border: 1px solid whitesmoke;
        //height: 100%;
        margin-bottom: 16px;

        img {
          height: 100%;
        }
      }
    }
  }
  .variations {
    &__section {
      margin-bottom: 20px;
      &__header {
        color: $charcoal;
      }
    }
  }
}

.grid__right {
  .details {
    font-size: 20px;
    line-height: 1.5;
    &__name {
      color: $primary;
      font-size: 46px;
      font-weight: 700;
      margin-bottom: 24px;
    }

    span {
      color: $primary;
    }

    .description {
      margin-top: 16px;
    }
  }
  .purchase {
    padding: 40px 0;
    border-top: 2px solid whitesmoke;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 60px auto;

    &__price {
      color: $primary;
      font-size: 30px;
      font-weight: 700;
    }
    button {
      @include largebutton;
      border-radius: 20px;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>