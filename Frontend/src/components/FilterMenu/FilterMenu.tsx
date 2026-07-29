import "./FilterMenu.css"

export function FilterMenu({ filterItems, currState, stateChangeFunc }: {filterItems: Array<string>, currState: string, stateChangeFunc: Function}) {
    return (
        <div className="filter">
            { filterItems.map(
                i => <div className={ `filter__element ${ currState === i ? "filter__element_active" : null }` } onClick={() => stateChangeFunc(i)}> { i } </div>
            ) }
        </div>
    )
}