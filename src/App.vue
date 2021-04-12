<template>
	<div id="app">
		<TheMenu />
		<TheHeader />
		<TheContent />
	</div>
</template>

<script>

import TheHeader from './components/layout/TheHeader'
import TheMenu from './components/layout/TheMenu'
import TheContent from './components/layout/TheContent'

export default {
	name: 'App',
	components: {
		TheHeader,
		TheMenu, 
		TheContent,
	}, 
	data() {
		return {	
			name: '',
		}
	},
	methods: {
		
	}
}
</script>

<style>
    @import './css/main.css';
	@import './css/components/header.css';
	@import './css/components/menu.css';
	@import './css/components/toolbar.css';
	@import './css/components/table.css';
	@import './css/components/footer.css';
	@import './css/components/my-dialog.css';
	@import './css/components/remove-dialog.css';
</style>
