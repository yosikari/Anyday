import { updateGroup, updateTask } from '../store/board.actions';
import { ADD_GROUP_FROM_HEADER, ADD_TASK_FROM_HEADER } from '../services/board.service.local';

import { Button, Flex, SplitButton, Tooltip, Icon, Menu, MenuItem } from 'monday-ui-react-core'
import { Search, PersonRound, Filter, Sort, Group } from "monday-ui-react-core/icons";
import { Menu as MenuIcon } from "monday-ui-react-core/icons";

export function BoardFilter({ board }) {

    function onAddNewTask() {
        updateTask(board, undefined, ADD_TASK_FROM_HEADER)
    }
    
    return <section className='board-filter'>
        <Flex gap='18' align='End'

        >

            <SplitButton className="new-task-btn"

                children='New Item' size={Button.sizes.SMALL} onClick={onAddNewTask} secondaryDialogContent={<HeaderMenu board={board} />} >

            </SplitButton>
            <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} >
                {/* <span style={{ color: '#afafb2', width: '0px' }} >Search</span> */}
                <Icon iconType={Icon.type.SVG} icon={Search} iconSize={19} />

                <div> Search
                </div>
            </Button>
            <div className="monday-storybook-tooltip_bottom">
                <Tooltip
                    content="Filter by person" animationType="expand">
                    <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={PersonRound}>
                        Person
                    </Button>
                </Tooltip>
            </div>
            <div className="monday-storybook-tooltip_bottom">
                <Tooltip
                    content="Filter by anything" animationType="expand">
                    <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Filter}>
                        Filter
                    </Button>
                </Tooltip>
            </div>
            <div className="monday-storybook-tooltip_bottom">
                <Tooltip
                    content="Sort by any column" animationType="expand">
                    <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Sort}>
                        Sort
                    </Button>
                </Tooltip>
            </div>
            <div className="monday-storybook-tooltip_bottom" style={{ justifySelf: 'flex-end' }}>
                <Tooltip
                    content="Hidden columns" animationType="expand">
                    <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={MenuIcon}>

                    </Button>
                </Tooltip>
            </div>

        </Flex>
    </section >

}

export function HeaderMenu({ board }) {
    return (
        <Menu>
            <MenuItem
                icon={Group}
                onClick={() => updateGroup(board, null, ADD_GROUP_FROM_HEADER)}
                title="New group of Tasks"
            />
        </Menu>
    )
}
