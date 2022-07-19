import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _courses = []; //look is private, to access you need methods inside the store as getCourses() fro example

class CourseStore {
  addChangeListener(callback) {
    /*
        This allow the react component to subscribe to our store
        so they are notified when changes occour.

        Is usel for React component says:
        "Hey I'd like to know when this store changes"
    */
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    /* Oposite off add */
    this.removeChangeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCoursesBySlug(slug) {
    return _courses.find((c) => c.slug === slug);
  }
}

const store = new CourseStore();

Dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange();
      break;
    default:
    // Nothing
  }
});

export default store;
