<template>
  <el-container>
    <el-header>
      <h1>MY TODO LIST</h1>
    </el-header>
    <el-main class="main">
      <article class="article">
        <section class="section">
          <div class="add-region">
            <el-input 
              v-model="input"
              style="flex: 1"
              placeholder="请输入待执行任务"
              clearable
              @keydown.enter="addTask">
            </el-input>
            <el-button style="width: 80px;margin-left: 20px;" type="primary" icon="el-icon-plus" @click="addTask">新增</el-button>
          </div>
        </section>
        <section class="section">
          <el-progress :text-inside="true" :stroke-width="20" :percentage="tasks.length ? finishedTask.length / tasks.length * 100 : 0">
            <span> {{finishedTask.length}} / {{tasks.length}}</span>
          </el-progress>
        </section>
        <section class="section">
          <el-card class="box-card">
            <ul class="tasks">
              <li class="task" v-for="(task, index) in tasks" :key="index" >
                <span style="flex: 1;text-align: left" :class="{'finish-line': task.checked}">
                  <el-input
                    v-if="editTask === task"
                    v-model="task.text"
                    :autofocus="editTask === task"
                    placeholder="请输入待执行任务"
                    @keydown.enter="updateTask(task)"
                    @blur="updateTask(task)"
                    @keydown.esc="cancel(task)"
                    >
                  </el-input> 
                  <span v-else style="font-size: 24px;">{{ task.text }}</span>
                </span>
                <span>
                  <i v-show="!task.checked" class="icon el-icon-edit" style="margin-right: 15px; margin-left: 20px; cursor: pointer;font-size:20px;" @click="changeTaskStatus(task)"></i>
                  <i class="icon el-icon-delete-solid" style="margin-right: 15px; cursor: pointer;font-size:20px;" @click="removeTask(index)"></i>
                  <i v-show="!task.checked" class="icon el-icon-check" style="cursor: pointer;font-size:20px;" @click="updateTaskStatus(task)"></i>
                </span>
              </li>
            </ul>
          </el-card>
        </section>
      </article>
    </el-main>
    <el-footer>
      vue 3.0 todo-list
    </el-footer>
  </el-container>
</template>

<script>
import { ref, reactive, computed, watchEffect } from 'vue'

import { getItem, setItem } from '@/utils/storage'

// 添加待办事项
const add = tasks => {
  let input = ref('')
  
  const addTask = () => {
    const taskText = input.value && input.value.trim()
    if ( taskText.length ) {
      tasks.unshift({
        text: taskText,
        checked: false
      })
    }
    input.value = ''
  }

  return {
    input,
    addTask
  }
}

// 更新待办事项
const update = tasks => {

  const sortTasks = () => {
    tasks.sort((a) => a.checked ? 1 : -1)
  }
  
  const updateTaskStatus = task => {
    task.checked = !task.checked
    sortTasks()
  }

  return {
    updateTaskStatus
  }
}

// 删除待办事项
const remove = tasks => {
  const removeTask = index => tasks.splice(index, 1)

  return {
    removeTask
  }
}
// 编辑待办事项
const edit = () => {
  let cache = ''
  // rective 创建的对象，直接覆盖对象不是响应式，所以此处使用 ref
  let editTask = ref(null)

  const changeTaskStatus = task => {
    editTask.value = task
    cache = task.text
  }

  const updateTask = task=> {
    if(editTask.value && editTask.value.text) {
      task.text = task.text.trim()
      editTask.value = null
    }else {
      cancel(task)
    }
  }

  const cancel = task => {
    task.text = cache
    editTask.value = null
  }

  return {
    changeTaskStatus,
    updateTask,
    cancel,
    editTask
  }
}

// 处理完成/未完成数量
const progress = tasks => {
  const finishedTask = computed(() => tasks.filter(({checked}) => checked))
  
  return {
    finishedTask
  }
}

// 存储待办事项
const cacheStorage = () => {
  const key = 'tasks'
  let tasks = reactive(getItem(key) || [])

  watchEffect(() => {
    setItem(key, tasks)
  })

  return tasks
}


export default {
  name: 'Index',
  setup() {
    let tasks = cacheStorage()
    
    return {
      tasks,
      ...add(tasks),
      ...update(tasks),
      ...remove(tasks),
      ...edit(),
      ...progress(tasks)
    }
  },
  directives: {
    // inputFocus: (el) => {
    //   el.focus()
    // }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.add-region {
  width: 100%;
  display: flex;
}

.main {
  display: flex!important;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.section {
  margin-bottom: 20px;
}

.article {
  width: 40%;
}

.tasks {
  padding-left: 0px;
}

.task {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
}

.icon:hover {
  color: #409EFF
}

.finish-line {
  text-decoration: line-through;
}
</style>
