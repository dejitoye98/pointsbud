<template>
	<div class="re" @click="clearDropdown">

		<ReservationModal @close="chosen.space = {}" :plan="plan" v-if="chosen.space && chosen.space.id && plan && plan.id" :space="chosen.space" :day="chosen.date" :startTime="chosenTimeIn" :inputs="plan.order_forms"/>
		<ReservationCalendarModal @close="show_calendar = false" v-if="show_calendar === true" :plan="plan"/>
		<div class="re__header">
			<div class="re__header__logo">
				<Logo />
				<span>Reservations</span>
			</div>
			<div class="re__header__links">
				<a>Products</a>
				<a>Reviews</a>
			</div>
		</div>
		<div class="re__container">
			<div class="re__head">
				Choose a Date & Time
			</div>
			<div class="date-filter" id="date-filter">
				<div class="date-filter__header">
				 <!-- <p>Choose Date & Time</p>-->
				</div>
				<div class="date-filter__form">
					<div class="date-filter__form__date">
						<DatePicker v-model="chosen.date" />
					</div>
					<div class="date-filter__form__time">
						<div class="timepicker" :class="[chosenDate && !chosenTimeIn ? 'error-highlight': '']" @click.stop="showTimeDropdown('in')">{{chosen.time.in  || 'Check-in time'}}
								<svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="rgba(0,0,0,.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								<path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001" stroke="rgba(0,0,0,.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>

						</div>
			
						<div class="timepicker__dropdown" v-if="show_time_dropdown.in">
							<ul>
								<li @click="chooseTime(time, 'in')" v-for="(time, index) in times" :key="index">{{time}}</li>
							</ul>
						</div>
					</div>
					<div class="date-filter__form__time">
						<div class="timepicker" :class="[chosenDate && !chosenTimeOut ? 'error-highlight': '']" @click.stop="showTimeDropdown('out')">{{chosen.time.out  || 'Check-out time'}}
							<svg width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="rgba(0,0,0,.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M15.71 15.18L12.61 13.33C12.07 13.01 11.63 12.24 11.63 11.61V7.51001" stroke="rgba(0,0,0,.5)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>

						</div>
						<div class="timepicker__dropdown" v-if="show_time_dropdown.out">
							<ul>
								<li @click="chooseTime(time, 'out')" v-for="(time, index) in times" :key="index">{{time}}</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div class="calendar-button">

				<button @click="show_calendar = true">
					View Calendar
				</button>
			</div>


			<template v-if="loading">
				<div style="display: flex; justify-content:center">
					<LoadingState />
				</div>
			</template>

			<template v-else>
				<div class="re__content">
					
					<div class="spaces">
						<div
							class="spaces__item spaces__item"
							v-for="(space, index) in reservationSpaces"
							:key="index"
							:style="{'border-left': '5px solid ' + priceTags[space.price]}"
						>
							<div class="spaces__item__container">
								<div class="spaces__item__header" >
									<p>{{space.name}} ({{space.type}})</p>
								</div>
								<div class="spaces__item__tag" v-if="chosenDate && chosenTime ">
									<p>Available</p>
								</div>
								<div class="spaces__item__tag spaces__item__tag--warning" v-else-if="chosenDate ">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M22 16.7399V4.66994C22 3.46994 21.02 2.57994 19.83 2.67994H19.77C17.67 2.85994 14.48 3.92994 12.7 5.04994L12.53 5.15994C12.24 5.33994 11.76 5.33994 11.47 5.15994L11.22 5.00994C9.44 3.89994 6.26 2.83994 4.16 2.66994C2.97 2.56994 2 3.46994 2 4.65994V16.7399C2 17.6999 2.78 18.5999 3.74 18.7199L4.03 18.7599C6.2 19.0499 9.55 20.1499 11.47 21.1999L11.51 21.2199C11.78 21.3699 12.21 21.3699 12.47 21.2199C14.39 20.1599 17.75 19.0499 19.93 18.7599L20.26 18.7199C21.22 18.5999 22 17.6999 22 16.7399Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M12 5.48999V20.49" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M7.75 8.48999H5.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
										<path d="M8.5 11.49H5.5" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>
									<p> x {{getBookedCount(space)}}</p>
								</div>

								<div class="spaces__item__content">
									<div class="spaces__item__feature" v-if v-for="(feature, f_index) in getSpaceFeatures(space) ">{{feature}}</div>
									<div class="spaces__item__image">

										<img :src="space.image"></img>
									</div>
								</div>

								<div class="spaces__item__footer">
									<div class="spaces__item__price">NGN {{Intl.NumberFormat('en-US').format(space.price)}}</div>
									<!--<button :disabled="!chosenDate || !chosenTime" :style="{'background': priceTags[space.price]}" @click="chosen.space = space">Reserve</button> -->
									<button @click="chosen.space = space" :style="{'background': priceTags[space.price]}">Reserve</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</div>

		<div class="re__footer">
			<div class="re__footer__container">
				
			</div>
		</div>

		
	</div>
</template>


<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import VueTimepicker from "vue2-timepicker";

// CSS
import "vue2-timepicker/dist/VueTimepicker.css";
import moment from "moment";
export default {
	components: {
		DatePicker
	},
	created() {
		this.getReservationPlan();
	/// alert(this.isWithinTimeRange("02:00 PM", "12:00 PM", "03:00 PM"))
	//alert(this.startTimeIsBetween("12:00:00", "1:00:00", "1:30:00"))
	},
	
	watch:{
		chosenTIme() {
			
		},
		chosenDate() {
			this.getReservations()
		}
	},

	computed: {
		reservationSpaces() {
			if(this.chosenTimeIn.length === 0 && this.chosenTimeOut.length === 0) {
				return this.plan.reservation_spaces;
		}
		else if ((this.chosenTimeIn.length > 0 && this.chosenTimeOut.length < 1 ) || (this.chosenTimeOut.length > 0 && this.chosenTimeIn.length < 1 )) {
			return this.plan.reservation_spaces;
		}
			else {
				let spaces = this.plan.reservation_spaces
				for (let i =0 ; i < this.reservations.length; i++) {
					const reservation = this.reservations[i];

					if (reservation) {
						const space_id = reservation.reservation_space_id;
						if(this.isWithinTimeRange(this.chosenTimeIn, reservation.from_time, reservation.to_time) || this.isWithinTimeRange(this.chosenTimeOut, reservation.from_time, reservation.to_time)) {
							spaces = spaces.filter(space => space.id !== space_id)
			}
			

					}
					// get space_idn
				 }
				return spaces
				//return this.plan.reservation_spaces.filter(r=> !spaceIds.includes(r.id))
			}
		},
		chosenTimeIn() {
			return this.chosen.time.in;
	},
	chosenTimeOut() {
		return this.chosen.time.out;
	},
		chosenDate() {
			if (this.chosen.date) {

				return moment(this.chosen.date).format("YYYY-MM-DD");
			}
			return ""
		},
		priceTags(){
			if (this.plan && this.plan.reservation_spaces) {

				const colors = ['lightblue', 'lightseagreen', 'purple', 'orange', 'red', 'pink'];

				const spaces  = this.plan.reservation_spaces;
				const prices = [];
				spaces.forEach(space=>{
					if(!prices.includes(space.price)) {
						prices.push(space.price)
					}
				});
				prices.sort();
				prices.reverse()
	
				let tags= {}
	
				prices.forEach((price, index)=> {
					let obj ={}
					if (index ==0) {
						tags[price] = 'gold'
					}
					else if (index === prices.length - 1) {
						tags[price] = 'brown'
					}
					else {
						const pickedColors = Object.values(tags);
						tags[price] = colors.find(r=> !pickedColors.includes(r));
					}
				})
	
				return tags
				
			}
			}
	},
	data() {
		return {
			show_calendar: false,
		
			chosen: {
				time: {in: "", out: ""},
				date: "",
				space: {},
			},
			loading: false,
			plan: {},
			reservations: [],
			show_time_dropdown: {in: false, out: false},
			times: [
				"12:00 AM",
				"1:00 AM",
				"2:00 AM",
				"3:00 AM",
				"4:00 AM",
				"5:00 AM",
				"6:00 AM",
				"7:00 AM",
				"8:00 AM",
				"09:00 AM",
				"10:00 AM",
				"11:00 AM",
				"12:00 PM",
				"1:00 PM",
				"2:00 PM",
				"3:00 PM",
				"4:00 PM",
				"5:00 PM",
				"6:00 PM",
				"7:00 PM",
				"8:00 PM",
				"9:00 PM",
				"10:00 PM",
				"11:00 PM"
			]
		};
	},
	methods: {
		getBookedCount(space){
			if (this.reservations) {
				const id = space.id;
				return this.reservations.filter(r => r.reservation_space_id === id).length;
			}
		},
		loadParameters() {
			//if (this.$route.quer)
			//TODO: make sure it loads the day from the query parameters
		},
		chooseTime(time, type) {
			this.chosen.time[type] = time;
		},
		showTimeDropdown(type) {
			// alert("werw");
		this.show_time_dropdown[type] = true;
		if (type === 'in') this.show_time_dropdown.out = false;
		if (type === 'out') this.show_time_dropdown.in = false;
		},
		clearDropdown() {
			this.show_time_dropdown['in'] = false;
			this.show_time_dropdown['out'] = false;
		},
		getReservationPlan() {
			this.loading = true;
			const slug = this.$route.params.slug;
			this.$api
				.get(`/reservations/plans/${slug}`)
				.then(resp => {
					this.plan = resp.data.data;
				})
				.catch(err => {
					this.$route.redirect("/error");
				})
				.finally(() => {
					this.loading = false;
				});
		},
		getSpaceFeatures(space) {
			if (space && space.meta && JSON.parse(space.meta)) {
				return JSON.parse(space.meta).features;
			}
			return [];
		},
		getReservations() {
			this.loading = true
			this.$api.get(`/reservations?plan_id=${this.plan.id}&day=${this.chosenDate}`).then(resp=>{
				this.reservations = resp.data.data;
			}).finally(err=> {
				this.loading = false;
			})
		},
		
		isWithinTimeRange(time, startTime, endTime) {
			const time_index = this.times.indexOf(time);
			//const e_time_index = this.times.indexOf(e_time);
			const start_time_index = this.times.indexOf(startTime);
			const end_time_index = this.times.indexOf(endTime);


		 
			
			return (time_index >= start_time_index  &&  time_index < end_time_index)
	},
	resolveDateTime(day, time) {
		const split_time = time.split(" ") // 12:00 PM - > [12:00, PM]
		let hour_string = ''
		if(split_time[1] === 'PM') {
			let hour = parseInt(split_time[0].split(":")[0])
			if (hour == 12) hour_string += (12) + ":00:00"
			else hour_string += (12 + hour)  + ':00:00';
		}
		else {
			let hour = parseInt(split_time[0].split(":")[0])
			if (hour === 12) {
				hour_string += '00:00:00'
			}
			else {

				hour_string += parseInt(split_time[0].split(":")[0]) + ":00:00"
			}


		}
		return hour_string
	},
	isAfterStartTime(time, startTime){
		const time_index = this.times.indexOf(time);
		const start_time_index = this.times.indexOf(startTime);

		return (time_index > start_time_index )
	},
	startTimeIsBetween(startTime, endTime, comparedStartTime) {
		var format = 'hh:mm:ss'
		startTime = moment(startTime, format)
		endTime = moment(endTime, format)
		comparedStartTime = moment(comparedStartTime, format)
		alert(startTime)
		alert(endTime)
		alert(comparedStartTime)

		return moment(comparedStartTime).isBetween(startTime, endTime)
	},
	endTimeIsBetween(startTime,endTime, comparedEndTime){
			if (moment(comparedEndTime).isBetween(startTime, endTime, undefined, '[)'))
				return fals;
			return false;

	}
		
	}
};
</script>


<style>
.active {
	background: #e3a09e !important;
}
</style>

<style lang="scss" scoped>
.mx-datepicker-main {
	background: $lightaccent !important;
}
.error-highlight {
	border: 2px solid red !important;
}
.calendar-button {
	margin-top: 16px;
	display: flex;
	justify-content: center;
	button {
		@include smallbutton;
	}
}
.re {
	&__footer {
		background: white;
	}
	&__head {
		width: 100%;
		text-align: center;
		font-size: 15px;
		line-height: 1.5;
		margin-bottom: 8px;
		font-weight: 500;
		color: $charcoal;
	}
	&__header {
		//border: 1px solid grey;
		display: flex;
		//justify-content: space-between;
		align-items: center;
		padding: 16px 16px;
		border-bottom: 0.5px solid rgba(211, 211, 211, 0.441);
		box-shadow: 0 0.8rem 2rem rgb(90 97 129 / 5%);
		//background: url("https://www.toptal.com/designers/subtlepatterns/uploads/45degreee_fabric.png");
		&__logo {
			display :flex;
			align-items:center;
			font-size: 20px;
			font-weight:500;
		}
		&__links {
			margin-left: 50px;
			display: flex;
			align-items: center;
			a {
				margin-right: 16px;
				font-size: 18px;
				color: $lightaccent;
				cursor: pointer;
			}
		}
	}
	&__content {
		width: 95%;
		//display: flex;
		display:flex;
		justify-content: space-between;

		margin: auto;
		box-sizing: border-box;
	}
	&__container {
		background: #f5f8fe85;
		padding: 60px 0;
		height: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		background: url("https://www.toptal.com/designers/subtlepatterns/uploads/45degreee_fabric.png");
	}
}
.date-filter {
	padding: 16px;
	width: 50%;
	background: white;
	border-radius: 25px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: auto;

	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

	@include media("<=t") {
		width: 90%;
	}
	&__header {
		//margin-bottom: 16px;
		color: darkgrey;
		margin-bottom: 8px;
	}

	&__form {
		width: 100%;
		display: grid;
		grid-template-columns: 30% 30% 30%;
		justify-content: space-between;
		&__date {
			&:deep(.mx-datepicker) {
				height: 50px !important;
				width: 100%;
			}
			&:deep(.mx-input-wrapper) {
				height: 50px !important;
			}
			&:deep(.mx-input) {
				border-radius: 50px;
				text-align:center;
				height: 50px !important;
				border: 2px solid lightgrey;

				&:hover {
					border: 2px solid $lightaccent;
				}
				&:focus {
					border: 2px solid $lightaccent;
				}
				.active {
					background: $lightaccent !important;
				}
			}
			&:deep(.mx-date-row) {
				border: 1px solid black !important;
			}
			&:deep(.cell) {
				font-size: 16px !important;
			}
		}
		&__time {
			position: relative;
		}
	}

	.timepicker {
		border: 2px solid lightgrey;
		width: 100%;
		height: 50px;
		cursor: text;
		border-radius: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #555;
		font-size: 14px;
		position: relative;
		svg {
			position: absolute;
			right: 5px;

		}

		&:hover {
			border: 2px solid $lightaccent;
		}

		&__dropdown {
			position: absolute;
			margin-top: 1px;
			margin-bottom: 1px;
			-webkit-box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
			box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
			z-index: 2001;
			margin-left: 16px;
			background: white;
			max-height: 500px;
			overflow: scroll;
			width: 90%;
			ul {
				width: 100%;
				li {
					//height: 30px;
					color: #73879c;
					font-size: 12px;
					line-height: 2;
					cursor: pointer;
					text-align: center;
					padding: 16px;
					&:hover {
						background: rgba(59, 130, 246, 0.05);
						//color: white;
					}
				}
			}
		}
	}
}

.offers {
	//box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
	width: 100%;
	margin-top: 50px;
	background: white;
	//opacity: 0.5;
	max-height: 500px;
	border-radius: 10px;
}
.spaces {
	box-sizing: border-box;
	display: grid;
	grid-template-columns: 18% 18% 18% 18% 18%;
	padding: 50px 0;



	justify-content: space-between;
	@include media('<=t') {
		grid-template-columns: 48% 48%;
	}
	&__item {
		cursor: pointer;
		height: auto;
		//width: 300px;
		background: white;
		background: white;
		
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		border: 0.5px solid rgba(211, 211, 211, 0.442);
	 // border-left: orange 5px solid;
		margin-bottom: 50px;
		border-radius: 20px;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;

		&:hover {
			transform: scale(95%);
			box-shadow: rgba(0, 0, 0, 0.1) 0px 8px 12px;
		}

		&--gold {
			border-left: gold 5px solid !important;
		}
		&--green {
			border-left: lightseagreen 5px solid;
		}
		&--blue {
			border-left: blue 5px solid;
		}
		&--red {
			border-left: red 5px solid;
		}

		&__container {
			display: flex;
			flex-direction: column;
			padding: 16px;
			justify-content: space-between;
			height: 100%;
		}

		&__header {
			display: flex;
			justify-content: space-between;
			font-size: 18px;

			align-items: center;
			p {
				color: $charcoal;
				font-weight: 500;

			}
		}

		&__tag {
			border-radius: 8px;
			color: black !important;
			max-height: 20px;
			background: rgba(32, 178, 171, 0.454);
			font-size: 14px;
			width: 100px;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 2px 0;
		 
			p {
				color: white !important;
			}
			 &--warning {
				background: lightgrey;
				display: flex;
				align-items: center;
				svg {
					width: 15px;
					height: 15px;
					margin-right: 2px;

				}
				p {

					color: $charcoal !important;;
				}
			}
		}

		&__content {
			display: flex;
			flex-wrap: wrap;
			padding: 2px 0;
		}

		&__feature {
			//max-height: 20px;
			font-size: 14px;
			background: lightgrey;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 8px;
			// padding: 8px;
			margin-right: 2px;
			padding: 0 8px;
			margin-bottom: 10px;
			color: $charcoal !important;
		}

		&__image {
			//height: 100%;
			height: 150px;
			width: 100%;
			border-radius: 5px;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		&__footer {
			padding: 16px 0;
			display: flex;
			justify-self: flex-end;
			align-items: center;

			button {
				@include smallbutton;
				border: 0;
				margin-bottom: 0;
				font-weight: 300;
				font-size: 14px;
				&:disabled {
					opacity: 0.5;
					//color: lightgrey;
					border: 0;
				}
			}
		}

		&__price {
			font-weight: 500;
			font-size: 16px;
			display: flex;
			width: 100%;
			//justify-content: flex-end;
			color: $faint;
		}
	}
}
</style>