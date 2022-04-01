import { defineComponent, ref } from 'vue'

interface PropsType {
  msg: String
}

export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup () {
    const count = ref(10)

    return (props: PropsType) => (
      <div>
        <div>{props.msg}</div>
        <div>{count.value}</div>
      </div>
    )
  }
})
