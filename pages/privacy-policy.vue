<template>
    <div>
        <div class="header">
            <div class="logo">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="25" fill="#B79B08" />
                    <ellipse cx="24.1329" cy="25.3012" rx="23.5156" ry="24.0964" fill="#FFD700" />
                    <path
                        d="M42.6508 25.3012C42.6508 35.5285 34.36 43.8193 24.1329 43.8193C13.9057 43.8193 5.61493 35.5285 5.61493 25.3012C5.61493 15.074 13.9057 6.78314 24.1329 6.78314C34.36 6.78314 42.6508 15.074 42.6508 25.3012Z"
                        fill="#FFEA78" stroke="#D8B708" stroke-width="2" />
                    <path opacity="0.5"
                        d="M33.0552 22.86C33.0552 25.08 32.3252 26.74 30.8652 27.84C29.4252 28.92 27.7452 29.46 25.8252 29.46H22.8252V32.58H25.8252V36H16.7052V32.58H18.8052V19.92H16.7052V16.5H25.6452C28.0652 16.5 29.9052 17.07 31.1652 18.21C32.4252 19.35 33.0552 20.9 33.0552 22.86ZM28.7352 22.92C28.7352 21.96 28.4652 21.22 27.9252 20.7C27.4052 20.18 26.4752 19.92 25.1352 19.92H22.8252V26.07H25.0752C26.4552 26.07 27.4052 25.78 27.9252 25.2C28.4652 24.62 28.7352 23.86 28.7352 22.92Z"
                        fill="#413703" />
                </svg>

                PointsBud
            </div>
        </div>

        <div class="container">

            <h1>Privacy Policy</h1>

            <div class="section">
                <p class="section__content">
                    At PointsBud, we are committed to protecting the privacy of our customers and their users. This
                    privacy
                    policy
                    explains how we collect, use, and share personal information through our software and services.

                    Information we collect

                    We collect information that you provide to us when you use our software and services. This includes
                    personal
                    information such as your name, email address, phone number, and other contact information.

                    We may also collect information about your use of our software and services, including your device
                    information,
                    IP address, and browsing activity.
                </p>

                <h2 class="section__header">How we use your information </h2>

                <p class="section__content">

                    We use the information we collect to provide and improve our software and services. Specifically, we
                    may use
                    your
                    information to:
                </p>

                <ul>
                    <li>

                        Create and manage your PointsBud account
                    </li>
                    <li>

                        Process transactions and provide customer support
                    </li>
                    <li>

                        Communicate with you about our products and services
                    </li>
                    <li>

                        Personalize your experience with our software and services
                    </li>
                    <li>

                        Analyze and improve our software and services
                    </li>
                    <li>

                        Comply with legal and regulatory requirements
                    </li>
                    <li>

                        We may also use your information for marketing purposes, such as sending you promotional emails
                        or
                        targeted
                        advertising. </li>
                </ul>

                <h2 class="section__header">

                    How we share your information
                </h2>

                <p class="section__content">

                    We may share your information with third-party service providers who help us operate our business,
                    such as
                    payment
                    processors, hosting providers, and email service providers. We require these service providers to
                    maintain
                    the
                    confidentiality and security of your information.

                    We may also share your information with our business partners and affiliates for marketing and
                    promotional
                    purposes,
                    but we will only do so with your consent.

                    In the event that PointsBud is acquired by or merged with another company, your information may be
                    transferred
                    to
                    the new owners or operators.
                    Finally, we may share your information to comply with legal and regulatory requirements or to
                    protect our
                    rights
                    and
                    property.
                </p>


                <h2 class="section__header">

                    Security and retention
                </h2>
                <p class="section__content">


                    We take the security of your information seriously and use appropriate measures to protect it from
                    unauthorized
                    access, alteration, disclosure, or destruction. We also retain your information only as long as
                    necessary to
                    provide
                    you with our software and services or as required by law.
                </p>


                <h2 class="section__header">

                    Your rights
                </h2>

                <p class="section__content">

                    You have certain rights with respect to your personal information, including the right to access,
                    correct,
                    and
                    delete your information. You may also have the right to object to or restrict certain processing of
                    your
                    information. To exercise these rights, please contact us at privacy@pointsbud.com.
                </p>

                <h2 class="section__header">
                    Updates to this policy

                </h2>


                <p class="section__content">

                    We may update this privacy policy from time to time. If we make any material changes, we will notify
                    you by
                    email or
                    through our software and services.
                </p>



                <h2 class="section__header">

                    Contact us
                </h2>

                <p class="section__content">

                    If you have any questions or concerns about our privacy practices, please contact us at
                    privacy@pointsbud.com.
                </p>

            </div>


        </div>

    </div>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: center;
    background-color: #1e202d;
    ;
}

.logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    // margin-bottom: 32px;
    font-size: 30px;
    font-family: 'Squada One', cursive;
    color: white;
    padding: 16px;
    //border: 1px solid lightgrey;
}

.container {
    color: $charcoal !important;
    width: 50%;
    margin: auto;
    // max-height: 90vh;
    //overflow-y: scroll;
    padding: 60px 60px;
    background-color: white;
    margin-top: 50px;
    margin-bottom: 50px;


}

h1 {
    text-align: center;
    color: black;
    font-size: 18pt;
    font-weight: 600;
    margin-bottom: 16px;
}

.section {
    margin-bottom: 24px;

    h2 {
        font-size: 18px;
        font-weight: 500;
        margin-top: 40px;
    }


    ul {
        line-height: 2;
        font-size: 15px;
        color: $charcoal;
    }

    li {
        list-style-type: circle;
    }

    &__header {
        margin-top: 18px;
    }
}
</style>
