import { EditableHeading } from 'monday-ui-react-core'
import { CHANGE_TASK_TITLE, DELETE_TASK, DUPLICATE_TASK } from '../../services/board.service.local'
import { updateTask } from '../../store/board.actions'
import { MenuButton, Menu, MenuItem, Icon, Counter } from 'monday-ui-react-core'
import { Open, Duplicate, Delete, AddUpdate, Update } from 'monday-ui-react-core/icons'
import { useState } from 'react'
import { showSuccessMsg } from '../../services/event-bus.service'
import { TaskDetails } from '../task-details'

export function TaskCard({ task, group, board, snapshot }) {

    const [isOpenDetails, setIsOpenDetails] = useState(false)

    function onDuplicateTask(taskToDuplicate) {
        const data = { taskToDuplicate, id: taskToDuplicate.id, groupId: group.id }
        updateTask(board, data, DUPLICATE_TASK)
        showSuccessMsg(`Task duplicated successfully`)
    }

    function onDeleteTask(taskToDelete) {
        const data = { taskId: taskToDelete.id, groupId: group.id }
        updateTask(board, data, DELETE_TASK)
        showSuccessMsg(`Task deleted successfully taskId:${data.id} `)
    }

    function onFinishEditingInTask(value) {
        let taskChanges = { title: value, taskId: task.id, groupId: group.id }
        updateTask(board, taskChanges, CHANGE_TASK_TITLE)
    }

    return <section className='card'>

        <EditableHeading className='card-task-title'
            onFinishEditing={onFinishEditingInTask}
            type={EditableHeading.types.h5}
            value={task.title} />

        <div className="card-menu-btn-container flex"
            style={{ display: snapshot.isDragging ? 'none' : '' }}>
            <MenuButton className="task-preview-menu-btn">
                <Menu
                    id="menu"
                    size="medium"
                    style={{
                        backgroundColor: 'red',
                        color: 'red'
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            setIsOpenDetails(!isOpenDetails);
                        }}
                        icon={Open}
                        title="Open"
                    />
                    <MenuItem
                        onClick={() => onDuplicateTask(task)}
                        icon={Duplicate}
                        title="Duplicate Task"
                    />
                    <MenuItem
                        onClick={() => onDeleteTask(task)}
                        icon={Delete}
                        title="Delete"
                    />
                </Menu>
            </MenuButton>
        </div>
        {isOpenDetails && <TaskDetails
                board={board}
                task={task}
                group={group}
                isOpenDetails={isOpenDetails}
                setIsOpenDetails={setIsOpenDetails} />}

    </section>
}