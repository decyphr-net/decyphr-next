const endpoints = {
  login: {
    url: "users/login/",
    method: "POST",
  },
  register: {
    url: "users/register/",
    method: "POST",
  },
  languages: {
    url: "languages/",
    method: "GET",
  },
  dashboard: {
    url: "dashboard/",
    method: "GET",
  },
  bookSearch: {
    url: "books/?name=",
    method: "GET",
  },
  getReadingList: {
    url: "reading-list/",
    method: "GET",
  },
  addToReadingList: {
    url: "reading-list/",
    method: "POST",
  },
  updateLibraryItem: {
    url: "reading-list/",
    method: "PATCH",
  },
  createReadingSession: {
    url: "reading-sessions/",
    method: "POST",
  },
  translate: {
    url: "translate/",
    method: "POST",
  },
  createPracticeSession: {
    url: "practice-sessions/sessions/",
    method: "POST",
  },
  updatePracticeSession: {
    url: "practice-sessions/sessions/",
    method: "PUT",
  },
  questions: {
    url: "practice-sessions/questions/",
    method: "PUT",
  },
};

export default endpoints;
