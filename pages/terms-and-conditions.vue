<template>
    <div class="container">
        <h1>Terms and Conditions</h1>
        <div class="section">
            <h2 class="section__header">1. Introduction</h2>

            <p class="section__content">
                Welcome to Afflee, an influencer marketing network connecting
                social media content creators, influencers, and
                micro-influencers (collectively "Influencers") with brands (the
                "Network"). By using our website, APIs, and services, you agree
                to be bound by these terms and conditions (the "Terms").
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">2. Eligibility</h2>

            <p class="section__content">
                To be eligible to participate in the Network as an Influencer,
                you must:
            </p>
            <ul>
                <li>be at least 18 years of age</li>
                <li>
                    have a valid social media account with a following of at
                    least [insert minimum number of followers],
                </li>
                <li>
                    have the legal capacity to enter into a binding agreement.
                </li>
            </ul>
        </div>
        <div class="section">
            <h2 class="section__header">3. Influencer Relationship</h2>

            <p class="section__content">
                By joining the Network, you will be an "Influencer" of Afflee
                and will be able to promote products and services of brands
                through the use of special links and codes provided to you by
                Afflee. You will earn commissions on any sales made through your
                links and codes.
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">4. Commission Structure</h2>

            <p class="section__content">
                The commission structure for the Network is as follows: [insert
                commission structure]. Commissions will be paid out on a monthly
                basis.
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">5. Brand Relationship</h2>

            <p class="section__content">
                By joining the Network, brands will be able to connect with
                Influencers to promote their products and services. Brands will
                provide Influencers with special links and codes to be used in
                their posts and stories. Brands will pay commissions to
                Influencers for any sales made through these links and codes.
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">6. Prohibited Activities</h2>

            <p class="section__content">
                As an Influencer, you agree not to engage in any of the
                following activities:
            </p>
            <ul>
                <li>
                    Spamming or sending unsolicited messages to promote brand
                    products or services
                </li>
                <li>
                    Using any illegal or unethical means to drive traffic to
                    your links and codes
                </li>
                <li>Modifying or altering brand links and codes in any way</li>
                <li>
                    Representing yourself as an employee or agent of any brand
                </li>
            </ul>

            <p>
                As a brand, you agree not to engage in any of the following
                activities:
            </p>
            <ul>
                <li>
                    Using any illegal or unethical means to drive traffic to
                    your links and codes
                </li>
                <li>
                    Modifying or altering links and codes provided by
                    Influencers
                </li>
                <li>
                    Representing any Influencer as an employee or agent of your
                    brand without their prior consent.
                </li>
                <li>
                    Representing yourself as an employee or agent of any brand
                </li>
            </ul>
        </div>
        <div class="section">
            <h2 class="section__header">7. Termination</h2>

            <p class="section__content">
                Afflee reserves the right to terminate the relationship between
                any Influencer or brand and the Network at any time, for any
                reason. If your relationship is terminated, you will forfeit any
                outstanding commissions.
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">8. Disclaimer</h2>

            <p class="section__content">
                Afflee makes no representations or warranties, express or
                implied, with respect to the Network or any products or services
                sold through the Network. Afflee will not be liable for any
                damages of any kind arising from the use of the Network or any
                products or services sold through the Network.
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">9. Governing Law</h2>

            <p class="section__content">
                These Terms will be governed by and construed in accordance with
                the laws of the [insert jurisdiction], without giving effect to
                any principles of conflicts of law. By joining the Afflee
                Influencer Marketing Network, you confirm that you have read,
                understood, and agree to be bound by these Terms.
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 90%;
    margin: auto;
    max-height: 90vh;
    overflow-y: scroll;
    padding: 60px 0;
}
h1 {
    text-align: center;
    color: $primary;
    font-size: 18pt;
    font-weight: 600;
}

.section {
    margin-bottom: 24px;
    h2 {
        font-size: 18px;
        font-weight: 500;
    }
    &__content,
    ul {
        line-height: 2;
        font-size: 15px;
        color: $charcoal;
    }
    li {
        list-style-type: circle;
    }
}
</style>
