<template>
    <div class="container">
        <h1>Privacy Policy</h1>
        <div class="section">
            <h2 class="section__header">1. Introduction</h2>

            <p class="section__content">
                At Afflee, we are committed to protecting the privacy of our
                users, including social media content creators, influencers,
                micro-influencers, and brands (collectively "Users"). This
                Privacy Policy explains how we collect, use, and disclose the
                personal information of Users on our website, APIs, and services
                (the "Platform"). By using the Platform, you consent to the
                collection, use, and disclosure of your personal information in
                accordance with this Privacy Policy.
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">2. Information We Collect</h2>

            <p class="section__content">
                We collect the following types of personal information from
            </p>
            <ul>
                <li>
                    Users: Contact information, such as name, email address, and
                    phone number
                </li>
                <li>
                    Social media account information, including username,
                    profile picture, and follower count
                </li>
                <li>
                    >Demographic information, such as age, gender, and location
                </li>
                <li>
                    Payment information, such as bank account or PayPal
                    information Information related to your use of the Platform,
                    including browsing history, search queries, and interactions
                    with other Users
                </li>
            </ul>
        </div>
        <div class="section">
            <h2 class="section__header">3. How We Use Your Information</h2>

            <p class="section__content">
                We use the personal information we collect from Users to:
                Provide, maintain, and improve the Platform Facilitate
                connections between Users and brands Facilitate transactions and
                payments Communicate with Users about the Platform and their use
                of it Send marketing and promotional emails and messages, with
                the option for opt-out Conduct research and analysis to improve
                our services
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">4. Disclosure of Your Information</h2>

            <p class="section__content">
                Brands for the purpose of facilitating connections and
                transactions Service providers who assist us in providing and
                maintaining the Platform Law enforcement, government agencies,
                or other third parties as required by law Other third parties
                with your consent
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">5. Data Retention</h2>

            <p class="section__content">
                We retain your personal information for as long as necessary to
                provide the Platform, comply with legal obligations, resolve
                disputes, and enforce our agreements.
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">6. Security</h2>

            <p class="section__content">
                We take reasonable measures to protect the personal information
                of Users from unauthorized access, use, or disclosure. However,
                no method of internet transmission or storage is completely
                secure, and we cannot guarantee the security of your personal
                information.
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">7. Your Rights</h2>

            <p class="section__content">
                You have the right to access, correct, and delete your personal
                information, as well as the right to request that we stop
                processing it. You can exercise these rights by contacting us at
                [insert contact information].
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">8. Changes to this Privacy Policy</h2>

            <p class="section__content">
                We may update this Privacy Policy from time to time. If we make
                changes, we will notify you by revising the date at the top of
                the policy and, in some cases, provide you with additional
                notice (such as adding a statement to our homepage or sending
                you a notification). We encourage you to review the Privacy
                Policy whenever you access the Platform to stay informed about
                our information practices and the ways you can help protect your
                privacy. By using the Afflee Platform, you confirm that you have
                read, understood, and agree to be bound by this Privacy Policy.
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
