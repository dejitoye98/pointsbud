<template>
	<div class="settings">
		<div class="settings__tabs">
			<template v-if="userContext === 'business' && business_tabs">
				<div
					v-for="tab in business_tabs.filter(tab=> tab.show === true || typeof(tab.show) === 'undefined')"
					class="settings__tabs__tab"
					:class="[activeTab == tab.name ? 'active' : '']"
					:key="tab.name"
					@click="getRoutes(tab)"
				>{{tab.name}}

				<span class="updates" v-if="tab.updates_tag && updateItems[tab.updates_tag] ">{{updateItems[tab.updates_tag]}}</span>
				</div>
			</template>
			<template v-else-if="userContext === 'marketer' && marketer_tabs">
				<div
					v-for="tab in marketer_tabs.filter(tab=> tab.show === true || typeof(tab.show) === 'undefined')"
					class="settings__tabs__tab"
					:class="[activeTab == tab.name ? 'active' : '']"
					:key="tab.name"
					@click="getRoutes(tab)"
				>{{tab.name}}</div>
			</template>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	props: ["business_tabs", "marketer_tabs", "params"],
	data() {
		return {
			activeTab: ""
		};
	},
	methods: {
		computeTabRoute(tab) {
			let route = tab.route;
			if (this.params) {
				const labels = Object.keys(this.params);

				labels.forEach(key => {
					if (tab.show && tab.route.includes(":" + key)) {
						route = tab.route.replace(":" + key, this.params[key]);
					}
				});
			}
			return route;
		},
		activateTab(tab) {
			this.activeTab = tab.name;
		},
		getRoutes(tab) {
			this.activateTab(tab);
			this.$router.push({
				path: this.computeTabRoute(tab)
			});
		}
	},
	watch: {},
	created() {
		if (this.business_tabs) {
			this.business_tabs.forEach(tab => {
				//alert(window.location.pathname + "-------" + this.computeTabRoute(tab));
				if (window.location.pathname === this.computeTabRoute(tab)) {
					// alert(JSON.stringify(tab));

					this.activateTab(tab);
				}
			});
		}
		if (this.marketer_tabs) {
			this.marketer_tabs.forEach(tab => {
				if (window.location.pathname === this.computeTabRoute(tab)) {
					this.activateTab(tab);
				}
			});
		}
	},
	computed: {
		...mapGetters("updates", ["updateItems"]),

		userContext() {
			return window.localStorage.getItem("afContext");
		},
		userDetails() {
			return JSON.parse(window.localStorage.getItem("afUserDetails"));
		},
		canChangePassword() {
			return (
				this.password.old_password &&
				this.password.new_password &&
				this.password.confirm_password &&
				this.password.new_password === this.password.confirm_password
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.updates {
	display: flex;
	width: 20px;
	height: 20px;
	font-size: 14px;
	color: white;
	background: $primary;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	margin-left: 5px;
}
.settings {
	//padding: 0 24px;
	margin-bottom: 50px;

	&__tabs {
		display: flex;
		margin-bottom: 16px;
		//justify-content: space-between;

		&__tab {
			padding: 16px;
			text-align: center;
			color: $charcoal;
			cursor: pointer;
			display: flex;
			align-items: center;
		}
	}

	.active {
		border-bottom: 2px solid $lightaccent !important;
		color: $lightaccent !important;
	}
}
</style>