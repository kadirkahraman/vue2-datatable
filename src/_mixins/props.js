export default {
  props: {
    columns: { type: Array, required: true },
    data: { type: Array, required: true }, // rows
    total: { type: Number, required: true },
    columnIndex: { type: Number, required: false }, // index of column in a row
    selected: { type: Number, required: false },
    query: { type: Object, required: true },
    selection: Array, // container for multi-select
    summary: Object, // an extra summary row
    xprops: Object, // extra custom props carrier passed to dynamic components
    HeaderSettings: { type: Boolean, default: true }, // whether to render `HeaderSettings`
    Pagination: { type: Boolean, default: true }, // whether to render `PageSizeSelect` and `Pagination`
    pageSizeOptions: { type: Array, default: () => [10, 20, 40, 80, 100] },
    tblClass: [String, Object, Array], // classes for <table>
    tblStyle: [String, Object, Array], // inline styles for <table>
    fixHeaderAndSetBodyMaxHeight: Number, // a fancy prop which combines two props into one
    supportNested: [Boolean, String], // support nested components feature (String is only for 'accordion')
    supportBackup: Boolean, // support backup for `HeaderSettings`
    dblClickRow: { type: Function, required: false, default: () => {} }, // support handle for double click
    maxCols:{type:Number,required:false,default:-1} // maximum visible columns count
  },
  data () {
    let datatableInstance = this
    while (datatableInstance.$options.name !== 'Datatable') {
      datatableInstance = datatableInstance.$parent
    }
    return {
      // the source of dynamic components (thComp / tdComp / nested components)
      comp: datatableInstance.$parent.$options.components
    }
  },
  methods: {
    // usage: <component :is="forDynCompIs(XXX)" ... />
    forDynCompIs (component) {
      // according to https://vuejs.org/v2/guide/components.html#Dynamic-Components
      // dynamic components can be names (string) or component objects
      return typeof component === 'object' ? component : this.comp[component]
    }
  }
}
