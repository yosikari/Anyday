import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import { MenuButton, Menu, MenuItem, Icon } from 'monday-ui-react-core'
import { Duplicate, Delete, Board } from 'monday-ui-react-core/icons'

export function BoardList({ onDuplicateBoard, onRemoveBoard }) {
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    function onMenuClick(ev) {
        ev.preventDefault()
        ev.stopPropagation()
    }

    if (!boards) return <div>Loading...</div>
    return <section className='board-list'>
        {boards.map(board => <NavLink to={`/board/${board._id}`} key={board._id} className="board-list-a">
            <div className="left-board-a-container flex align-center">
                <Icon iconType={Icon.type.SVG} icon={Board} iconLabel="my bolt svg icon" iconSize={20} />
                <span>{board.title}</span>
            </div>
            <div className="board-menu-btn" onClick={(ev) => ev.preventDefault()}>
                <MenuButton className="board-list-menu-btn"

                >
                    <Menu
                        id="menu"
                        size="medium"

                    >
                        <MenuItem
                            onClick={(ev) => {
                                onMenuClick(ev)
                                onDuplicateBoard(board)
                            }}
                            icon={Duplicate}
                            title="Duplicate Board"
                        />
                        <MenuItem
                            onClick={(ev) => {
                                onMenuClick(ev)
                                onRemoveBoard(board._id)
                            }}
                            icon={Delete}
                            title="Delete"
                        />
                    </Menu>
                </MenuButton>
            </div>
        </NavLink>)}
    </section>
}