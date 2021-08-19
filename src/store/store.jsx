import React, { createContext } from 'react';

const Store = createContext();

// Provider
export const GlobalProvider = (Children) => (
  class Provider extends React.Component {
    constructor(props) {
      super(props);
      this.state = localStorage.getItem('TOTASKS') ? this.getDataLocalStorage() : this.setupLocalStorage();
    }

    setupLocalStorage = () => {
      const MainData = {
        username: '',
        tasks: {
          personal: [],
          jobs: [],
          workout: [],
          finance: [],
          study: [],
          other: [
            {name: "Swipe left to remove task (Mobile)", category: "Other", desc: "", temp: "", id: 100000001, completed: false},
            {name: "Tap to show task detail", category: "Other", desc: "", temp: "", id: 200000002, completed: false},
            {name: "Share this app :)", category: "Other", desc: "", temp: "", id: 300000003, completed: false}
          ]
        },
        renderedTasks: [
          {name: "Swipe left to remove task (Mobile)", category: "Other", desc: "", temp: "", id: 100000001, completed: false},
          {name: "Tap to show task detail", category: "Other", desc: "", temp: "", id: 200000002, completed: false},
          {name: "Share this app :)", category: "Other", desc: "", temp: "", id: 300000003, completed: false}
        ],
        tempDate: this.setupTempDate()
      };
      localStorage.setItem('TOTASKS', JSON.stringify(MainData));
      return MainData;
    }

    getDataLocalStorage = () => {
      return {
        username: JSON.parse(localStorage.getItem('TOTASKS')).username,
        tasks: JSON.parse(localStorage.getItem('TOTASKS')).tasks,
        renderedTasks: JSON.parse(localStorage.getItem('TOTASKS')).renderedTasks,
        tempDate: JSON.parse(localStorage.getItem('TOTASKS')).tempDate
      }
    }

    updateLocalStorage = () => {
      const newState = {
        username: this.state.username,
        tasks: this.state.tasks,
        renderedTasks: this.state.renderedTasks,
        tempDate: this.state.tempDate
      };

      localStorage.setItem('TOTASKS', JSON.stringify(newState));
    }

    setupTempDate = () => {
      const tempDate = `${new Date().getDate()}`.length === 1 ? `0${new Date().getDate()}` : `${new Date().getDate()}`;
      const tempMonth = `${new Date().getMonth()}`.length === 1 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`;
      const tempYear = `${new Date().getFullYear()}`.length === 1 ? `0${new Date().getFullYear()}` : `${new Date().getFullYear()}`;

      return parseInt(`${tempYear}${tempMonth}${tempDate}`);
    }

    isTomorrow = () => {
      const currentDate = `${new Date().getDate()}`.length === 1 ? `0${new Date().getDate()}` : `${new Date().getDate()}`;
      const currentMonth = `${new Date().getMonth()}`.length === 1 ? `0${new Date().getMonth() + 1}` : `${new Date().getMonth() + 1}`;
      const currentYear = `${new Date().getFullYear()}`.length === 1 ? `0${new Date().getFullYear()}` : `${new Date().getFullYear()}`;

      const today = parseInt(`${currentYear}${currentMonth}${currentDate}`);
      const tempDate = this.state.tempDate;

      if (today > tempDate) {
        this.autoRemoveCompletedTask();
        this.setState({
          // Mengatur ulang tempDate menjadi tanggal sekarang
          tempDate: this.setupTempDate()
        });
      }
    }

    autoRemoveCompletedTask = () => {
      const tasksList = this.state.tasks;
      for (const category in tasksList) {
        tasksList[category] = this.state.tasks[category].filter(task => task.completed === false)
      }

      this.setState({
        tasks: tasksList
      }, this.setupRenderedTasks);
    }

    preventDefaultBtns = () => {
      const submitButtons = document.querySelectorAll('button');
      submitButtons.forEach(btn => {
        btn.addEventListener('click', function (ev) {
          ev.preventDefault();
        })
      });
    }

    saveUsername = (username) => {
      this.setState({
        username: username
      }, this.updateLocalStorage);
    }

    addTask = (data) => {
      // Data Tasks
      const categoryName = data.categoryName;
      const newTask = data.newTask;
      const tasksList = this.state.tasks;

      tasksList[categoryName].push(newTask);

      this.setState({
        tasks: tasksList
      }, this.setupRenderedTasks);
    }

    // setupTaskIndex = () => {
    //   // Memberi index pada setiap task berdasarkan kategorinya
    //   const tasksList = this.state.tasks;
    //   for (const category in tasksList) {
    //     for (let i = 0; i < tasksList[category].length; i++) {
    //       tasksList[category][i].index = i;
    //     }
    //   }

    //   this.setState({
    //     tasks: tasksList
    //   }, this.setupRenderedTasks);
    // }

    updateTask = (data) => {
      // Data Tasks
      const categoryName = data.categoryName;
      const updatedTask = data.updatedTask;
      const tasksList = this.state.tasks;
      const taskIndex = tasksList[categoryName].map(task => task.id).indexOf(updatedTask.id);

      // Memperbarui task sebelumnya dengan task baru
      tasksList[categoryName][taskIndex] = updatedTask;

      this.setState({
        tasks: tasksList
      }, this.setupRenderedTasks);
    }

    removeTask = (data) => {
      // Data Tasks
      const categoryList = this.state.tasks[data.category];
      const id = data.id;
      const tasksList = this.state.tasks;

      // Filter tasks dengan task.id yang tidak sama dengan task.id yang akan dihapus
      const filteredCategoryList = categoryList.filter(task => task.id !== id);
      tasksList[data.category] = filteredCategoryList;

      this.setState({
        tasks: tasksList
      }, this.setupRenderedTasks)
    }

    setupRenderedTasks = () => {
      // Mengambil seluruh task dan memasukkanya ke dalam renderedTasks yang akan ditampilkan ke layar
      const tasksList = this.state.tasks;
      const newRenderedTasks = [];
      for (const category in tasksList) {
        tasksList[category].forEach(task => newRenderedTasks.push(task))
      }

      this.sortFromNewTasks(newRenderedTasks);
    }

    sortFromOldTasks = (renderedTasks) => {
      // Urutkan task dari terlama
      const sortedRenderedTasks = renderedTasks;
      for (let i = 1; i < sortedRenderedTasks.length; i++) {
        let j = i;
        while (j > 0 && sortedRenderedTasks[j].id < sortedRenderedTasks[j - 1].id) {
          [sortedRenderedTasks[j], sortedRenderedTasks[j-1]] = [sortedRenderedTasks[j-1], sortedRenderedTasks[j]];

          j--;
        }
      }

      this.setState({
        renderedTasks: sortedRenderedTasks
      }, this.updateLocalStorage);
    }

    sortFromNewTasks = (renderedTasks) => {
      // Urutkan task dari terbaru
      const sortedRenderedTasks = renderedTasks;
      for (let i = 1; i < sortedRenderedTasks.length; i++) {
        let j = i;
        while (j > 0 && sortedRenderedTasks[j].id > sortedRenderedTasks[j - 1].id) {
          [sortedRenderedTasks[j], sortedRenderedTasks[j-1]] = [sortedRenderedTasks[j-1], sortedRenderedTasks[j]];

          j--;
        }
      }

      this.setState({
        renderedTasks: sortedRenderedTasks
      }, this.updateLocalStorage);
    }

    filterByCategory = (category) => {
      this.setState({
        filterCategory: category
      }, this.filterTasks);
    }

    filterTasks = () => {
      const tasks = Array.prototype.slice.call(document.querySelectorAll('.todo-item'));

      // Menghilangkan semua task terlebih dahulu
      tasks.forEach(task => task.style.display = 'none');

      if (this.state.filterCategory) {
        // Memfilter tasks yang category nya sama dengan category yang dipilih
        const filteredTasks = tasks.filter(task => task.getAttribute('category') === this.state.filterCategory);

        // Menampilkan tasks yang sudah difilter
        filteredTasks.forEach(task => task.style.display = 'block');
      } else {
        // Menampilkan semua tasks
        tasks.forEach(task => task.style.display = 'block');
      }
    }

    dispatch = (action) => {
      switch (action.type) {
        case 'SAVE_USERNAME':
          return this.saveUsername(action.username);
        
        case 'FILTER_BY_CATEGORY':
          return this.filterByCategory(action.category);
        
        case 'REMOVE_FILTER_CATEGORY':
          return this.filterByCategory();

        case 'UPDATE_TASK':
          return this.updateTask(action.data);

        case 'REMOVE_TASK':
          return this.removeTask(action.task);

        case 'ADD_TASK':
          return this.addTask(action.data);
      
        default:
          break;
      }
    }

    componentDidMount = () => {
      this.preventDefaultBtns();
      this.isTomorrow();
      this.sortFromNewTasks(this.state.renderedTasks);
    }

    render() {
      const value = {
        state: this.state,
        dispatch: this.dispatch
      }

      return (
        <Store.Provider value={value}>
          <Children {...this.props} />
        </Store.Provider>
      )
    }
  }
)


// Consumer
export const GlobalConsumer = (Children) => (
  class Consumer extends React.Component {
    render() {
      return (
        <Store.Consumer>
          {value => (
            <Children {...this.props} {...value} />
          )}
        </Store.Consumer>
      )
    }
  }
)