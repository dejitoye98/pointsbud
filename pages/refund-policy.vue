<template>
    <div class="container">
        <h1>Refund Policy</h1>
        <div class="section">
            <h2 class="section__header">1. Introduction</h2>

            <p class="section__content">
                At Afflee, we want our Users (social media content creators,
                influencers, micro-influencers, and brands) to be completely
                satisfied with the services we provide. If you are not satisfied
                with a transaction conducted through our platform, you may be
                eligible for a refund. This Refund Policy explains our policies
                and procedures for refunds.
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">2. Eligibility for Refund</h2>

            <p class="section__content">
                You may be eligible for a refund if: The product or service
                purchased through our platform is defective or not as described
                The influencer or brand did not fulfill their obligations as
                agreed upon The transaction was processed in error
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">3. Requesting a Refund</h2>

            <p class="section__content">
                To request a refund, please contact us at [insert contact
                information]. In your request, please provide the following
                information: Your name and contact information Transaction
                details, such as the date and amount of the transaction A
                detailed explanation of the reason for the refund request
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">4. Processing Time</h2>

            <p class="section__content">
                We will process your refund request as soon as possible, but
                please allow for a reasonable period of time for us to
                investigate and process your request.
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">5. Refund Amount</h2>

            <p class="section__content">
                The amount of the refund will be determined on a case-by-case
                basis, taking into account the specific circumstances of the
                transaction and the reason for the refund request. In some
                cases, a partial refund may be granted.
            </p>
        </div>
        <div class="section">
            <h2 class="section__header">6. Credit or Debit Card Refunds</h2>

            <p class="section__content">
                If the transaction was made with a credit or debit card, the
                refund will be credited to the original card used for the
                transaction.
            </p>
        </div>

        <div class="section">
            <h2 class="section__header">7.Limitation of Liability</h2>

            <p class="section__content">
                In no event shall Afflee be liable for any indirect, incidental,
                special, or consequential damages, or loss of profits, arising
                out of or in connection with the use of our platform or
                services, or the inability to use them. By using the Afflee
                Platform, you confirm that you have read, understood, and agree
                to be bound by this Refund Policy.
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
