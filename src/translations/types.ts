// Generated with "Paste JSON as Code" VSCode extension
// View a JSON file and press Command+Shift+P and select "Open quicktype for JSON"

export interface Translations {
  appHeader: AppHeader;
  localePicker: LocalePicker;
  sidebar: Sidebar;
  todoForm: TodoForm;
  todosList: TodosList;
}

export interface AppHeader {
  title: string;
}

export interface LocalePicker {
  selectLanguage: string;
}

export interface Sidebar {
  filterSort: FilterSort;
}

export interface FilterSort {
  title: string;
  filter: Filter;
  sorting: Sorting;
}

export interface Filter {
  noCategories: string;
  title: string;
}

export interface Sorting {
  options: Options;
  title: string;
}

export interface Options {
  'create-asc': string;
  'create-desc': string;
  deadline: string;
  'name-asc': string;
  'name-desc': string;
}

export interface TodoForm {
  cancelButton: string;
  categories: string;
  create: Create;
  date: string;
  description: string;
  edit: Edit;
  name: string;
  nameError: string;
}

export interface Create {
  addButton: string;
  title: string;
}

export interface Edit {
  updateButton: string;
  title: string;
}

export interface TodosList {
  datePassed: string;
  done: string;
  dueDate: string;
  emptyList: string;
  no: string;
  search: Search;
  title: string;
  yes: string;
  withinOneDay: string;
}

export interface Search {
  noSearchResults: string;
  placeholder: string;
  title: string;
}
