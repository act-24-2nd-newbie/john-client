const SORT_KEY = {OLDEST: 'OLDEST', LATEST: 'LATEST'};
const SORT_OPTIONS = [{key: SORT_KEY.OLDEST, label: 'Oldest'}, {key: SORT_KEY.LATEST, label: 'Latest'}];
const TASK_MESSAGE = {
    CREATED: 'Task has been registered',
    UPDATED: 'Task has been modified',
    DONE: 'Task has been completed',
    DELETED: 'Task has been deleted',
    DELETE_ALL: 'All Tasks have been deleted',
}
const MEMBER_MESSAGE = {
    CREATED: 'Registered successfully.',
}

export {SORT_OPTIONS, SORT_KEY, TASK_MESSAGE, MEMBER_MESSAGE};