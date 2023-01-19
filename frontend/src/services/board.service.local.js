
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const BOARD_KEY = 'boardDB'

// cases to update
//board
export const CHANGE_TITLE = 'CHANGE_TITLE'
//groups
export const CHANGE_GROUP_TITLE = 'CHANGE_GROUP_TITLE'
export const ADD_GROUP_TASK = 'ADD_GROUP_TASK'
export const DELETE_GROUP = 'DELETE_GROUP'

//tasks
export const ADD_TASK_FROM_HEADER = 'ADD_TASK_FROM_HEADER'

//

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    addBoardMsg,
    boardServiceReducer,
    groupServiceReducer,
    taskServiceReducer
}

window.bs = boardService

async function query(filterBy = { txt: '', price: 0 }) {
    var boards = await storageService.query(BOARD_KEY)
    if (!boards.length) {
        storageService.post(BOARD_KEY, demoBoard)
        return boards
    }
    // Filters
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     boards = boards.filter(board => regex.test(board.vendor) || regex.test(board.description))
    // }
    // if (filterBy.price) {
    //     boards = boards.filter(board => board.price <= filterBy.price)
    // }
    return boards
}

function getById(boardId) {
    return storageService.get(BOARD_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(BOARD_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(BOARD_KEY, board)
        return savedBoard
    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        savedBoard = await storageService.post(BOARD_KEY, board)
    }
    console.log('savedBoard:', savedBoard)
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    // Later, this is all done by the backend
    const board = await getById(boardId)
    if (!board.msgs) board.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    board.msgs.push(msg)
    await storageService.put(BOARD_KEY, board)

    return msg
}

function getNewTask() {
    return {
        id: utilService.makeId(),
        title: 'New Task'
    }

}

function boardServiceReducer(board, data, type) {
    board = structuredClone(board)
    switch (type) {
        case CHANGE_TITLE:
            board.title = data
            return board
        default:
            return board
    }
}

// will be changed
function groupServiceReducer(board, data, type) {
    board = structuredClone(board)
    let groupToUpdate
    let newTask = getNewTask()
    switch (type) {
        case CHANGE_GROUP_TITLE:
            const groupIdx = board.groups.findIndex(currGroup => currGroup.id === data.id)
            board.groups.splice(groupIdx, 1, data)
            return board
        case ADD_GROUP_TASK:
            groupToUpdate = board.groups.find(group => group.id === data.group.id)            // board.groups.splice(groupIdx, 1, data)
            newTask.title = data.newTaskTitle
            groupToUpdate.tasks.push(newTask)
            return board
        case DELETE_GROUP:
            board.groups = board.groups.filter(group => group.id !== data.id)
            return board
        default:
            return board
    }
}

// will be changed
function taskServiceReducer(board, data, type) {
    board = structuredClone(board)
    const newTask = getNewTask()

    switch (type) {
        case ADD_TASK_FROM_HEADER:
            console.log('newTask', newTask);

            board.groups[0].tasks.unshift(newTask)
            return board
        default:
            return board
    }
}

function getEmptyBoard() {
    return {
        title: '',
        isStarred: false,
        archivedAt: 1589983468418,
        groups: [
            {
                id: utilService.makeId(),
                title: 'Group 1',
                archivedAt: 1589983468418,
                tasks: [
                    {
                        id: utilService.makeId(),
                        title: 'Task 1'
                    },
                    {
                        id: utilService.makeId(),
                        title: 'Task 2'
                    }
                ],
                style: 'red'
            },
            {
                id: utilService.makeId(),
                title: 'Group 2',
                archivedAt: 1589983468418,
                tasks: [
                    {
                        id: utilService.makeId(),
                        title: 'Task 3'
                    },
                    {
                        id: utilService.makeId(),
                        title: 'Task 4'
                    }
                ],
                style: 'gold'
            },
            {
                id: utilService.makeId(),
                title: 'Group 3',
                archivedAt: 1589983468418,
                tasks: [
                    {
                        id: utilService.makeId(),
                        title: 'Task 5'
                    },
                    {
                        id: utilService.makeId(),
                        title: 'Task 6'
                    }
                ],
                style: 'blue'
            },
        ]
    }
}

// TEST DATA
// storageService.post(BOARD_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))

const demoBoard = {
    title: 'Demo Board',
    isStarred: false,
    archivedAt: 1589983468418,
    groups: [
        {
            id: utilService.makeId(),
            title: 'Group 1',
            archivedAt: 1589983468418,
            tasks: [
                {
                    id: utilService.makeId(),
                    title: 'Task 1'
                },
                {
                    id: utilService.makeId(),
                    title: 'Task 2'
                }
            ],
            style: 'red'
        },
        {
            id: utilService.makeId(),
            title: 'Group 2',
            archivedAt: 1589983468418,
            tasks: [
                {
                    id: utilService.makeId(),
                    title: 'Task 3'
                },
                {
                    id: utilService.makeId(),
                    title: 'Task 4'
                }
            ],
            style: 'gold'
        },
        {
            id: utilService.makeId(),
            title: 'Group 3',
            archivedAt: 1589983468418,
            tasks: [
                {
                    id: utilService.makeId(),
                    title: 'Task 5'
                },
                {
                    id: utilService.makeId(),
                    title: 'Task 6'
                }
            ],
            style: 'blue'
        },
    ]
}

// const board = {

    // 'createdBy': {
    //     '_id': 'u101',
    //     'fullname': 'Abi Abambi',
    //     'imgUrl': 'http://some-img'
    // },
    // 'style': {},
    // 'labels': [
    //     {
    //         'id': 'l101',
    //         'title': 'Done',
    //         'color': '#61bd4f'
    //     },
    //     {
    //         'id': 'l102',
    //         'title': 'Progress',
    //         'color': '#61bd33'
    //     }
    // ],
    // 'members': [
    //     {
    //         '_id': 'u101',
    //         'fullname': 'Tal Tarablus',
    //         'imgUrl': 'https://www.google.com'
    //     }
    // ],
//     'groups': [
//         {
//             'id': 'g102',
//             'title': 'Group 2',
//             'tasks': [
//                 {
//                     'id': 'c103',
//                     'title': 'Do that',
//                     'archivedAt': 1589983468418,
//                 },
//                 {
//                     'id': 'c104',
//                     'title': 'Help me',
//                     'status': 'in-progress', // monday
//                     'priority': 'high',
//                     'description': 'description',
//                     'comments': [
//                         {
//                             'id': 'ZdPnm',
//                             'txt': 'also @yaronb please CR this',
//                             'createdAt': 1590999817436,
//                             'byMember': {
//                                 '_id': 'u101',
//                                 'fullname': 'Tal Tarablus',
//                                 'imgUrl': 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg'
//                             }
//                         }
//                     ],
//                     'checklists': [
//                         {
//                             'id': 'YEhmF',
//                             'title': 'Checklist',
//                             'todos': [
//                                 {
//                                     'id': '212jX',
//                                     'title': 'To Do 1',
//                                     'isDone': false
//                                 }
//                             ]
//                         }
//                     ],
//                     'memberIds': ['u101'],
//                     'labelIds': ['l101', 'l102'],
//                     'dueDate': 16156215211,
//                     'byMember': {
//                         '_id': 'u101',
//                         'username': 'Tal',
//                         'fullname': 'Tal Tarablus',
//                         'imgUrl': 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg'
//                     },
//                     'style': {
//                         'bgColor': '#26de81'
//                     }
//                 }
//             ],
//             'style': {}
//         },
//     ],
//     'activities': [
//         {
//             'id': 'a101',
//             'txt': 'Changed Color',
//             'createdAt': 154514,
//             'byMember': {
//                 '_id': 'u101',
//                 'fullname': 'Abi Abambi',
//                 'imgUrl': 'http://some-img'
//             },
//             'task': {
//                 'id': 'c101',
//                 'title': 'Replace Logo'
//             }
//         }
//     ],

//     'cmpsOrder': ['status-picker', 'member-picker', 'date-picker']
// }