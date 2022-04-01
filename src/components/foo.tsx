import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      count: 1
    }
  },
  render () {
    return (
      <div>
        <div>{this.msg}</div>
        <div>{this.count}</div>
      </div>
    )
  }
})
