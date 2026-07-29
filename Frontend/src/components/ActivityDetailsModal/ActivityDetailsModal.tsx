import { Modal } from "../../ui/Modal/Modal";
import { WalletActivityDTO } from "../../dtos/WalletActivityDTO";

function getParsedActivty(activity: WalletActivityDTO): Array<{ key: string, value: string | number }> {
    let dictionary: Array<{ key: string, value: string | number }> = []

    for(const prop in activity) {
        dictionary.push({key: prop, value: activity[prop]})
    }

    return dictionary
}

export function ActivityDetailsModal({ showFunc, activity } : { showFunc: Function, activity: WalletActivityDTO }) {
    return (
    <Modal header="Activity Details" showFunc={showFunc}>
        <div className="list">
            { getParsedActivty(activity).map(
                prop => 
                    <div> <div> { prop.key } </div> <div>{prop.value}</div> </div>
            ) }
        </div>
    </Modal>
    )
}