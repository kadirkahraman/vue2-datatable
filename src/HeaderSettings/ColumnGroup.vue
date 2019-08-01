<template>
    <ul class="-col-group" name="ColumnGroup">
        <label class="-col-group-title">
            {{ groupName === 'undefined' ? 'Columns' : groupName }}
        </label>
        <li v-for="(col, idx) in columns">
            <input
                    type="checkbox"
                    :id="uuidGen(col.field || idx)"
                    :name="groupName"
                    :checked="isColumnVisible(col)"
                    :disabled="typeof col.visible === 'string' || isDisabled(col)"
                    @change="handleChange(col, $event.target.checked)">
            <label :for="uuidGen(col.field || idx)">
                {{ col.label || col.title }}
                <i v-if="col.explain" class="fa fa-info-circle" style="cursor: help" :title="col.explain"></i>
            </label>
        </li>
    </ul>
</template>
<script>

    export default {
        name: 'ColumnGroup',
        props: {
            groupName: {type: String, required: true},
            columns: {type: Array, required: true},
            maxCols:{type:Number,required:true}
        },
        data(){
        	return {
        		changes: [],
            	checkedElements: {}
        	};
        },
        created(){
        	this.checkedElements=this.columns
                    .map(col => ({[col.field]: col.hasOwnProperty('visible') ? col.visible : true}))
                    .reduce((previousValue, currentValue) => ({...previousValue, ...currentValue}), {});
        },
        computed: {
            checkedItemCount() {
                let fieldVisibilities = this.columns
                    .map(col => ({[col.field]: col.hasOwnProperty('visible') ? col.visible : true}))
                    .reduce((previousValue, currentValue) => ({...previousValue, ...currentValue}), {});
                const changes = this.changes
                	.map(changed => ({[changed.col.field]: changed.isChecked}))
                    .reduce((previousValue, currentValue) => ({...previousValue, ...currentValue}), {});
                this.checkedElements = {...fieldVisibilities,...changes};
                return Object.values(this.checkedElements)
                	.filter(val=>val)
                	.length;
            }
        },
        methods: {
            handleChange(col, isChecked) {
                this.changes.push({col, isChecked});
            },
            uuidGen(key) {
                // $vm._uid is a private property of a Vue instance
                return `-col-${this._uid}-${key}`
            },
            apply() {
                this.changes.forEach(({col, isChecked}) => {
                    this.$set(col, 'visible', isChecked)
                })
                this.changes = [] // don't forget to clear the stack
            },
            isColumnVisible(col){
            	return this.checkedElements[col.field];
            },
            isDisabled(col) {
            	if(this.isColumnVisible(col) || this.maxCols<=0){
            		return false;
            	}
                return this.checkedItemCount >= this.maxCols;
            }
        }
    }
</script>
<style>
    .-col-group {
        display: inline-block;
        margin-bottom: 5px;
        padding: 0;
        width: 150px;
        vertical-align: top;
    }

    .-col-group-title {
        display: block;
        margin: 5px;
        padding: 5px;
        border-bottom: 1px solid #ddd;
        font-size: 18px;
    }

    .-col-group > li {
        margin-bottom: 5px;
        padding-left: 10px;
        list-style: none;
        line-height: 20px;
        font-size: 12px;
    }

    .-col-group > li > * {
        margin: 0;
        vertical-align: middle;
    }
</style>
