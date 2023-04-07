<template>
    <div class="overview">
        <div class="overview__container">
            <QrCode :text="'https://www.contentfortech.com'" />
        </div>
    </div>
</template>

<script>
import QrCode from "vue-qr-generator";

export default {
    layout: 'admin-dashboard',
    components: { QrCode },
    data() {
        return {
            value: "https://example.com",
            size: 640
        }
    }
}
</script>